
import { SwapEvtType } from "./SwapEvtType.ts";
import { UnpackEvt } from "./UnpackEvt.ts";
import type { EvtLike } from "./UnpackEvt.ts";

/** https://docs.evt.land/api/helpertypes#swapevttype-less-than-e-t-greater-than */
export type FactorizeEvt<E extends EvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;

