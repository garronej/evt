import { Handler } from "../Handler";
declare type EvtLike<T> = import("../helper/UnpackEvt").EvtLike<T>;
/**
 * Minimal interface that an object must implement to be a valid context argument
 * ( for interop between mismatching EVT versions )
 * */
export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}
export declare namespace CtxLike {
    function match<T = any>(o: any): o is CtxLike<T>;
}
export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}
export {};
