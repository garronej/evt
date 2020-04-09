import { SwapEvtType } from "./types/helper/SwapEvtType";
import { UnpackEvt } from "./types/helper/UnpackEvt";
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
/**
 * https://docs.evt.land/api/evt/loosenType
 */
export declare function loosenType<E extends EvtLike<any>, SupersetOfT>(evt: E): UnpackEvt<E> extends SupersetOfT ? SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET";
export {};
