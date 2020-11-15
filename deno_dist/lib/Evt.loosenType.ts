
type SwapEvtType<E extends import("./types/helper/UnpackEvt.ts").EvtLike<any>, T> = 
    import("./types/helper/SwapEvtType.ts").SwapEvtType<E, T>;

type UnpackEvt<T extends ({ [key: string]: any; } | import("./types/helper/UnpackEvt.ts").EvtLike<any>)> = 
    import("./types/helper/UnpackEvt.ts").UnpackEvt<T>;

type EvtLike<T> = import("./types/helper/UnpackEvt.ts").EvtLike<T>;

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
import { Evt } from "./Evt.ts";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/



