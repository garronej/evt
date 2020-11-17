
type EvtLike<T>= import("./EvtLike").EvtLike<T>;

type SwapEvtType<E extends EvtLike<any>, T> = 
    import("./SwapEvtType").SwapEvtType<E, T>;


type UnpackEvt<T extends ({ [key: string]: any; } | EvtLike<any>)> = 
    import("./UnpackEvt").UnpackEvt<T>;


/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

