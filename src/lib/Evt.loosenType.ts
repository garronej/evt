
type SwapEvtType<E extends import("./types/helper/UnpackEvt").EvtLike<any>, T> = 
    import("./types/helper/SwapEvtType").SwapEvtType<E, T>;

type UnpackEvt<T extends ({ [key: string]: any; } | import("./types/helper/UnpackEvt").EvtLike<any>)> = 
    import("./types/helper/UnpackEvt").UnpackEvt<T>;

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



