import { Evt } from "../index";
import { assert, typeGuard } from "../../tools/typeSafety";
import { Bindable } from "../../lib/defs";
import { UnpackEvt } from "../helperTypes";

export type OnceEvt<T> = Pick<Evt<T>, "waitFor" | "attachOnce" | "$attachOnce" | "detach" | "evtAttach" | "postCount">;

export type Racer<T> = OnceEvt<T> | PromiseLike<T> | T;
export type UnpackRacer<T extends Racer<any>> = T extends OnceEvt<infer U> ? U : T extends PromiseLike<infer V> ? V : T;

export type RaceResultGeneric<Data, Index extends number, Racers extends readonly any[]> = Readonly<{
    data: Data;
    i: Index;
    racer: Racers[Index];
}>;

export type RaceResult<RacerUnion> = RaceResultGeneric<
    UnpackRacer<RacerUnion>,
    number,
    readonly RacerUnion[]
>;

const prNever = new Promise<never>(() => { });

type RaceRecResult<RacerUnion, T> = {
    data: UnpackRacer<RacerUnion> | T;
    i: null | number;
};

const matchOnceEvt = <T>(o: any): o is OnceEvt<T> => {

    assert(typeGuard.dry<OnceEvt<T>>(o));

    return (
        o instanceof Object &&
        o.attachOnce instanceof Function &&
        o.detach instanceof Function &&
        o.waitFor instanceof Function
    );

};

