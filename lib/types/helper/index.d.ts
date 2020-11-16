/** Minimal interface that an object have to implement
 * to be considered as being most certainly an Evt instance */
export declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
/** https://docs.evt.land/api/helpertypes#unpackevt-less-than-e-greater-than */
export declare type UnpackEvt<T extends ({
    [key: string]: any;
} | EvtLike<any>)> = import("./UnpackEvt").UnpackEvt<T>;
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type FactorizeEvt<E extends EvtLike<any>> = import("./FactorizeEvt").FactorizeEvt<E>;
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type SwapEvtType<E extends EvtLike<any>, T> = import("./SwapEvtType").SwapEvtType<E, T>;
/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export declare type ToPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = import("./ToPostableEvt").ToPostableEvt<E>;
/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export declare type ToNonPostableEvt<E extends ({
    [key: string]: any;
} | EvtLike<any>)> = import("./ToNonPostableEvt").ToNonPostableEvt<E>;
/** Analog to UnpackEvt<E> Unpack the type argument of a Ctx */
export declare type UnpackCtx<Ctx extends import("./UnpackCtx").CtxLike<any>> = import("./UnpackCtx").UnpackCtx<Ctx>;
