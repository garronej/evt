
import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";

type CtxLike<Result> = import("../Ctx").CtxLike<Result>;

type EvtLike<T> = import("../EvtCore").EvtLike<T> & {
    attach<T>(callback: (data: T)=> void): void;
    attach<T>(ctx: CtxLike<any>, callback: (data: T)=> void): void;
};

//TODO: Fix interoperability between versions.
export function mergeImpl<EvtUnion extends EvtLike<any>>(
    ctx: CtxLike<any> | undefined,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    const evtUnion = new Evt<UnpackEvt<EvtUnion>>();

    const callback = (data: UnpackEvt<typeof evtUnion>) => evtUnion.post(data)

    evts.forEach(
        evt => {

            if (ctx === undefined) {
                evt.attach(callback);
            } else {
                evt.attach(ctx, callback);
            }

        }
    );

    return evtUnion;

}


export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    ctx: CtxLike<any>,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    p1: CtxLike<any> | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}