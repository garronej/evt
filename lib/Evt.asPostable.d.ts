import type { NonPostableEvtLike, ToPostableEvt } from "./types";
/**
 * https://docs.evt.land/api/evt/aspostable
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
export declare function asPostable<E extends NonPostableEvtLike<any>>(evt: E): ToPostableEvt<E>;
