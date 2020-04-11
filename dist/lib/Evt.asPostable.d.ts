import { ToPostableEvt } from "./types/helper/ToPostableEvt";
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
/**
 * https://docs.evt.land/api/evt/aspostable
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
export declare function asPostable<E extends EvtLike<any>>(evt: E): ToPostableEvt<E>;
export {};
