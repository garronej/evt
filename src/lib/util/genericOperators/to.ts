import { Operator } from "../../types/Operator";

export const to = <T extends readonly [string, any], K extends T[0]>(
    eventName: K
): Operator.fλ.Stateless<T, (Extract<T, readonly [K, any]> extends never ? T : Extract<T, readonly [K, any]>)[1] , never> =>
    data => data[0] !== eventName ?
        null : [data[1]]
    ;