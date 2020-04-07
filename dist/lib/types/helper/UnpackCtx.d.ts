interface CtxLike<Result = any> {
    done(result: Result): void;
}
export declare type UnpackCtx<Ctx extends CtxLike<any>> = Ctx extends CtxLike<infer U> ? U : never;
export {};
