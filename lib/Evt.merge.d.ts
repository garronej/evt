import type { UnpackEvt, Evt, CtxLike, NonPostableEvtLike } from "./types";
export declare function mergeImpl<EvtUnion extends NonPostableEvtLike<any>>(ctx: CtxLike<any> | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
/** https://docs.evt.land/api/evt/merge */
export declare function merge<EvtUnion extends NonPostableEvtLike<any>>(ctx: CtxLike<any>, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostableEvtLike<any>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
