
import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";

type Ctx<Result> = import("../Ctx").Ctx<Result>;

//TODO: Fix interoperability between versions.
export function mergeImpl<EvtUnion extends NonPostable<Evt<any>>>(
    ctx: Ctx<any> | undefined,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    const evtUnion = new Evt<UnpackEvt<EvtUnion>>();

    const callback = (data: UnpackEvt<typeof evtUnion>) => evtUnion.post(data)

    evts
        .forEach(
            evt => {

                if (ctx === undefined) {
                    evt.attach(callback);
                } else {
                    evt.attach(ctx, callback);
                }

            }
        )
        ;

    return evtUnion;

}


export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    ctx: Ctx<any>,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<Evt<any>>>(
    p1: Ctx<any> | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}