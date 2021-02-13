
/** https://docs.evt.land/api/operator */
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

        export type Stateless<T, U> = (data: T, prev?: undefined, isPost?: true) => Result<U>;

        export type Stateful<T, U> = [
            (data: T, prev: U, isPost?: true) => Result<U>,
            U //Seed
        ];

        export namespace Stateful {

            export function match<T, U>(op: Operator<T, U>): op is Stateful<T, U> {
                return typeof op !== "function";
            }

        }

        export type Result<U> = readonly [U] | null;


    }

    export type Stateless<T, U> =
        fλ.Stateless<T, U> |
        ((data: U) => boolean) |
        (U extends T ? (data: T) => data is U : never)
        ;

}
