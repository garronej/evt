/** Minimal interface that an object have to implement
 * to be considered as being most certainly an Evt instance */
export type EvtLike<T>= import("./UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/helpertypes#unpackevt-less-than-e-greater-than */
export type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./UnpackEvt").UnpackEvt<T>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = 
    import("./FactorizeEvt").FactorizeEvt<E>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends EvtLike<any>, T> = 
    import("./SwapEvtType").SwapEvtType<E, T>;

/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export type ToPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./ToPostableEvt").ToPostableEvt<E>;

/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export type ToNonPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./ToNonPostableEvt").ToNonPostableEvt<E>;

/** Analog to UnpackEvt<E> Unpack the type argument of a Ctx */
export type UnpackCtx<Ctx extends import("./UnpackCtx").CtxLike<any>> = 
    import("./UnpackCtx").UnpackCtx<Ctx>;
