
//NOTE: We cannot import type { Operator } from "../../types/Operator";
//for TypeScript backward compatibility reasons.

export const to = <T extends readonly [string, any], K extends T[0]>(
    eventName: K
): import("../../types/Operator").Operator.fλ.Stateless<T, (Extract<T, readonly [K, any]> extends never ? T : Extract<T, readonly [K, any]>)[1] , never> =>
    data => data[0] !== eventName ?
        null : [data[1]]
    ;