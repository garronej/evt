
import { EvtLike } from "./EvtLike";

/** https://docs.evt.land/api/unpackevt */
export type UnpackEvt<T extends EvtLike<any>> = T extends EvtLike<infer U> ? U : never;

