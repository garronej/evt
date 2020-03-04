
import { Operator } from "../types/Operator";

export function invokeOperator<T, U>(op: Operator.fλ.Stateless<T, U>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<U>;
export function invokeOperator<T, U extends T>(op: (data: T) => data is U, data: T): Operator.fλ.Result<U>;
export function invokeOperator<T>(op: (data: T) => boolean, data: T): Operator.fλ.Result<T>;
export function invokeOperator<T, U>(op: Operator.Stateless<T, U>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<U>;
export function invokeOperator<T>(op: Operator.Stateless<T, any>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<any> {

    const result = op(data, undefined, cbInvokedIfMatched);

    return Operator.fλ.Result.match(result) ?
        result :
        !!result ? [data] : null
        ;

}