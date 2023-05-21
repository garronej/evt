
import type { NonPostableEvtLike } from "../interfaces/index.ts";
import type { SwapEvtType } from "./SwapEvtType.ts";
import type { UnpackEvt } from "./UnpackEvt.ts";

export type EvtLikeToEvt<E extends NonPostableEvtLike<any>> = SwapEvtType<E, UnpackEvt<E>>;
