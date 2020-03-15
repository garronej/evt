
import { EvtLike } from "./EvtLike";

export type UnpackEvt<T extends EvtLike<any>> = T extends EvtLike<infer U> ? U : never;

