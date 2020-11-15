declare type SwapEvtType<E extends import("./UnpackEvt").EvtLike<any>, T> = import("./SwapEvtType").SwapEvtType<E, T>;
declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
declare type UnpackEvt<T extends ({
    [key: string]: any;
} | EvtLike<any>)> = import("./UnpackEvt").UnpackEvt<T>;
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
export {};
