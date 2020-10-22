
type ToNonPostableEvt<E extends ({ [key: string]: any; } | import("../lib/types/helper").EvtLike<any>)> = 
    import("./types/helper/ToNonPostableEvt").ToNonPostableEvt<E>;

type EvtLike<T>= import("./types/helper/UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/evt/asnonpostable */
export function asNonPostable<E extends EvtLike<any>>(evt: E): ToNonPostableEvt<E>{
    return evt as any;
}