const raceRec = (() => {

    type RaceCoupleResult<UnionOfTAndU> = {
        data: UnionOfTAndU;
        i: 0 | 1;
    };


    const raceCouple = (() => {

        const matchPromiseLike = <T>(o: any): o is PromiseLike<T> => {

            assert(typeGuard.dry<PromiseLike<T>>(o));

            return (
                o instanceof Object &&
                o.then instanceof Function
            );

        }

        const matchDirectValue = <T>(o: OnceEvt<T> | PromiseLike<T> | T): o is T => {
            return !matchOnceEvt(o) && !matchPromiseLike(o);
        }

        const raceCoupleSym = <T, U>(
            evt: Evt<RaceCoupleResult<T | U>>,
            boundTo: Bindable,
            racer: Racer<T>,
            i: 0 | 1
        ): void => {

            let evtWeak: (typeof evt) | undefined = evt;

            const post = (raceCoupleResult: UnpackEvt<typeof evt>) => {
                evt.evtAttach.detach(boundTo);
                evt.post(raceCoupleResult);
                evtWeak = undefined;
            };

            if (matchDirectValue<T>(racer)) {

                const raceCoupleResult: UnpackEvt<typeof evt> = {
                    "data": racer,
                    i
                };

                evt.evtAttach.attach(
                    boundTo,
                    ({ matcher }) => {
                        if (!matcher(raceCoupleResult)) {
                            return;
                        }
                        post(raceCoupleResult);
                    }
                );

            }

            if (matchPromiseLike<T>(racer)) {

                racer.then(data => {

                    if (evtWeak === undefined) {
                        return;
                    }

                    const raceCoupleResult: UnpackEvt<typeof evtWeak> = {
                        data,
                        i
                    };

                    if (evtWeak.isMatched(raceCoupleResult)) {
                        post(raceCoupleResult);
                        return;
                    }

                    evtWeak.evtAttach.attach(
                        boundTo,
                        ({ matcher }) => {
                            if (!matcher(raceCoupleResult)) {
                                return;
                            }
                            post(raceCoupleResult);
                        }
                    );

                });

            }

            if (matchOnceEvt<T>(racer)) {

                const toRaceCoupleResult = (data: T): UnpackEvt<typeof evt> => ({
                    data,
                    i
                });

                evt.evtAttach.attach(
                    boundTo,
                    ({ matcher }) =>
                        racer.attachOnce(
                            data => !!matcher(toRaceCoupleResult(data)),
                            boundTo,
                            data => post(toRaceCoupleResult(data))
                        )

                );

            }

        };

        return function raceCouple<T, U>(
            boundTo: Bindable,
            p1: Racer<T>,
            p2: Racer<U>
        ): OnceEvt<RaceCoupleResult<T | U>> {

            const evt = new Evt<RaceCoupleResult<T | U>>();

            raceCoupleSym(evt, boundTo, p1, 0);
            raceCoupleSym(evt, boundTo, p2, 1);

            return evt;

        }

    })();


    function raceRec<RacerUnion, T>(
        boundTo: Bindable,
        racersRest: readonly RacerUnion[],
        racerLast: Racer<T>,
    ): OnceEvt<RaceRecResult<RacerUnion, T>> {

        const evt = new Evt<RaceRecResult<RacerUnion, T>>();
        const post = (raceRecResult: UnpackEvt<typeof evt>) => {
            evt.evtAttach.detach(boundTo);
            evt.post(raceRecResult);
        };

        if (racersRest.length === 0) {

            const toRaceRecResult = (
                raceCoupleResult: RaceCoupleResult<T | never>
            ): RaceRecResult<RacerUnion, T> => ({
                ...raceCoupleResult,
                "i": null
            });

            const evtRaceCoupleResult = raceCouple<T, never>(boundTo, racerLast, prNever);

            evt.evtAttach.attach(
                boundTo,
                ({ matcher }) =>
                    evtRaceCoupleResult.attachOnce(
                        raceCoupleResult => !!matcher(toRaceRecResult(raceCoupleResult)),
                        raceCoupleResult => post(toRaceRecResult(raceCoupleResult))

                    )
            );

            return evt;

        }


        const newRest = racersRest.slice(0, racersRest.length - 1);
        const newRacerLast = racersRest[racersRest.length - 1];

        const evtData = new Evt<T | UnpackRacer<RacerUnion>>();

        let raceCoupleResult_i: 0 | 1;

        {

            const evtRaceCoupleResult = raceCouple<UnpackRacer<RacerUnion>, T>(
                boundTo,
                newRacerLast as Racer<UnpackRacer<RacerUnion>>,
                racerLast,
            );

            const toData = (
                raceCoupleResult: RaceCoupleResult<T | UnpackRacer<RacerUnion>>
            ): T | UnpackRacer<RacerUnion> => {
                raceCoupleResult_i = raceCoupleResult.i;
                return raceCoupleResult.data;
            }

            evtData.evtAttach.attach(
                boundTo,
                ({ matcher }) =>
                    evtRaceCoupleResult.attachOnce(
                        raceCoupleResult => !!matcher(toData(raceCoupleResult)),
                        raceCoupleResult => {
                            evtData.evtAttach.detach(boundTo);
                            evtData.post(toData(raceCoupleResult));
                        }
                    )
            );


        }

        {

            const evtRaceRecResult = raceRec<RacerUnion, T | UnpackRacer<RacerUnion>>(
                boundTo,
                newRest,
                evtData,
            );

            const transformRaceRecResult = (
                raceRecResult: RaceRecResult<RacerUnion, T | UnpackRacer<RacerUnion>>
            ): RaceRecResult<RacerUnion, T> => ({
                "data": raceRecResult.data,
                "i": raceRecResult.i === null ?
                    raceCoupleResult_i === 0 ?
                        racersRest.length - 1
                        :
                        null
                    :
                    raceRecResult.i
            });

            evt.evtAttach.attach(
                boundTo,
                ({ matcher }) =>
                    evtRaceRecResult.attachOnce(
                        raceRecResult => !!matcher(transformRaceRecResult(raceRecResult)),
                        raceRecResult => post(transformRaceRecResult(raceRecResult))
                    )
            );

        }


        return evt;

    };

    return raceRec;

})();


export function race<T, U>(
    racers: readonly [
        Racer<T>, 
        Racer<U>
    ]
): OnceEvt<
    RaceResultGeneric<T, 0, typeof racers> |
    RaceResultGeneric<U, 1, typeof racers>
>;
export function race<T, U, V>(
    racers: readonly [
        Racer<T>, 
        Racer<U>, 
        Racer<V>
    ]
): OnceEvt<
    RaceResultGeneric<T, 0, typeof racers> |
    RaceResultGeneric<U, 1, typeof racers> |
    RaceResultGeneric<V, 2, typeof racers>
