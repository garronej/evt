
import { SwapEvtType } from "./SwapEvtType.ts";
import { UnpackEvt } from "./UnpackEvt.ts";
type EvtLike<T>= import("./UnpackEvt.ts").EvtLike<T>;

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

