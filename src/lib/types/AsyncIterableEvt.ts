import type { Ctx } from "./interfaces/Ctx";

export type AsyncIterableEvt<T, CtxResult = void> = AsyncIterable<T> & {
	ctx: Ctx<CtxResult>;
};