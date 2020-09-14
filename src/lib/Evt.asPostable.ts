
type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;
type ToPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> = import("./types/helper/ToPostableEvt").ToPostableEvt<E>;

/** 
 * https://docs.evt.land/api/evt/aspostable 
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
export function asPostable<E extends EvtLike<any>>(evt: E): ToPostableEvt<E>{
    return evt as any;
}

