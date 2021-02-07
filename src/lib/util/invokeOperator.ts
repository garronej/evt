import * as nsOperator from "../types/Operator";
import type { Operator } from "../types/Operator";
// NOTE: For compat with --no-check 
// https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
const { Operator: OperatorAsValue } = nsOperator;

/** Invoke any type of stateless operator and return as if it was a fλ*/
export function invokeOperator<T, U, CtxResult>(op: Operator.fλ.Stateless<T, U, CtxResult>, data: T, isPost?: true): Operator.fλ.Result<U, CtxResult>;
export function invokeOperator<T, U extends T>(op: (data: T) => data is U, data: T): Operator.fλ.Result<U, never>;
export function invokeOperator<T>(op: (data: T) => boolean, data: T): Operator.fλ.Result<T, never>;
export function invokeOperator<T, U, CtxResult>(op: Operator.Stateless<T, U, CtxResult>, data: T, isPost?: true): Operator.fλ.Result<U, CtxResult>;
export function invokeOperator<T>(op: Operator.Stateless<T, any, any>, data: T, isPost?: true): Operator.fλ.Result<any, any> | Operator.fλ.Result<any, never> {

    const result = op(data, undefined, isPost);

    return OperatorAsValue.fλ.Result.match(result) ?
        result :
        !!result ? [data] : null
        ;

}