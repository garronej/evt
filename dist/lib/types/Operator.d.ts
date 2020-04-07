declare type CtxLike<Result> = import("./interfaces").CtxLike<Result>;
declare type VoidCtxLike = import("./interfaces").VoidCtxLike;
/** https://docs.evt.land/api/operator */
export declare type Operator<T, U, CtxResult = any> = Operator.fλ<T, U, CtxResult> | ((data: U) => boolean) | //Filter
(U extends T ? (data: T) => data is U : never);
export declare namespace Operator {
    type fλ<T, U, CtxResult = any> = fλ.Stateless<T, U, CtxResult> | fλ.Stateful<T, U, CtxResult>;
    namespace fλ {
        type Stateless<T, U, CtxResult = any> = (data: T, prev?: undefined, isPost?: true) => Result<U, CtxResult>;
        type Stateful<T, U, CtxResult = any> = [(data: T, prev: U, isPost?: true) => Result<U, CtxResult>, U];
        namespace Stateful {
            function match<T, U, CtxResult>(op: Operator<T, U, CtxResult>): op is Stateful<T, U, CtxResult>;
        }
        type Result<U, CtxResult = any> = Result.Matched<U, CtxResult> | Result.NotMatched<CtxResult>;
        namespace Result {
            function match<U, CtxResult>(result: any): result is Result<U, CtxResult>;
            function getDetachArg<CtxResult>(result: Result<any, CtxResult>): boolean | [CtxLike<CtxResult>, undefined | Error, CtxResult];
            type NotMatched<CtxResult = any> = Detach<CtxResult> | null;
            namespace NotMatched {
                function match<CtxResult>(result: any): result is NotMatched<CtxResult>;
            }
            type Matched<U, CtxResult = any> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U, CtxResult>;
            namespace Matched {
                type NoDetachArg<U> = readonly [U];
                type WithDetachArg<U, CtxResult = any> = readonly [U, Detach<CtxResult> | null];
                function match<U, CtxResult>(result: any): result is Matched<U, CtxResult>;
            }
            type Detach<CtxResult = any> = Detach.FromEvt | Detach.WithCtxArg<CtxResult>;
            namespace Detach {
                type FromEvt = "DETACH";
                namespace FromEvt {
                    function match(detach: any): detach is FromEvt;
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
                    function match<CtxResult>(detach: any): detach is WithCtxArg<CtxResult>;
                }
                function match<CtxResult>(detach: any): detach is Detach<CtxResult>;
            }
        }
    }
    type Stateless<T, U, CtxResult = any> = fλ.Stateless<T, U, CtxResult> | ((data: U) => boolean) | (U extends T ? (data: T) => data is U : never);
}
export {};
