
import { importProxy } from "../importProxy";
import { typeGuard } from "../../tools/typeSafety/typeGuard";
import { assert } from "../../tools/typeSafety/assert";

type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
type CtxLike<T> = import("../Ctx").CtxLike<T>;
type Observable<T> = import("../Observable").Observable<T>;

type ObservableLike<T> = {
    value: T;
     evtChange: {
         attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
         attach(callback: (data: T) => void): void;
    };
};

function fromEvtImpl<T>(
    evt: EvtLike<T>,
    initialValue: T,
    areSame: ((currentValue: T, newValue: T) => boolean) | undefined
): Observable<T> {

    const obs = new importProxy.Observable<T>(initialValue, areSame);

    evt.attach((data: T) => obs.onPotentialChange(data));

    return obs;

}

function fromObsImpl<T, U>(
    ctx: CtxLike<any> | undefined,
    obs: ObservableLike<T>,
    transform: (value: T) => U,
    areSame: ((currentValue: U, newValue: U) => boolean) | undefined
): Observable<U> {

    const evtDelegate = new importProxy.Evt<U>();

    {

        const callback = (data: T) => evtDelegate.post(transform(data));

        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            obs.evtChange.attach(ctx, callback);
        } else {
            obs.evtChange.attach(callback);
        }

    }

    return fromEvtImpl(
        evtDelegate,
        transform(obs.value),
        areSame
    );

}

export function from<T, U>(
    ctx: CtxLike<any>,
    obs: ObservableLike<T>,
    transform: (value: T) => U,
    areSame?: (currentValue: U, newValue: U) => boolean
): Observable<U>;
export function from<T, U>(
    obs: ObservableLike<T>,
    transform: (value: T) => U,
    areSame?: (currentValue: U, newValue: U) => boolean
): Observable<U>;
export function from<T>(
    evt: EvtLike<T>,
    initialValue: T,
    areSame?: (currentValue: T, newValue: T) => boolean
): Observable<T>;

export function from<T>(
    p1: EvtLike<T> | CtxLike<any> | ObservableLike<T>,
    p2: T | ObservableLike<T> | ((value: T) => any),
    p3?: ((currentValue: T, newValue: T) => boolean) | ((value: T) => any) | ((currentValue: any, newValue: any) => boolean),
    p4?: (currentValue: any, newValue: any) => boolean
): Observable<any> {

    if ("abort" in p1) {
        //2
        assert(typeGuard<ObservableLike<T>>(p2))
        assert(typeGuard<(value: T) => any>(p3))
        assert(typeGuard<((currentValue: any, newValue: any) => boolean) | undefined>(p4))

        return fromObsImpl(p1, p2, p3, p4);

    } else {
        //1 or 3

        if ("attach" in p1) {
            //1
            assert(typeGuard<T>(p2))
            assert(typeGuard<((currentValue: T, newValue: T) => boolean) | undefined>(p3))

            return fromEvtImpl(p1, p2, p3);

        } else {
            //3
            assert(typeGuard<(value: T) => any>(p2))
            assert(typeGuard<((currentValue: any, newValue: any) => boolean) | undefined>(p3))

            return fromObsImpl(undefined, p1, p2, p3);

        }

    }

}

