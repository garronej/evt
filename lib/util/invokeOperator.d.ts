import { Operator } from "../types/Operator";
/** Invoke any type of stateless operator and return as if it was a fλ*/
export declare function invokeOperator<T, U, CtxResult>(op: Operator.fλ.Stateless<T, U, CtxResult>, data: T, isPost?: true): Operator.fλ.Result<U, CtxResult>;
export declare function invokeOperator<T, U extends T>(op: (data: T) => data is U, data: T): Operator.fλ.Result<U, never>;
export declare function invokeOperator<T>(op: (data: T) => boolean, data: T): Operator.fλ.Result<T, never>;
export declare function invokeOperator<T, U, CtxResult>(op: Operator.Stateless<T, U, CtxResult>, data: T, isPost?: true): Operator.fλ.Result<U, CtxResult>;
