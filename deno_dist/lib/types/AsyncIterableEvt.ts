import type { Ctx } from "./interfaces/Ctx.ts";

export type AsyncIterableEvt<T, CtxResult = void> = AsyncIterable<T> & {
	ctx: Ctx<CtxResult>;
};