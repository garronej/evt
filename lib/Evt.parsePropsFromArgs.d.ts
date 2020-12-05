declare type CtxLike<Result> = import("./types/interfaces").CtxLike<Result>;
declare namespace Handler {
    type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = import("./types/Handler").Handler.PropsFromArgs<T, U, CtxProp>;
}
export declare function matchAll(): boolean;
export declare function parsePropsFromArgs<T>(inputs: readonly any[], methodName: "waitFor" | "attach*" | "pipe"): Handler.PropsFromArgs<T, any>;
export {};
