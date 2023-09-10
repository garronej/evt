declare type CtxLike = {
    evtDoneOrAborted: {
        postCount: number;
    };
};
export declare const distinct: <T>(keySelector?: ((value: T) => any) | undefined, ctxFlush?: CtxLike) => import("../lib").Operator.fλ.Stateless<T, T>;
export {};
