import { Evt, VoidEvt } from "../index";
import { assert, typeGuard } from "../../tools/typeSafety";
import { EvtError } from "../types/EvtError";
import { UnpackEvt, NonPostable, OneShot } from "../types/helper";
import { id } from "../../tools/typeSafety";
import { Deferred } from "../../tools/Deferred";
import { invokeOperator } from "./invokeOperator";
import { Operator } from "../types/Operator";
import { parseOverloadParamsFactory } from "./parseOverloadParams";
import { Ctx } from "../Ctx";

export type OneShotEvt<T> = OneShot<Evt<T>>;

export type Racer<T> = OneShotEvt<T> | PromiseLike<T> | T;
export type UnpackRacer<T extends Racer<any>> = T extends OneShotEvt<infer U> ? U : T extends PromiseLike<infer V> ? V : T;

export type RaceResultGeneric<Data, Index extends number, Racers extends readonly Racer<any>[]> = Readonly<{
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

const matchOnceEvt = <T>(o: any): o is OneShotEvt<T> => {

    assert(typeGuard.dry<OneShotEvt<T>>(o));

    return (
        o instanceof Object &&
        o.attachOnce instanceof Function &&
        o.detach instanceof Function &&
        o.waitFor instanceof Function
    );

};

const matchPromiseLike = <T>(o: any): o is PromiseLike<T> => {

    assert(typeGuard.dry<PromiseLike<T>>(o));

    return (
        o instanceof Object &&
        o.then instanceof Function
    );

}


/** If promise racer rejection unhandled */
const raceUnsafe = (() => {

    type RaceContext = Ctx & {
        evtRaceFinished: NonPostable<VoidEvt>;
    };

    const raceUnsafeRec = (() => {

        type RaceCoupleResult<UnionOfTAndU> = {
            data: UnionOfTAndU;
            i: 0 | 1;
        };

        const raceCouple = (() => {


            const matchDirectValue = <T>(o: OneShotEvt<T> | PromiseLike<T> | T): o is T => {
                return !matchOnceEvt(o) && !matchPromiseLike(o);
            };

            const raceCoupleSym = <T, U>(
                evt: Evt<RaceCoupleResult<T | U>>,
                raceContext: RaceContext,
                racer: Racer<T>,
                i: 0 | 1
            ): void => {

                let evtWeak: (typeof evt) | undefined = evt;

                raceContext.evtRaceFinished.attachOnce(() => evtWeak = undefined);

                const post = (raceCoupleResult: UnpackEvt<typeof evt>) => {
                    evt.getEvtAttach().detach(raceContext);
                    evt.post(raceCoupleResult);
                };

                if (matchDirectValue<T>(racer)) {

                    const raceCoupleResult: UnpackEvt<typeof evt> = {
                        "data": racer,
                        i
                    };

                    evt.getEvtAttach().attach(
                        raceContext,
                        ({ op }) => {

                            assert(!Operator.fλ.Stateful.match(op));

                            if (!op(raceCoupleResult)) {
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

                        if (evtWeak.isHandled(raceCoupleResult)) {
                            post(raceCoupleResult);
                            return;
                        }

                        evtWeak.getEvtAttach().attach(
                            raceContext,
                            ({ op }) => {

                                assert(!Operator.fλ.Stateful.match(op));

                                if (!op(raceCoupleResult)) {
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

                    evt.getEvtAttach().attach(
                        raceContext,
                        ({ op }) =>
                            racer.attachOnce(
                                data => {
                                    assert(!Operator.fλ.Stateful.match(op));
                                    return !!op(toRaceCoupleResult(data));
                                },
                                raceContext,
                                data => post(toRaceCoupleResult(data))
                            )

                    );

                }

            };

            return function raceCouple<T, U>(
                raceContext: RaceContext,
                p1: Racer<T>,
                p2: Racer<U>
            ): OneShotEvt<RaceCoupleResult<T | U>> {

                const evt = new Evt<RaceCoupleResult<T | U>>();

                raceCoupleSym(evt, raceContext, p1, 0);
                raceCoupleSym(evt, raceContext, p2, 1);

                return evt;

            }

        })();


        return function raceUnsafeRec<RacerUnion, T>(
            raceContext: RaceContext,
            racersRest: readonly RacerUnion[],
            racerLast: Racer<T>,
        ): OneShotEvt<RaceRecResult<RacerUnion, T>> {

            const evt = new Evt<RaceRecResult<RacerUnion, T>>();
            const post = (raceRecResult: UnpackEvt<typeof evt>) => {
                evt.getEvtAttach().detach(raceContext);
                evt.post(raceRecResult);
            };

            if (racersRest.length === 0) {

                const toRaceRecResult = (
                    raceCoupleResult: RaceCoupleResult<T | never>
                ): RaceRecResult<RacerUnion, T> => ({
                    ...raceCoupleResult,
                    "i": null
                });

                const evtRaceCoupleResult = raceCouple<T, never>(raceContext, racerLast, prNever);

                evt.getEvtAttach().attach(
                    raceContext,
                    ({ op }) =>
                        evtRaceCoupleResult.attachOnce(
                            raceCoupleResult => {
                                assert(!Operator.fλ.Stateful.match(op));
                                return !!op(toRaceRecResult(raceCoupleResult));
                            },
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
                    raceContext,
                    newRacerLast as Racer<UnpackRacer<RacerUnion>>,
                    racerLast,
                );

                const toData = (
                    raceCoupleResult: RaceCoupleResult<T | UnpackRacer<RacerUnion>>
                ): T | UnpackRacer<RacerUnion> => {
                    raceCoupleResult_i = raceCoupleResult.i;
                    return raceCoupleResult.data;
                }

                evtData.getEvtAttach().attach(
                    raceContext,
                    ({ op }) =>
                        evtRaceCoupleResult.attachOnce(
                            raceCoupleResult => {
                                assert(!Operator.fλ.Stateful.match(op));
                                return !!op(toData(raceCoupleResult));
                            },
                            raceCoupleResult => {
                                evtData.getEvtAttach().detach(raceContext);
                                evtData.post(toData(raceCoupleResult));
                            }
                        )
                );


            }

            {

                const evtRaceRecResult = raceUnsafeRec<RacerUnion, T | UnpackRacer<RacerUnion>>(
                    raceContext,
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

                evt.getEvtAttach().attach(
                    raceContext,
                    ({ op }) =>
                        evtRaceRecResult.attachOnce(
                            raceRecResult => {
                                assert(!Operator.fλ.Stateful.match(op));
                                return !!op(transformRaceRecResult(raceRecResult));
                            },
                            raceRecResult => post(transformRaceRecResult(raceRecResult))
                        )
                );

            }


            return evt;

        };


    })();




    return function raceUnsafe<RacerUnion>(
        racers: readonly RacerUnion[]
    ): OneShotEvt<RaceResult<RacerUnion>> {

        const evt = new Evt<RaceResult<RacerUnion>>();

        const evtRaceFinished = new VoidEvt();

        const raceContext: RaceContext = Object.assign(Evt.newCtx(), { evtRaceFinished });

        const evtRaceRecResult = raceUnsafeRec<RacerUnion, UnpackRacer<RacerUnion>>(
            raceContext,
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

        const detachAllEvtRacers = () => {
            evtRaceFinished.post();
            racers
                .forEach(racer => {
                    if (!matchOnceEvt<UnpackRacer<RacerUnion>>(racer)) {
                        return;
                    }
                    racer.detach(raceContext);
                })
        };



        evt.getEvtAttach().attach(
            raceContext,
            ({ op, promise }) => {

                promise.catch(() => {

                    if (evt.getHandlers().length !== 0) {
                        return;
                    }

                    detachAllEvtRacers();

                });

                evtRaceRecResult.attachOnce(
                    raceRecResult => {
                        assert(!Operator.fλ.Stateful.match(op));
                        return !!op(toRaceResult(raceRecResult));
                    },
                    raceContext,
                    raceRecResult => {
                        evt.getEvtAttach().detach(raceContext);
                        detachAllEvtRacers();
                        evt.post(toRaceResult(raceRecResult));
                    }
                );
            }
        );

        return evt;

    };


})();

export type PrResultWrap<T> =
    PrResultWrap.Fulfilled<T> |
    PrResultWrap.Rejected<T>
    ;

export namespace PrResultWrap {

    type Common<T> = {
        promise: PromiseLike<T>;
    };

    export type Fulfilled<T> = Common<T> & {
        isFulfilled: true;
        data: T;
    };

    export type Rejected<T> = Common<T> & {
        isFulfilled: false;
        data: never;
        error: any;
    };

}


function wrapRejection<T>(promise: PromiseLike<T>): PromiseLike<PrResultWrap<T>> {

    return promise.then(
        data => id<PrResultWrap.Fulfilled<T>>({
            promise,
            "isFulfilled": true,
            data
        }),
        error => id<PrResultWrap.Rejected<T>>({
            promise,
            "isFulfilled": false,
            "data": null as unknown as never,
            error
        })
    );


}

function generateProxyFunctionFactory(oneShotEvt: OneShotEvt<RaceResult<Racer<any>>>) {

    const parseOverloadParams = parseOverloadParamsFactory<any>();

    return function generateProxyFunction(methodName: "waitFor" | "attachOnce") {

        const methodBackup: (...inputs: any[]) => Promise<any> =
            id<(...inputs: any[]) => Promise<any>>(oneShotEvt[methodName]).bind(oneShotEvt)
            ;

        Object.defineProperty(
            oneShotEvt,
            methodName,
            {
                "value": (...inputs: any[]) => {

                    const { op } = parseOverloadParams(
                        inputs,
                        methodName === "waitFor" ?
                            "waitFor" : "attach*"
                    );

                    let i = inputs.indexOf(op);

                    if (i < 0) {
                        inputs = [undefined, ...inputs];
                        i = 0;
                    }

                    const dOut = new Deferred<any>();

                    inputs[i] = function matcherOverride(raceResult: RaceResult<Racer<any>>) {

                        if (!matchPromiseLike<any>(raceResult.racer)) {
                            assert(!Operator.fλ.Stateful.match(op));
                            return op(raceResult);
                        }


                        const prResultWrap: PrResultWrap<any> = raceResult.data;

                        if (!prResultWrap.isFulfilled) {

                            dOut.reject(
                                new EvtError.RacePromiseRejection(
                                    prResultWrap.error,
                                    raceResult.i,
                                    raceResult.racer
                                )
                            );

                            return "DETACH";

                        }

                        assert(!Operator.fλ.Stateful.match(op));

                        return invokeOperator(
                            op,
                            {
                                "i": raceResult.i,
                                "data": prResultWrap.data,
                                "racer": prResultWrap.promise,
                            }
                        );

                    };

                    methodBackup(...inputs)
                        .then(
                            data => dOut.resolve(data),
                            error => dOut.reject(error)
                        )
                        ;

                    return dOut.pr;

                }
            }
        );




    }
};

export function race<T, U>(
    racers: readonly [
        Racer<T>,
        Racer<U>
    ]
): OneShotEvt<
    RaceResultGeneric<T, 0, typeof racers> |
    RaceResultGeneric<U, 1, typeof racers>
>;
export function race<T, U, V>(
    racers: readonly [
        Racer<T>,
        Racer<U>,
        Racer<V>
    ]
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<
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
): OneShotEvt<RaceResult<RacerUnion>>;
export function race<RacerUnion>(
    racers: readonly RacerUnion[]
): OneShotEvt<any> {

    const oneShotEvt = raceUnsafe(
        racers.map(
            racer => matchPromiseLike<UnpackRacer<RacerUnion>>(racer) ?
                wrapRejection<UnpackRacer<RacerUnion>>(racer)
                :
                racer
        )
    );

    {

        const generateProxyFunction = generateProxyFunctionFactory(oneShotEvt);

        (["waitFor", "attachOnce"] as const)
            .forEach(generateProxyFunction)
            ;

    }

    return id<OneShotEvt<RaceResult<Racer<any>>>>(oneShotEvt);


};




