declare type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
declare type CtxLike<T> = import("../Ctx").CtxLike<T>;
declare type Observable<T> = import("../Observable").Observable<T>;
declare type ObservableLike<T> = {
    value: T;
    evtChange: {
        attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
        attach(callback: (data: T) => void): void;
    };
};
export declare function from<T, U>(ctx: CtxLike<any>, obs: ObservableLike<T>, transform: (value: T) => U, areSame?: (currentValue: U, newValue: U) => boolean): Observable<U>;
export declare function from<T, U>(obs: ObservableLike<T>, transform: (value: T) => U, areSame?: (currentValue: U, newValue: U) => boolean): Observable<U>;
export declare function from<T>(evt: EvtLike<T>, initialValue: T, areSame?: (currentValue: T, newValue: T) => boolean): Observable<T>;
export {};
