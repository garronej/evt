
import /*type*/{ ToNonPostableEvt } from "./types/helper/ToNonpostableEvt";
type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}