
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

            export function match<T, U>(op: Operator<T,U>): op is Stateful<T, U> {
                return typeof op !== "function";
            }

        }

        /**
         * [U] or [U,null] => pass U to the handler's callback.
         * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
         * null => do not pass the event data to the handler callback.
         * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
         */
        export type Result<U> = Result.Matched<U> | Result.NotMatched;

        export namespace Result {

            //export type Detach = "DETACH" | { DETACH: import("./EvtCompat").HandlerGroup };
            export type Detach = "DETACH";

            export namespace Detach {

                export function match($result: Result<any>): $result is Detach {
                    return $result === "DETACH";
                }

            }

            export type NotMatched = Detach | null;

            export namespace NotMatched {

                export function match($result: Result<any>): $result is NotMatched {
                    return (
                        $result === null ||
                        Detach.match($result)
                    );
                }

            }

            export type Matched<U> = Matched.NoDetachArg<U> | Matched.WithDetachArg<U>;

            export namespace Matched {

                export type NoDetachArg<U> = readonly [U];
                export type WithDetachArg<U> = readonly [U, Detach | null];

                export function match($result: Result<any>): $result is Matched<any> {
                    return !NotMatched.match($result)
                }

            }

        }

        

        /**
         * When using a λ operator with
         * waitFor, attachOnce or attachOncePrepend 
         * the first matched event will cause the handler
         * to be detached so there is no purpose of 
         * detaching via the matcher or using a stateful matcher
         */
        export type Once<T, U> = (data: T) => (
            Result.Matched.NoDetachArg<U>
            |
            Result.NotMatched
        );

        //const o: fλ<any,any> = null as any as Once<any, any>;

    }

    export type Stateless<T, U> =
        fλ.Stateless<T, U> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}




/*
function f<T,U,V>(m1: Matcher<T,U>, m2: Matcher<U,V>){
}

f(
(data: string) => [data] as const,
data => [data.length] as const
);
*/

