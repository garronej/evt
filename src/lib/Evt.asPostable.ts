
import { ToPostableEvt } from "./types/helper/ToPostableEvt";
type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;

/** 
 * https://docs.evt.land/api/evt/aspostable 
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
export function asPostable<E extends EvtLike<any>>(evt: E): ToPostableEvt<E>{
    return evt as any;
}

