import type { NonPostableEvtLike } from "../interfaces";
import type { SwapEvtType } from "./SwapEvtType";
import type { UnpackEvt } from "./UnpackEvt";
export declare type EvtLikeToEvt<E extends NonPostableEvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
