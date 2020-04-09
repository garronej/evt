
import { SwapEvtType } from "./SwapEvtType";
import { UnpackEvt } from "./UnpackEvt";
type EvtLike<T>= import("./UnpackEvt").EvtLike<T>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

