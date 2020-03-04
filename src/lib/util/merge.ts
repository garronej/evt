
import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";

type EvtOverloaded<T> = import("../EvtOverloaded").EvtOverloaded<T>;
type Ref = import("../Ref").Ref;


export function mergeImpl<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    ref: Ref | undefined,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    const evtUnion = new Evt<UnpackEvt<EvtUnion>>();

    const callback = (data: UnpackEvt<typeof evtUnion>) => evtUnion.post(data)

    evts
        .forEach(
            evt => {

                if (ref === undefined) {
                    evt.attach(callback);
                } else {
                    evt.attach(ref, callback);
                }

            }
        )
        ;

    return evtUnion;

}


export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    ref: Ref,
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    evts: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>>;
export function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(
    p1: Ref | readonly EvtUnion[],
    p2?: readonly EvtUnion[]
): Evt<UnpackEvt<EvtUnion>> {

    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2!)
        ;


}