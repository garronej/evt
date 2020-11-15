declare type FactorizeEvt<E extends import("./types/helper/UnpackEvt").EvtLike<any>> = import("./types/helper/FactorizeEvt").FactorizeEvt<E>;
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
/** https://docs.evt.land/api/evt/factorize */
export declare function factorize<E extends EvtLike<any>>(evt: E): FactorizeEvt<E>;
export {};
