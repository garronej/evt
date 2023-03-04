import type { NonPostableEvtLike } from "./NonPostableEvtLike";
import type { Handler } from "../Handler";
/**
 * Minimal interface that an object must implement to be a valid context argument
 * ( for interop between mismatching EVT versions )
 * */
export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: NonPostableEvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}
export declare namespace CtxLike {
    function match<T = any>(o: any): o is CtxLike<T>;
}
