
type EvtLike<T> = import("./merge").EvtLike<T>;
type CtxLike = import("../Ctx").CtxLike;
type Observable<T> = import("../Observable").Observable<T>;
type IObservable<T> = import("../Observable").IObservable<T>;
import { importProxy } from "../importProxy";
import { typeGuard } from "../../tools/typeSafety/typeGuard";
import { assert } from "../../tools/typeSafety/assert";

function fromEvtImpl<T>(
    ctx: CtxLike | undefined,
    evt: EvtLike<T>,
    initialValue: T
): Observable<T> {

    const obs = new importProxy.Observable<T>(initialValue);

    const callback = (data: T) => obs.onPotentialChange(data);

    if (!!ctx) {
        evt.attach(ctx, callback);
    } else {
        evt.attach(callback);
    }

    return obs;

}

function fromObsImpl<T, U>(
    ctx: CtxLike | undefined,
    obs: IObservable<T>,
    transform: (value: T) => U
) {

    const op = (data: T) => [transform(data)] as const;

    return fromEvtImpl(
        undefined,
        !!ctx ?
            obs.evtChange.pipe(ctx, op) :
            obs.evtChange.pipe(op),
        transform(obs.value)
    );

}

export function from<T>(
    ctx: CtxLike,
    evt: EvtLike<T>,
    initialValue: T
): Observable<T>;
export function from<T>(
    evt: EvtLike<T>,
    initialValue: T
): Observable<T>;

export function from<T, U>(
    ctx: CtxLike,
    obs: IObservable<T>,
    transform: (value: T) => U
): Observable<U>;
export function from<T, U>(
    obs: IObservable<T>,
    transform: (value: T) => U
): Observable<U>;


export function from<T>(
    p1: CtxLike | EvtLike<T> | IObservable<T>,
    p2: EvtLike<T> | T | IObservable<T> | ((value: T) => any),
    p3?: T | ((value: T) => any)
): Observable<any> {

    if ("abort" in p1) {
        //1 or 3
        assert(typeGuard<EvtLike<T> | IObservable<T>>(p2))

        if ("attach" in p2) {
            //1
            assert(typeGuard<T>(p3))

            return fromEvtImpl(p1, p2, p3);

        } else {
            //3
            assert(typeGuard<(value: T) => any>(p3))

            return fromObsImpl(p1, p2, p3);

        }

    } else {
        //2 or 4

        if ("attach" in p1) {
            //2
            assert(typeGuard<T>(p2))

            return fromEvtImpl(undefined, p1, p2);

        } else {
            //4
            assert(typeGuard<(value: T) => any>(p2))

            return fromObsImpl(undefined, p1, p2);

        }

    }

}

