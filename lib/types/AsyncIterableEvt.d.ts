import type { Ctx } from "./interfaces/Ctx";
export declare type AsyncIterableEvt<T, CtxResult = void> = AsyncIterable<T> & {
    ctx: Ctx<CtxResult>;
};
