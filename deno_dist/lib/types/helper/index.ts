/** Minimal interface that an object have to implement
 * to be considered as being most certainly an Evt instance */
export type EvtLike<T>= import("./UnpackEvt.ts").EvtLike<T>;

/** https://docs.evt.land/api/helpertypes#unpackevt-less-than-e-greater-than */
export type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./UnpackEvt.ts").UnpackEvt<T>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = 
    import("./FactorizeEvt.ts").FactorizeEvt<E>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type SwapEvtType<E extends EvtLike<any>, T> = 
    import("./SwapEvtType.ts").SwapEvtType<E, T>;

/** https://docs.evt.land/api/helpertypes#topostableevt-less-than-e-greater-than */
export type ToPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./ToPostableEvt.ts").ToPostableEvt<E>;

/** https://docs.evt.land/api/helpertypes#tononpostableevt-less-than-e-greater-than */
export type ToNonPostableEvt<E extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./ToNonPostableEvt.ts").ToNonPostableEvt<E>;

/** Analog to UnpackEvt<E> Unpack the type argument of a Ctx */
export type UnpackCtx<Ctx extends import("./UnpackCtx.ts").CtxLike<any>> = 
    import("./UnpackCtx.ts").UnpackCtx<Ctx>;
