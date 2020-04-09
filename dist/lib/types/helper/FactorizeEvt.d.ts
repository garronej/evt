import { SwapEvtType } from "./SwapEvtType";
import { UnpackEvt } from "./UnpackEvt";
declare type EvtLike<T> = import("./UnpackEvt").EvtLike<T>;
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
export {};
