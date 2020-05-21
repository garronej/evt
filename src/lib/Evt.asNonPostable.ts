
import { ToNonPostableEvt } from "./types/helper/ToNonPostableEvt";
import type { EvtLike } from "./types/helper/UnpackEvt";
//type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;
//type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}