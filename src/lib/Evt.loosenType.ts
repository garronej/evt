import { SwapEvtType } from "./types/helper/SwapEvtType";
import { UnpackEvt } from "./types/helper/UnpackEvt";

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;

/**
 * https://docs.evt.land/api/evt/loosenType
 */
export function loosenType<E extends EvtLike<any>, SupersetOfT>(
    evt: E
): UnpackEvt<E> extends SupersetOfT ?
    SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET" {
    return evt as any;
}

/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/



