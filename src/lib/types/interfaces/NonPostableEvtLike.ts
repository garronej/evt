
import type { CtxLike } from "./CtxLike";

export interface NonPostableEvtLike<T> {
    attach(ctx: CtxLike, callback: (data: T) => void): void;
    attach(callback: (data: T) => void): void;
};