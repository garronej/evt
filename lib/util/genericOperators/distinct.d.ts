export declare const scan: <T, U>(accumulator: (acc: U, value: T, index: number) => U, seed: U) => import("../..").Operator.fλ.Stateless<T, U, any>;
declare type CtxLike = {
    evtDoneOrAborted: {
        postCount: number;
    };
};
export declare const distinct: <T>(keySelector?: ((value: T) => any) | undefined, ctxFlush?: CtxLike | undefined) => import("../..").Operator.fλ.Stateless<T, T, any>;
export {};