>;
export function race<T1, T2, T3, T4>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers>
>;
export function race<T1, T2, T3, T4, T5>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>, 
        Racer<T8>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers> | 
    RaceResultGeneric<T8, 7, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>, 
        Racer<T8>, 
        Racer<T9>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers> | 
    RaceResultGeneric<T8, 7, typeof racers> |
    RaceResultGeneric<T9, 8, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>, 
        Racer<T8>, 
        Racer<T9>, 
        Racer<T10>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers> | 
    RaceResultGeneric<T8, 7, typeof racers> |
    RaceResultGeneric<T9, 8, typeof racers> |
    RaceResultGeneric<T10, 9, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>, 
        Racer<T8>, 
        Racer<T9>, 
        Racer<T10>,
        Racer<T11>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers> | 
    RaceResultGeneric<T8, 7, typeof racers> |
    RaceResultGeneric<T9, 8, typeof racers> |
    RaceResultGeneric<T10, 9, typeof racers> |
    RaceResultGeneric<T11, 10, typeof racers>
>;
export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    racers: readonly [
        Racer<T1>, 
        Racer<T2>, 
        Racer<T3>, 
        Racer<T4>, 
        Racer<T5>, 
        Racer<T6>, 
        Racer<T7>, 
        Racer<T8>, 
        Racer<T9>, 
        Racer<T10>,
        Racer<T11>,
        Racer<T12>
    ]
): OnceEvt<
    RaceResultGeneric<T1, 0, typeof racers> |
    RaceResultGeneric<T2, 1, typeof racers> |
    RaceResultGeneric<T3, 2, typeof racers> |
    RaceResultGeneric<T4, 3, typeof racers> |
    RaceResultGeneric<T5, 4, typeof racers> |
    RaceResultGeneric<T6, 5, typeof racers> |
    RaceResultGeneric<T7, 6, typeof racers> | 
    RaceResultGeneric<T8, 7, typeof racers> |
    RaceResultGeneric<T9, 8, typeof racers> |
    RaceResultGeneric<T10, 9, typeof racers> |
    RaceResultGeneric<T11, 10, typeof racers> |
    RaceResultGeneric<T12, 11, typeof racers>
>;
export function race<RacerUnion>(
    racers: readonly RacerUnion[]
): OnceEvt<RaceResult<RacerUnion>>;
export function race<RacerUnion>(
    racers: readonly RacerUnion[]
): OnceEvt<any> {

    const evt = new Evt<RaceResult<RacerUnion>>();

    const boundTo: Bindable = {};

    const evtRaceRecResult = raceRec<RacerUnion, UnpackRacer<RacerUnion>>(
        boundTo,
        racers,
        prNever
    );

    const toRaceResult = (
        raceRecResult: RaceRecResult<RacerUnion, UnpackRacer<RacerUnion>>
    ): RaceResult<RacerUnion> => {

        assert(!typeGuard.dry<null>(raceRecResult.i, false));

        return {
            ...raceRecResult,
            "i": raceRecResult.i,
            "racer": racers[raceRecResult.i]
        };

    };

    const detachAllEvtRacers = () =>
        racers
            .forEach(racer => {
                if (!matchOnceEvt<UnpackRacer<RacerUnion>>(racer)) {
                    return;
                }
                racer.detach(boundTo);
            })
        ;


    evt.evtAttach.attach(
        boundTo,
        ({ matcher, promise }) => {

            promise.catch(() => {

                if (evt.getHandlers().length !== 0) {
                    return;
                }

                detachAllEvtRacers();

            });

            evtRaceRecResult.attachOnce(
                raceRecResult => !!matcher(toRaceResult(raceRecResult)),
                boundTo,
                raceRecResult => {
                    evt.evtAttach.detach(boundTo);
                    detachAllEvtRacers();
                    evt.post(toRaceResult(raceRecResult));
                }
            );
        }
    );

    return evt;

};


