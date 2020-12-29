
import * as _1 from "../types/Operator";

/** 
 * Invoke any type of stateless operator and return as if it was a fλ.
 * Intended to be used alongside Evt.prototype.getStatelessOp()
*/
export function invokeOperator<T, U, CtxResult>(op: _1.Operator.fλ.Stateless<T, U, CtxResult>, data: T, isPost?: true): _1.Operator.fλ.Result<U, CtxResult>;
export function invokeOperator<T, U extends T>(op: (data: T) => data is U, data: T): _1.Operator.fλ.Result<U, never>;
export function invokeOperator<T>(op: (data: T) => boolean, data: T): _1.Operator.fλ.Result<T, never>;
export function invokeOperator<T, U, CtxResult>(op: _1.Operator.Stateless<T, U, CtxResult>, data: T, isPost?: true): _1.Operator.fλ.Result<U, CtxResult>;
export function invokeOperator<T>(op: _1.Operator.Stateless<T, any, any>, data: T, isPost?: true): _1.Operator.fλ.Result<any, any> | _1.Operator.fλ.Result<any, never> {

    const result = op(data, undefined, isPost);

    return _1.z_f1.fλ_Result_match(result) ?
        result :
        !!result ? [data] : null
        ;

}