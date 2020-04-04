declare type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
declare type CtxLike<T> = import("../Ctx").CtxLike<T>;
declare type Observable<T> = import("../Observable").Observable<T>;
declare type ObservableLike<T> = {
    val: T;
    evt: {
        attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
        attach(callback: (data: T) => void): void;
    };
};
export declare function from<T, U>(ctx: CtxLike<any>, obs: ObservableLike<T>, transform: (val: T) => U, same?: (val1: U, val2: U) => boolean, copy?: (val: U) => U): Observable<U>;
export declare function from<T, U>(obs: ObservableLike<T>, transform: (val: T) => U, same?: (val1: U, val2: U) => boolean, copy?: (val: U) => U): Observable<U>;
export declare function from<T>(evt: EvtLike<T>, initialValue: T, same?: (val1: T, val2: T) => boolean, copy?: (val: T) => T): Observable<T>;
export declare namespace inDepth {
    type ObservableInDepth<T> = import("../Observable").ObservableInDepth<T>;
    export function from<T, U>(ctx: CtxLike<any>, obs: ObservableLike<T>, transform: (val: T) => U, same?: (val1: T, val2: T) => boolean): ObservableInDepth<U>;
    export function from<T, U>(obs: ObservableLike<T>, transform: (val: T) => U, same?: (val1: U, val2: U) => boolean): ObservableInDepth<U>;
    export function from<T>(evt: EvtLike<T>, initialValue: T, same?: (val1: T, val2: T) => boolean): ObservableInDepth<T>;
    export {};
}
export {};
