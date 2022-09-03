import type { SwapEvtType, UnpackEvt, NonPostableEvtLike } from "./types";
/**
 * https://docs.evt.land/api/evt/loosenType
 */
export declare function loosenType<E extends NonPostableEvtLike<any>, SupersetOfT>(evt: E): UnpackEvt<E> extends SupersetOfT ? SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET";
