declare type EvtLike<T> = import("./merge").EvtLike<T>;
declare type CtxLike = import("../Ctx").CtxLike;
declare type Observable<T> = import("../Observable").Observable<T>;
declare type IObservable<T> = import("../Observable").IObservable<T>;
export declare function from<T>(ctx: CtxLike, evt: EvtLike<T>, initialValue: T): Observable<T>;
export declare function from<T>(evt: EvtLike<T>, initialValue: T): Observable<T>;
export declare function from<T, U>(ctx: CtxLike, obs: IObservable<T>, transform: (value: T) => U): Observable<U>;
export declare function from<T, U>(obs: IObservable<T>, transform: (value: T) => U): Observable<U>;
export {};
