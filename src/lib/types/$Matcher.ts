
export type $Matcher<T, U> =
    $Matcher.Stateless<T, U> |
    $Matcher.Stateful<T, U>
    ;

export namespace $Matcher {

    /**
     * When using a transformative matcher with
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

    export type Stateless<T, U> = (data: T, prev?: undefined, cbInvokedIfMatched?: true) => Result<U>;

    /** [ $Matcher function, initial value ] */
    export type Stateful<T, U> = [(data: T, prev: U, cbInvokedIfMatched?: true) => Result<U>, U];

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

            export function match($result: Result<any>): $result is NotMatched {
                return !NotMatched.match($result)
            }

        }



    }

}
