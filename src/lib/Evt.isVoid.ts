
import { Void } from "./types/interfaces/Void";

/** 
 * https://docs.evt.land/api/evt/factorize
 * 
 * Type guard for Void, the event data type posted by VoidEvt 
 * */
export function isVoid(o: any): o is Void {
    return Void.match(o);
}