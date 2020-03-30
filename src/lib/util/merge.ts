import /*type*/ { UnpackEvt } from "../types/helper/UnpackEvt";
import { importProxy } from "../importProxy";

type Evt<T>= import("../Evt").Evt<T>;
type CtxLike<Result> = import("../Ctx").CtxLike<Result>;


type EvtLike<T> = import("../Evt").EvtLike<T> & {
    attach(callback: (data: T)=> void): void;
    attach(ctx: CtxLike<any>, callback: (data: T)=> void): void;
};

//TODO: Fix interoperability between versions.
export function mergeImpl<EvtUnion extends EvtLike<any>>(
    ctx: CtxLike<any> | undefined,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    const evtUnion = new importProxy.Evt<UnpackEvt<EvtUnion>>();

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


export function merge<EvtUnion extends EvtLike<any>>(
    ctx: CtxLike<any>,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends EvtLike<any>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends EvtLike<any>>(
    p1: CtxLike<any> | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}