declare type EvtLike<T> = {
    attach(callback: (data: T) => void): void;
};
declare type CtxLike<T> = import("./Ctx").CtxLike<T>;
declare type Tracked<T> = import("./Tracked").Tracked<T>;
declare type TrackedLike<T> = {
    val: T;
    evt: {
        attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
        attach(callback: (data: T) => void): void;
    };
};
export declare function from<T, U>(ctx: CtxLike<any>, trk: TrackedLike<T>, transform: (val: T) => U): Tracked<U>;
export declare function from<T, U>(trk: TrackedLike<T>, transform: (val: T) => U): Tracked<U>;
export declare function from<T>(evt: EvtLike<T>, initialValue: T): Tracked<T>;
export {};
