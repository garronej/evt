declare type CtxLike = {
    evtDoneOrAborted: {
        postCount: number;
    };
};
export declare const distinct: <T>(keySelector?: ((value: T) => any) | undefined, ctxFlush?: CtxLike) => import("../..").Operator.fλ.Stateless<T, T>;
export {};
