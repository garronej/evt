

interface CtxLike<Result = any> {
    done(result: Result): void;
}

export type UnpackCtx<Ctx extends CtxLike<any>> = 
    Ctx extends CtxLike<infer U> ? U : never
    ;

