

type SwapEvtType<E extends import("./UnpackEvt").EvtLike<any>, T> = 
    import("./SwapEvtType").SwapEvtType<E, T>;

type EvtLike<T>= import("./UnpackEvt").EvtLike<T>;

type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./UnpackEvt").UnpackEvt<T>;


/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

