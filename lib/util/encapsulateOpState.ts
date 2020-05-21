import { id } from "../../tools/typeSafety/id.ts";
import { Operator } from "../types/Operator.ts";

export function encapsulateOpState<T, U, CtxOperator>(
    statefulFλOp: Operator.fλ.Stateful<T, U, CtxOperator>
): Operator.fλ.Stateless<T, U, CtxOperator> {

    let state: U = statefulFλOp[1];

    return id<Operator.fλ.Stateless<T, U, CtxOperator>>(
        (...[data, , cbInvokedIfMatched]) => {

            const opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);

            if (
                !!cbInvokedIfMatched &&
                Operator.fλ.Result.Matched.match(opResult)
            ) {

                state = opResult[0];

            }

            return opResult;

        }
    );

}