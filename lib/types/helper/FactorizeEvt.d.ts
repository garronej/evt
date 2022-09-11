import type { NonPostableEvtLike } from "../interfaces/NonPostableEvtLike";
import type { SwapEvtType } from "./SwapEvtType";
import type { UnpackEvt } from "./UnpackEvt";
/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export declare type FactorizeEvt<E extends NonPostableEvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
