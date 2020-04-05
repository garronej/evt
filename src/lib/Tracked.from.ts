
import { importProxy } from "./importProxy";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { assert } from "../tools/typeSafety/assert";

type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
type CtxLike<T> = import("./Ctx").CtxLike<T>;
type Tracked<T> = import("./Tracked").Tracked<T>;

type TrackedLike<T> = {
    val: T;
    evt: {
        attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
        attach(callback: (data: T) => void): void;
    };
};


function fromEvtImpl<T>(
    evt: EvtLike<T>,
    initialValue: T
): Tracked<T> {

    const trk = new importProxy.Tracked<T>(initialValue);

    evt.attach((data: T) => trk.val = data);

    return trk;

}

function fromTrkImpl<T, U>(
    ctx: CtxLike<any> | undefined,
    trk: TrackedLike<T>,
    transform: (value: T) => U
): Tracked<U> {

    const evtDelegate = new importProxy.Evt<U>();

    {

        const callback = (data: T) => evtDelegate.post(transform(data));

        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            trk.evt.attach(ctx, callback);
        } else {
            trk.evt.attach(callback);
        }

    }

    return fromEvtImpl(
        evtDelegate,
        transform(trk.val)
    );

}

export function from<T, U>(
    ctx: CtxLike<any>,
    trk: TrackedLike<T>,
    transform: (val: T) => U
): Tracked<U>;
export function from<T, U>(
    trk: TrackedLike<T>,
    transform: (val: T) => U,
): Tracked<U>;
export function from<T>(
    evt: EvtLike<T>,
    initialValue: T,
): Tracked<T>;

export function from<T>(
    p1: CtxLike<any> | TrackedLike<T> | EvtLike<T>,
    p2: TrackedLike<T> | ((value: T) => any) | T,
    p3?: (val: T)=> any
): Tracked<any> {

    if ("abort" in p1) {

        //1
        assert(typeGuard<TrackedLike<T>>(p2))
        assert(typeGuard<(val: T) => any>(p3))

        return fromTrkImpl(p1, p2, p3);


    } else {

        //2 or 3

        if ("attach" in p1) {

            //3

            assert(typeGuard<T>(p2))

            return fromEvtImpl(p1,p2);

        } else {

            //2

            assert(typeGuard<(value: T) => any>(p2))

            return fromTrkImpl(undefined, p1,p2);

        }

    }

}
