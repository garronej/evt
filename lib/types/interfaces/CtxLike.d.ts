declare type EvtLike<T> = import("../helper/UnpackEvt").EvtLike<T>;
declare type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = import("../Handler").Handler<T, U, CtxProp>;
export declare const z_3: {
    match: <T = any>(o: any) => o is CtxLike<T>;
};
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
    const match: <T = any>(o: any) => o is CtxLike<T>;
}
export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}
export {};
