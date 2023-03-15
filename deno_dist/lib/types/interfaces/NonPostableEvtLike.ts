
import type { CtxLike } from "./CtxLike.ts";

export interface NonPostableEvtLike<T> {
    attach(ctx: CtxLike, callback: (data: T) => void): void;
    attach(callback: (data: T) => void): void;
};