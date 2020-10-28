import { Operator } from "../types/Operator";
export declare function encapsulateOpState<T, U, CtxOperator>(statefulFλOp: Operator.fλ.Stateful<T, U, CtxOperator>): Operator.fλ.Stateless<T, U, CtxOperator>;
