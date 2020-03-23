type Ctx<T> = import("../Ctx").Ctx<T>;
type VoidCtx = import("../Ctx").VoidCtx;
import { typeGuard } from "../../tools/typeSafety";

/** https://docs.evt.land/api/operator */
export type Operator<T, U, CtxResult> =
    Operator.fλ<T, U, CtxResult> |
    ((data: U) => boolean) | //Filter
    (U extends T ? (data: T) => data is U : never) //Type guard
    ;

export namespace Operator {

    export type fλ<T, U, CtxResult> =
        fλ.Stateless<T, U, CtxResult> |
        fλ.Stateful<T, U, CtxResult>
        ;

    export namespace fλ {

        export type Stateless<T, U, CtxResult> = (data: T, prev?: undefined, isPost?: true) => Result<U, CtxResult>;

        export type Stateful<T, U, CtxResult> = [
            (data: T, prev: U, isPost?: true) => Result<U, CtxResult>,
            U //Seed
        ];

        export namespace Stateful {

            export function match<T, U, CtxResult>(op: Operator<T, U, CtxResult>): op is Stateful<T, U, CtxResult> {
                return typeof op !== "function";
            }

        }

        export type Result<U, CtxResult> = Result.Matched<U, CtxResult> | Result.NotMatched<CtxResult>;

        export namespace Result {

            export function match<U, CtxResult>(result: any): result is Result<U, CtxResult> {
                return Matched.match(result) || NotMatched.match(result);
            }

            export function getDetachArg<CtxResult>(result: Result<any, CtxResult>): boolean | [Ctx<CtxResult>, undefined | Error, CtxResult] {

                const detach = Matched.match<any, CtxResult>(result) ? result[1] : result;

                if (Detach.FromEvt.match(detach)) {
                    return true;
                }

                if (Detach.WithCtxArg.match<CtxResult>(detach)) {
                    return [
                        detach.DETACH as Exclude<typeof detach.DETACH, VoidCtx>,
                        (detach as Extract<Result<any,CtxResult>, { err: any }>).err,
                        (detach as Extract<Result<any, CtxResult>, { res: any }>).res
                    ];
                }


                return false;

            }

            export type NotMatched<CtxResult> = Detach<CtxResult> | null;

            export namespace NotMatched {

                export function match<CtxResult>(result: any): result is NotMatched<CtxResult> {
                    return (
                        result === null ||
                        Detach.match(result)
                    );
                }

            }

            export type Matched<U, CtxResult> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U, CtxResult>;

            export namespace Matched {

                export type NoDetachArg<U> = readonly [U];

                export type WithDetachArg<U, CtxResult> = readonly [U, Detach<CtxResult> | null];

                export function match<U,CtxResult>(
                    result: any,
                ): result is Matched<U, CtxResult> {
                    return (
                        typeGuard.dry<Matched<U, CtxResult>>(result) &&
                        result instanceof Object &&
                        (
                            result.length === 1 ||
                            (
                                result.length === 2 &&
                                (
                                    result[1] === null ||
                                    Detach.match(result[1])
                                )
                            )
                        )
                    );
                }

            }

            export type Detach<CtxResult> = Detach.FromEvt | Detach.WithCtxArg<CtxResult>;

            export namespace Detach {

                export type FromEvt = "DETACH";

                export namespace FromEvt {

                    export function match(detach: any): detach is FromEvt {
                        return detach === "DETACH";
                    }

                }

                export type WithCtxArg<CtxResult> = WithCtxArg.Void | WithCtxArg.Arg<CtxResult>;

                export namespace WithCtxArg {

                    export type Void =
                        { DETACH: VoidCtx; err: Error; } |
                        { DETACH: VoidCtx; }
                        ;

                    export type Arg<CtxResult> =
                        { DETACH: Ctx<CtxResult>; err: Error; } |
                        { DETACH: Ctx<CtxResult>; res: CtxResult; }
                        ;

                    export function match<CtxResult>(detach: any): detach is WithCtxArg<CtxResult> {
                        return (
                            typeGuard.dry<Detach<CtxResult>>(detach) &&
                            detach instanceof Object &&
                            detach.DETACH instanceof Object
                        );
                    }

                }

                export function match<CtxResult>(detach: any): detach is Detach<CtxResult> {
                    return FromEvt.match(detach) || WithCtxArg.match(detach);
                }

            }

        }

    }

    export type Stateless<T, U, CtxResult> =
        fλ.Stateless<T, U, CtxResult> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}
