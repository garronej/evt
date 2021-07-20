declare type CtxLike<Result> = import("./interfaces").CtxLike<Result>;
declare type VoidCtxLike = import("./interfaces").VoidCtxLike;
export declare const z_f1: {
    fλ_Stateful_match: <T, U, CtxResult>(op: Operator<T, U, CtxResult>) => op is Operator.fλ.Stateful<T, U, CtxResult>;
    fλ_Result_match: <U_1, CtxResult_1>(result: any) => result is Operator.fλ.Result<U_1, CtxResult_1>;
    fλ_Result_getDetachArg: <CtxResult_2>(result: Operator.fλ.Result<any, CtxResult_2>) => boolean | [import("./interfaces").CtxLike<CtxResult_2>, Error | undefined, CtxResult_2];
    fλ_Result_NotMatched_match: <CtxResult_3>(result: any) => result is Operator.fλ.Result.NotMatched<CtxResult_3>;
    fλ_Result_Matched_match: <U_2, CtxResult_4>(result: any) => result is Operator.fλ.Result.Matched<U_2, CtxResult_4>;
    fλ_Result_Detach_FromEvt_match: (detach: any) => detach is "DETACH";
    fλ_Result_Detach_WithCtxArg_match: <CtxResult_5>(detach: any) => detach is Operator.fλ.Result.Detach.WithCtxArg<CtxResult_5>;
    fλ_Result_Detach_match: <CtxResult_6>(detach: any) => detach is Operator.fλ.Result.Detach<CtxResult_6>;
};
/** https://docs.evt.land/api/operator */
export declare type Operator<T, U, CtxResult = any> = Operator.fλ<T, U, CtxResult> | ((data: U) => boolean) | //Filter
(U extends T ? (data: T) => data is U : never);
export declare namespace Operator {
    type fλ<T, U, CtxResult = any> = fλ.Stateless<T, U, CtxResult> | fλ.Stateful<T, U, CtxResult>;
    namespace fλ {
        type Stateless<T, U, CtxResult = any> = (data: T, prev?: undefined, isPost?: true) => Result<U, CtxResult>;
        type Stateful<T, U, CtxResult = any> = [(data: T, prev: U, isPost?: true) => Result<U, CtxResult>, U];
        namespace Stateful {
            const match: <T, U, CtxResult>(op: Operator<T, U, CtxResult>) => op is Stateful<T, U, CtxResult>;
        }
        type Result<U, CtxResult = any> = Result.Matched<U, CtxResult> | Result.NotMatched<CtxResult>;
        namespace Result {
            const match: <U, CtxResult>(result: any) => result is Result<U, CtxResult>;
            const getDetachArg: <CtxResult>(result: Result<any, CtxResult>) => boolean | [import("./interfaces").CtxLike<CtxResult>, Error | undefined, CtxResult];
            type NotMatched<CtxResult = any> = Detach<CtxResult> | null;
            namespace NotMatched {
                const match: <CtxResult>(result: any) => result is NotMatched<CtxResult>;
            }
            type Matched<U, CtxResult = any> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U, CtxResult>;
            namespace Matched {
                type NoDetachArg<U> = readonly [U];
                type WithDetachArg<U, CtxResult = any> = readonly [U, Detach<CtxResult> | null];
                const match: <U, CtxResult>(result: any) => result is Matched<U, CtxResult>;
            }
            type Detach<CtxResult = any> = Detach.FromEvt | Detach.WithCtxArg<CtxResult>;
            namespace Detach {
                type FromEvt = "DETACH";
                namespace FromEvt {
                    const match: (detach: any) => detach is "DETACH";
                }
                type WithCtxArg<CtxResult = any> = WithCtxArg.Void | WithCtxArg.Arg<CtxResult>;
                namespace WithCtxArg {
                    type Void = {
                        DETACH: VoidCtxLike;
                        err: Error;
                    } | {
                        DETACH: VoidCtxLike;
                    };
                    type Arg<CtxResult> = {
                        DETACH: CtxLike<CtxResult>;
                        err: Error;
                    } | {
                        DETACH: CtxLike<CtxResult>;
                        res: CtxResult;
                    };
                    const match: <CtxResult>(detach: any) => detach is WithCtxArg<CtxResult>;
                }
                const match: <CtxResult>(detach: any) => detach is Detach<CtxResult>;
            }
        }
    }
    type Stateless<T, U, CtxResult = any> = fλ.Stateless<T, U, CtxResult> | ((data: U) => boolean) | (U extends T ? (data: T) => data is U : never);
}
export {};
