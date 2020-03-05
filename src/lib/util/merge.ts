
import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";

type EvtOverloaded<T> = import("../EvtOverloaded").EvtOverloaded<T>;
type Ctx = import("../Ctx").Ctx;


export function mergeImpl<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    ctx: Ctx | undefined,
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


export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    ctx: Ctx,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    p1: Ctx | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}