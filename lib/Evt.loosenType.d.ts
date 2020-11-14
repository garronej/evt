declare type SwapEvtType<E extends import("./types/helper/UnpackEvt").EvtLike<any>, T> = import("./types/helper/SwapEvtType").SwapEvtType<E, T>;
declare type UnpackEvt<T extends ({
    [key: string]: any;
} | import("./types/helper/UnpackEvt").EvtLike<any>)> = import("./types/helper/UnpackEvt").UnpackEvt<T>;
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
/**
 * https://docs.evt.land/api/evt/loosenType
 */
export declare function loosenType<E extends EvtLike<any>, SupersetOfT>(evt: E): UnpackEvt<E> extends SupersetOfT ? SwapEvtType<typeof evt, SupersetOfT> : "NOT A SUPERSET";
export {};
