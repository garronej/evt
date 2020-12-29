import { id } from "../../tools/typeSafety/id";
import * as _1 from "../types/Operator";

export function encapsulateOpState<T, U, CtxOperator>(
    statefulFλOp: _1.Operator.fλ.Stateful<T, U, CtxOperator>
): _1.Operator.fλ.Stateless<T, U, CtxOperator> {

    let state: U = statefulFλOp[1];

    return id<_1.Operator.fλ.Stateless<T, U, CtxOperator>>(
        (...[data, , cbInvokedIfMatched]) => {

            const opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);

            if (
                !!cbInvokedIfMatched &&
                _1.z_f1.fλ_Result_Matched_match(opResult)
            ) {

                state = opResult[0];

            }

            return opResult;

        }
    );

}