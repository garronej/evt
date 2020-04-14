import { ToNonPostableEvt } from "./types/helper/ToNonPostableEvt";
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
/** https://docs.evt.land/api/evt/asnonpostable */
export declare function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>;
export {};
