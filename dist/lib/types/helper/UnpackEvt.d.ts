import { EvtLike } from "./EvtLike";
/** https://docs.evt.land/api/unpackevt */
export declare type UnpackEvt<T extends EvtLike<any>> = T extends EvtLike<infer U> ? U : never;
