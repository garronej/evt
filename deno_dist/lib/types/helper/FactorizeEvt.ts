

type SwapEvtType<E extends import("./UnpackEvt.ts").EvtLike<any>, T> = 
    import("./SwapEvtType.ts").SwapEvtType<E, T>;

type EvtLike<T>= import("./UnpackEvt.ts").EvtLike<T>;

type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./UnpackEvt.ts").UnpackEvt<T>;


/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

