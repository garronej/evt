type CtxLike<Result> = import("../../Ctx").CtxLike<Result>;

export type UnpackCtx<Ctx extends CtxLike<any>> = 
    Ctx extends CtxLike<infer U> ? U : never
    ;

