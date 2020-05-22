
import { ToPostableEvt } from "./types/helper/ToPostableEvt.ts";
import type { EvtLike} from "./types/helper/UnpackEvt.ts";

/** 
 * https://docs.evt.land/api/evt/aspostable 
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
export function asPostable<E extends EvtLike<any>>(evt: E): ToPostableEvt<E>{
    return evt as any;
}

