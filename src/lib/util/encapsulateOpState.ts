import { id } from "../../tools/typeSafety/id";
import * as nsOperator from "../types/Operator";
import type { Operator } from "../types/Operator";
// NOTE: For compat with --no-check 
// https://github.com/asos-craigmorten/opine/issues/97#issuecomment-751806014
const { Operator: OperatorAsValue } = nsOperator;


export function encapsulateOpState<T, U, CtxOperator>(
    statefulFλOp: Operator.fλ.Stateful<T, U, CtxOperator>
): Operator.fλ.Stateless<T, U, CtxOperator> {

    let state: U = statefulFλOp[1];

    return id<Operator.fλ.Stateless<T, U, CtxOperator>>(
        (...[data, , cbInvokedIfMatched]) => {

            const opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);

            if (
                !!cbInvokedIfMatched &&
                OperatorAsValue.fλ.Result.Matched.match(opResult)
            ) {

                state = opResult[0];

            }

            return opResult;

        }
    );

}