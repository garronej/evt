import { typeGuard } from "../../tools/typeSafety";
type CtxLike<Result> = import("./interfaces").CtxLike<Result>;
type VoidCtxLike = import("./interfaces").VoidCtxLike;


/** https://docs.evt.land/api/operator */
export type Operator<T, U, CtxResult = any> =
    Operator.fλ<T, U, CtxResult> |
    ((data: U) => boolean) | //Filter
    (U extends T ? (data: T) => data is U : never) //Type guard
    ;

export namespace Operator {

    export type fλ<T, U, CtxResult = any> =
        fλ.Stateless<T, U, CtxResult> |
        fλ.Stateful<T, U, CtxResult>
        ;

    export namespace fλ {

        export type Stateless<T, U, CtxResult = any> = (data: T, prev?: undefined, isPost?: true) => Result<U, CtxResult>;

        export type Stateful<T, U, CtxResult = any> = [
            (data: T, prev: U, isPost?: true) => Result<U, CtxResult>,
            U //Seed
        ];

        export namespace Stateful {

            export function match<T, U, CtxResult>(op: Operator<T, U, CtxResult>): op is Stateful<T, U, CtxResult> {
                return typeof op !== "function";
            }

        }

        export type Result<U, CtxResult = any> = Result.Matched<U, CtxResult> | Result.NotMatched<CtxResult>;

        export namespace Result {

            export function match<U, CtxResult>(result: any): result is Result<U, CtxResult> {
                return Matched.match(result) || NotMatched.match(result);
            }

            export function getDetachArg<CtxResult>(result: Result<any, CtxResult>): boolean | [CtxLike<CtxResult>, undefined | Error, CtxResult] {

                const detach = Matched.match<any, CtxResult>(result) ? result[1] : result;

                if (Detach.FromEvt.match(detach)) {
                    return true;
                }

                if (Detach.WithCtxArg.match<CtxResult>(detach)) {
                    return [
                        detach.DETACH as Exclude<typeof detach.DETACH, VoidCtxLike>,
                        (detach as Extract<Result<any,CtxResult>, { err: any }>).err,
                        (detach as Extract<Result<any, CtxResult>, { res: any }>).res
                    ];
                }


                return false;

            }

            export type NotMatched<CtxResult = any> = Detach<CtxResult> | null;

            export namespace NotMatched {

                export function match<CtxResult>(result: any): result is NotMatched<CtxResult> {
                    return (
                        result === null ||
                        Detach.match(result)
                    );
                }

            }

            export type Matched<U, CtxResult= any> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U, CtxResult>;

            export namespace Matched {

                export type NoDetachArg<U> = readonly [U];

                export type WithDetachArg<U, CtxResult = any> = readonly [U, Detach<CtxResult> | null];

                export function match<U,CtxResult>(
                    result: any,
                ): result is Matched<U, CtxResult> {
                    return (
                        typeGuard<Matched<U, CtxResult>>(result) &&
                        result instanceof Object &&
                        !("input" in result) && //exclude String.prototype.match
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

            export type Detach<CtxResult = any> = Detach.FromEvt | Detach.WithCtxArg<CtxResult>;

            export namespace Detach {

                export type FromEvt = "DETACH";

                export namespace FromEvt {

                    export function match(detach: any): detach is FromEvt {
                        return detach === "DETACH";
                    }

                }

                export type WithCtxArg<CtxResult = any> = WithCtxArg.Void | WithCtxArg.Arg<CtxResult>;

                export namespace WithCtxArg {

                    export type Void =
                        { DETACH: VoidCtxLike; err: Error; } |
                        { DETACH: VoidCtxLike; }
                        ;

                    export type Arg<CtxResult> =
                        { DETACH: CtxLike<CtxResult>; err: Error; } |
                        { DETACH: CtxLike<CtxResult>; res: CtxResult; }
                        ;

                    export function match<CtxResult>(detach: any): detach is WithCtxArg<CtxResult> {
                        return (
                            typeGuard<Detach<CtxResult>>(detach) &&
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

    export type Stateless<T, U, CtxResult = any> =
        fλ.Stateless<T, U, CtxResult> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}
