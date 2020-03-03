
import { Operator } from "../types/Operator";

export function invokeOperator<T, U>(op: Operator.fλ.Stateless<T, U>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<U>;
export function invokeOperator<T, U extends T>(op: (data: T) => data is U, data: T): Operator.fλ.Result<U>;
export function invokeOperator<T>(op: (data: T) => boolean, data: T): Operator.fλ.Result<T>;
export function invokeOperator<T, U>(op: Operator.Stateless<T, U>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<U>;
export function invokeOperator<T>(op: Operator.Stateless<T, any>, data: T, cbInvokedIfMatched?: true): Operator.fλ.Result<any> {

    const result = op(data, undefined, cbInvokedIfMatched);

    //NOTE: We assume it was a $matcher only 
    //if the returned value is a singleton or a couple, otherwise 
    //we assume it was a filtering matcher that should have returned
    //a boolean but returned something else.
    return (
        result === null ? null :
            result === "DETACH" ? "DETACH" :
                typeof result === "object" &&
                    (result.length === 1 || result.length === 2) ? result :
                    !!result ? [data] : null
    );


}