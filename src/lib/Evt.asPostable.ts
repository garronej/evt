import type { NonPostableEvtLike, ToPostableEvt } from "./types";

/** 
 * @deprecated: ⚠ UNSAFE ⚠ - Please don't use it, it will be removed in the next 
 * major release.
 * https://docs.evt.land/api/evt/aspostable 
 * */
export function asPostable<E extends NonPostableEvtLike<any>>(evt: E): ToPostableEvt<E>{
    return evt as any;
}

