
import { ToNonPostableEvt } from "./types/helper/ToNonPostableEvt.ts";
import type { EvtLike } from "./types/helper/UnpackEvt.ts";
//type EvtLike<T>= import("./types/helper/UnpackEvt.ts").EvtLike<T>;
//type EvtLike<T>= import("./types/helper/UnpackEvt.ts").EvtLike<T>;

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}