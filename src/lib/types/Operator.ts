import { typeGuard } from "../../tools/typeSafety";
type CtxLike<Result> = import("./interfaces").CtxLike<Result>;
type VoidCtxLike = import("./interfaces").VoidCtxLike;

export const z_f1 = {
    "fλ_Stateful_match": function match<T, U, CtxResult>(op: Operator<T, U, CtxResult>): op is Operator.fλ.Stateful<T, U, CtxResult> {
        return typeof op !== "function";
    },
    "fλ_Result_match": function match<U, CtxResult>(result: any): result is Operator.fλ.Result<U, CtxResult> {
        return z_f1.fλ_Result_Matched_match(result) || z_f1.fλ_Result_NotMatched_match(result);
    },
    "fλ_Result_getDetachArg": function getDetachArg<CtxResult>(result: Operator.fλ.Result<any, CtxResult>): boolean | [CtxLike<CtxResult>, undefined | Error, CtxResult] {

        const detach = z_f1.fλ_Result_Matched_match<any, CtxResult>(result) ? result[1] : result;

        if (z_f1.fλ_Result_Detach_FromEvt_match(detach)) {
            return true;
        }

        if (z_f1.fλ_Result_Detach_WithCtxArg_match<CtxResult>(detach)) {
            return [
                detach.DETACH as Exclude<typeof detach.DETACH, VoidCtxLike>,
                (detach as Extract<Operator.fλ.Result<any, CtxResult>, { err: any }>).err,
                (detach as Extract<Operator.fλ.Result<any, CtxResult>, { res: any }>).res
            ];
        }

        return false;

    },
    "fλ_Result_NotMatched_match": function match<CtxResult>(result: any): result is Operator.fλ.Result.NotMatched<CtxResult> {
        return (
            result === null ||
            z_f1.fλ_Result_Detach_match(result)
        );
    },
    "fλ_Result_Matched_match": function match<U, CtxResult>(
        result: any,
    ): result is Operator.fλ.Result.Matched<U, CtxResult> {
        return (
            typeGuard<Operator.fλ.Result.Matched<U, CtxResult>>(result) &&
            result instanceof Object &&
            !("input" in result) && //exclude String.prototype.match
            (
                result.length === 1 ||
                (
                    result.length === 2 &&
                    (
                        result[1] === null ||
                        z_f1.fλ_Result_Detach_match(result[1])
                    )
                )
            )
        );
    },
    "fλ_Result_Detach_FromEvt_match": function match(detach: any): detach is Operator.fλ.Result.Detach.FromEvt {
        return detach === "DETACH";
    },
    "fλ_Result_Detach_WithCtxArg_match": function match<CtxResult>(detach: any): detach is Operator.fλ.Result.Detach.WithCtxArg<CtxResult> {
        return (
            typeGuard<Operator.fλ.Result.Detach<CtxResult>>(detach) &&
            detach instanceof Object &&
            detach.DETACH instanceof Object
        );
    },
    "fλ_Result_Detach_match": function match<CtxResult>(detach: any): detach is Operator.fλ.Result.Detach<CtxResult> {
        return z_f1.fλ_Result_Detach_FromEvt_match(detach) || z_f1.fλ_Result_Detach_WithCtxArg_match(detach);
    }


};


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

            export const match = z_f1.fλ_Stateful_match;

        }

        export type Result<U, CtxResult = any> = Result.Matched<U, CtxResult> | Result.NotMatched<CtxResult>;

        export namespace Result {

            export const match = z_f1.fλ_Result_match;

            export const getDetachArg = z_f1.fλ_Result_getDetachArg;

            export type NotMatched<CtxResult = any> = Detach<CtxResult> | null;

            export namespace NotMatched {

                export const match = z_f1.fλ_Result_NotMatched_match;

            }

            export type Matched<U, CtxResult = any> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U, CtxResult>;

            export namespace Matched {

                export type NoDetachArg<U> = readonly [U];

                export type WithDetachArg<U, CtxResult = any> = readonly [U, Detach<CtxResult> | null];

                export const match = z_f1.fλ_Result_Matched_match;

            }

            export type Detach<CtxResult = any> = Detach.FromEvt | Detach.WithCtxArg<CtxResult>;

            export namespace Detach {

                export type FromEvt = "DETACH";

                export namespace FromEvt {

                    export const match = z_f1.fλ_Result_Detach_FromEvt_match;


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

                    export const match = z_f1.fλ_Result_Detach_WithCtxArg_match;

                }

                export const match = z_f1.fλ_Result_Detach_match;

            }

        }

    }

    export type Stateless<T, U, CtxResult = any> =
        fλ.Stateless<T, U, CtxResult> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}
