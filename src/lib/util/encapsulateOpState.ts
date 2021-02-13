import { id } from "../../tools/typeSafety/id";
import type { Operator } from "../types/Operator";

export function encapsulateOpState<T, U>(
    statefulFλOp: Operator.fλ.Stateful<T, U>
): Operator.fλ.Stateless<T, U> {

    let state: U = statefulFλOp[1];

    return id<Operator.fλ.Stateless<T, U>>(
        (...[data, , cbInvokedIfMatched]) => {

            const opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);

            if (
                !!cbInvokedIfMatched &&
                opResult !== null
            ) {

                state = opResult[0];

            }

            return opResult;

        }
    );

}