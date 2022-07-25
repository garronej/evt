
import { importProxy } from "./importProxy";
import type { UnpackEvt, Evt, CtxLike, NonPostableEvtLike } from "./types";

export function mergeImpl<EvtUnion extends NonPostableEvtLike<any>>(
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



/** https://docs.evt.land/api/evt/merge */
export function merge<EvtUnion extends NonPostableEvtLike<any>>(
    ctx: CtxLike<any>,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostableEvtLike<any>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostableEvtLike<any>>(
    p1: CtxLike<any> | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}