
import type { ToNonPostableEvt, NonPostableEvtLike } from "./types";

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends NonPostableEvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}