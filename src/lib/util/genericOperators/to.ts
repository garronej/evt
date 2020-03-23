import { Operator } from "../../types/Operator";

export const to = <T extends [string, any], K extends T[0]>(
    eventName: K
): Operator.fλ.Stateless<T, Extract<T, [K, any]>[1], never> =>
    data => data[0] !== eventName ?
        null : [data[1]]
    ;