declare type CtxLike<Result> = import("../../Ctx").CtxLike<Result>;
export declare type UnpackCtx<Ctx extends CtxLike<any>> = Ctx extends CtxLike<infer U> ? U : never;
export {};
