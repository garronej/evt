type Ctx = import("../Ctx").Ctx;
type CtxConstructor = typeof import("../Ctx").Ctx;
import { typeGuard } from "../../tools/typeSafety";
import { id } from "../../tools/typeSafety/id";

export type Operator<T, U> =
    Operator.fλ<T, U> |
    ((data: U) => boolean) | //Filter
    (U extends T ? (data: T) => data is U : never) //Type guard
    ;

export namespace Operator {

    export type fλ<T, U> =
        fλ.Stateless<T, U> |
        fλ.Stateful<T, U>
        ;

    export namespace fλ {

        export type Stateless<T, U> = (data: T, prev?: undefined, cbInvokedIfMatched?: true) => Result<U>;

        export type Stateful<T, U> = [
            (data: T, prev: U, cbInvokedIfMatched?: true) => Result<U>,
            U //Initial value
        ];

        export namespace Stateful {

            export function match<T, U>(op: Operator<T, U>): op is Stateful<T, U> {
                return typeof op !== "function";
            }

        }

        export type Result<U> = Result.Matched<U> | Result.NotMatched;

        export namespace Result {

            export function match<U>(result: any): result is Result<U> {
                return Matched.match(result) || NotMatched.match(result);
            }

            export function getDetachArg(result: Result<any>): boolean | Ctx {

                const detach = Matched.match(result) ? result[1] : result;

                if (Detach.FromEvt.match(detach)) {
                    return true;
                }

                if (Detach.WithCtxArg.match(detach)) {
                    return detach.DETACH;
                }

                return false;

            }

            export type NotMatched = Detach | null;

            export namespace NotMatched {

                export function match(result: any): result is NotMatched {
                    return (
                        result === null ||
                        Detach.match(result)
                    );
                }

            }

            export type Matched<U> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U>;

            export namespace Matched {

                export type NoDetachArg<U> = readonly [U];

                export type WithDetachArg<U> = readonly [U, Detach | null];

                export function match(
                    result: any,
                ): result is Matched<any> {
                    return (
                        typeGuard.dry<Matched<any>>(result) &&
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

            export type Detach = Detach.FromEvt | Detach.WithCtxArg;

            export namespace Detach {

                export type FromEvt = "DETACH";

                export namespace FromEvt {

                    export function match(detach: any): detach is FromEvt {
                        return detach === "DETACH";
                    }

                }

                export type WithCtxArg = { DETACH: Ctx; };

                export namespace WithCtxArg {
                    export function match(detach: any): detach is WithCtxArg {
                        return (
                            typeGuard.dry<Detach>(detach) &&
                            detach instanceof Object &&
                            detach.DETACH instanceof Object &&
                            id<CtxConstructor>(
                                Object.getPrototypeOf(detach.DETACH)
                                    .constructor
                            ).__CtxForEvtBrand === true
                        );
                    }
                }

                export function match(detach: any): detach is Detach {
                    return FromEvt.match(detach) || WithCtxArg.match(detach);
                }

            }

        }

    }

    export type Stateless<T, U> =
        fλ.Stateless<T, U> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}
