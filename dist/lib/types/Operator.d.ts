declare type Ctx<T = any> = import("../Ctx").Ctx<T>;
declare type VoidCtx = import("../Ctx").VoidCtx;
export declare type Operator<T, U> = Operator.fλ<T, U> | ((data: U) => boolean) | //Filter
(U extends T ? (data: T) => data is U : never);
export declare namespace Operator {
    type fλ<T, U> = fλ.Stateless<T, U> | fλ.Stateful<T, U>;
    namespace fλ {
        type Stateless<T, U> = (data: T, prev?: undefined, cbInvokedIfMatched?: true) => Result<U>;
        type Stateful<T, U> = [(data: T, prev: Readonly<U>, cbInvokedIfMatched?: true) => Result<U>, U];
        namespace Stateful {
            function match<T, U>(op: Operator<T, U>): op is Stateful<T, U>;
        }
        type Result<U> = Result.Matched<U> | Result.NotMatched;
        namespace Result {
            function match<U>(result: any): result is Result<U>;
            function getDetachArg(result: Result<any>): boolean | [Ctx, undefined | Error, any];
            type NotMatched = Detach | null;
            namespace NotMatched {
                function match(result: any): result is NotMatched;
            }
            type Matched<U> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U>;
            namespace Matched {
                type NoDetachArg<U> = readonly [U];
                type WithDetachArg<U> = readonly [U, Detach | null];
                function match(result: any): result is Matched<any>;
            }
            type Detach = Detach.FromEvt | Detach.WithCtxArg;
            namespace Detach {
                type FromEvt = "DETACH";
                namespace FromEvt {
                    function match(detach: any): detach is FromEvt;
                }
                type WithCtxArg<T = any> = {
                    DETACH: Ctx<T>;
                    err: Error;
                } | {
                    DETACH: Ctx<T>;
                    res: T;
                } | {
                    DETACH: VoidCtx;
                    err: Error;
                } | {
                    DETACH: VoidCtx;
                };
                namespace WithCtxArg {
                    function match(detach: any): detach is WithCtxArg;
                }
                function match(detach: any): detach is Detach;
            }
        }
    }
    type Stateless<T, U> = fλ.Stateless<T, U> | ((data: U) => boolean) | (U extends T ? (data: T) => data is U : never);
}
export {};
