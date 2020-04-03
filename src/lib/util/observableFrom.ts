
import { importProxy } from "../importProxy";
import { typeGuard } from "../../tools/typeSafety/typeGuard";
import { assert } from "../../tools/typeSafety/assert";

type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
type CtxLike<T> = import("../Ctx").CtxLike<T>;
type Observable<T> = import("../Observable").Observable<T>;

type ObservableLike<T> = {
    val: T;
    evt: {
        attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
        attach(callback: (data: T) => void): void;
    };
};

function fromEvtImpl<T, O extends Observable<T>>(
    create: (val: T)=> O,
    evt: EvtLike<T>,
    initialValue: T
): O {

    const obs = create(initialValue);

    evt.attach((data: T) => obs.update(data));

    return obs;

}

function fromObsImpl<T, U, O extends Observable<U> >(
    create: (val: U)=> O,
    ctx: CtxLike<any> | undefined,
    obs: ObservableLike<T>,
    transform: (value: T) => U
): O {

    const evtDelegate = new importProxy.Evt<U>();

    {

        const callback = (data: T) => evtDelegate.post(transform(data));

        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            obs.evt.attach(ctx, callback);
        } else {
            obs.evt.attach(callback);
        }

    }

    return fromEvtImpl(
        create,
        evtDelegate,
        transform(obs.val),
    );

}

export function from<T, U>(
    ctx: CtxLike<any>,
    obs: ObservableLike<T>,
    transform: (val: T) => U,
    same?: (val1: U, val2: U) => boolean,
    copy?: (val: U) => U
): Observable<U>;
export function from<T, U>(
    obs: ObservableLike<T>,
    transform: (val: T) => U,
    same?: (val1: U, val2: U) => boolean,
    copy?: (val: U) => U
): Observable<U>;
export function from<T>(
    evt: EvtLike<T>,
    initialValue: T,
    same?: (val1: T, val2: T) => boolean,
    copy?: (val: T) => T
): Observable<T>;

export function from<T>(
    p1: CtxLike<any> | ObservableLike<T> | EvtLike<T>,
    p2: ObservableLike<T> | ((value: T) => any) | T,
    p3?: ((val: T) => any) | ((val1: any, val2: any) => boolean) | ((val1: T, val2: T) => boolean),
    p4?: ((val1: any, val2: any) => boolean) | ((val: any) => any) | ((val: T) => T),
    p5?: (val: any) => any
): Observable<any> {

    if ("abort" in p1) {

        //1
        assert(typeGuard<ObservableLike<T>>(p2))
        assert(typeGuard<(val: T) => any>(p3))
        assert(typeGuard<((val1: any, val2: any) => boolean) | undefined>(p4))
        assert(typeGuard<((val: any) => any) | undefined>(p5))

        return fromObsImpl(
            val => new importProxy.Observable(val, p4, p5),
            p1, p2, p3
        );

    } else {

        //2 or 3

        if ("attach" in p1) {

            //3

            assert(typeGuard<T>(p2))
            assert(typeGuard<((val1: T, val2: T) => boolean) | undefined>(p3))
            assert(typeGuard<((val: T) => T) | undefined>(p4))

            return fromEvtImpl(
                val => new importProxy.Observable(val, p3, p4),
                p1, p2
            );

        } else {

            //2

            assert(typeGuard<(value: T) => any>(p2))
            assert(typeGuard<((val1: any, val2: any) => boolean) | undefined>(p3))
            assert(typeGuard<((val: any) => any) | undefined>(p4))

            return fromObsImpl(
                val => new importProxy.Observable(val, p3, p4),
                undefined, p1, p2
            );

        }

    }

}

export namespace copy {

    type ObservableCopy<T> = import("../Observable").ObservableCopy<T>;

    export function from<T, U>(
        ctx: CtxLike<any>,
        obs: ObservableLike<T>,
        transform: (val: T) => U
    ): ObservableCopy<U>;
    export function from<T, U>(
        obs: ObservableLike<T>,
        transform: (val: T) => U
    ): ObservableCopy<U>;
    export function from<T>(
        evt: EvtLike<T>,
        initialValue: T
    ): ObservableCopy<T>;

    export function from<T>(
        p1: CtxLike<any> | ObservableLike<T> | EvtLike<T>,
        p2: ObservableLike<T> | ((value: T) => any) | T,
        p3?: (val: T) => any
    ): ObservableCopy<any> {

        if ("abort" in p1) {

            //1
            assert(typeGuard<ObservableLike<T>>(p2))
            assert(typeGuard<(val: T) => any>(p3))

            return fromObsImpl(
                val => new importProxy.ObservableCopy(val),
                p1, p2, p3
            );

        } else {

            //2 or 3

            if ("attach" in p1) {

                //3

                assert(typeGuard<T>(p2))

                return fromEvtImpl(
                    val => new importProxy.ObservableCopy(val),
                    p1, p2
                );

            } else {

                //2

                assert(typeGuard<(value: T) => any>(p2))

                return fromObsImpl(
                    val => new importProxy.ObservableCopy(val),
                    undefined, p1, p2
                );

            }

        }

    }

}

