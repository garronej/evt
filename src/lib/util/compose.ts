import { encapsulateOpState } from "./encapsulateOpState";
import { invokeOperator } from "./invokeOperator";
import { Operator } from "../types/Operator";
import { id } from "../../tools/typeSafety/id";
import { assert } from "../../tools/typeSafety/assert";
import { typeGuard } from "../../tools/typeSafety/typeGuard";

function f_o_g<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: Operator<A, B, CtxResultOp1>,
    op2: Operator<B, C, CtxResultOp2>
): Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2> {

    const opAtoB = Operator.fλ.Stateful.match(op1) ?
        encapsulateOpState(op1) :
        id<Operator.Stateless<A, B, CtxResultOp1>>(op1)
        ;

    const opBtoC = Operator.fλ.Stateful.match(op2) ?
        encapsulateOpState(op2) :
        id<Operator.Stateless<B, C, CtxResultOp2>>(op2)
        ;

    return id<Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>>(
        (...[dataA, , isPost]) => {

            const resultB = invokeOperator(
                opAtoB,
                dataA,
                isPost
            );

            if (Operator.fλ.Result.NotMatched.match<CtxResultOp1>(resultB)) {
                //CtxResultOp1 assignable to CtxResultOp1 | CtxResultOp2...
                assert(typeGuard<Operator.fλ.Result.NotMatched<CtxResultOp1 | CtxResultOp2>>(resultB));
                return resultB;
            }


            const detachOp1 = resultB[1] ?? null;

            //...same...
            assert(typeGuard<Operator.fλ.Result.Detach<CtxResultOp1 | CtxResultOp2>>(detachOp1));

            const [dataB] = resultB;

            const resultC= invokeOperator(
                opBtoC,
                dataB,
                isPost
            );

            if (Operator.fλ.Result.NotMatched.match<CtxResultOp2>(resultC)) {
                //...same
                assert(typeGuard<Operator.fλ.Result.NotMatched<CtxResultOp1 | CtxResultOp2>>(resultC));
                return detachOp1 ?? resultC;
            }

            return id<Operator.fλ.Result<C, CtxResultOp1 | CtxResultOp2>>([ 
                resultC[0],
                detachOp1 ?? resultC[1] ?? null 
            ]);



        }
    );
}

export function compose<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: Operator.fλ<A, B, CtxResultOp1>,
    op2: Operator.fλ<B, C, CtxResultOp2>
): Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>;
export function compose<A, B, C extends B, CtxResult = any>(
    op1: Operator.fλ<A, B, CtxResult>,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C, CtxResult>;
export function compose<A, B, CtxResult = any>(
    op1: Operator.fλ<A, B, CtxResult>,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B extends A, C, CtxResult = any>(
    op1: (data: A) => data is B,
    op2: Operator.fλ<B, C, CtxResult>
): Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B, CtxResult = any>(
    op1: (data: A) => boolean,
    op2: Operator.fλ<A, B, CtxResult>
): Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B extends A, C extends B>(
    op1: (data: A) => data is B,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C, never>;
export function compose<A, B extends A>(
    op1: (data: A) => data is B,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B, never>;
export function compose<A, B extends A>(
    op1: (data: A) => boolean,
    op2: (data: A) => data is B
): Operator.fλ.Stateless<A, B, never>;
export function compose<A>(
    op1: (data: A) => boolean,
    op2: (data: A) => boolean,
): Operator.fλ.Stateless<A, A, never>;


export function compose<A, B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
    op1: Operator.fλ<A, B, CtxResultOp1>,
    op2: Operator.fλ<B, C, CtxResultOp2>,
    op3: Operator.fλ<C, D, CtxResultOp3>
): Operator.fλ.Stateless<A, D, CtxResultOp1 | CtxResultOp2 | CtxResultOp3>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
    op1: Operator.fλ<A, B, CtxResultOp1>,
    op2: Operator.fλ<B, C, CtxResultOp2>,
    op3: Operator.fλ<C, D, CtxResultOp3>,
    op4: Operator.fλ<D, E, CtxResultOp4>
): Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
    op1: Operator.fλ<A, B, CtxResultOp1>,
    op2: Operator.fλ<B, C, CtxResultOp2>,
    op3: Operator.fλ<C, D, CtxResultOp3>,
    op4: Operator.fλ<D, E, CtxResultOp4>
): Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4>;

export function compose<A, B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
    op1: Operator.fλ<A, B, CtxResultOp1>,
    op2: Operator.fλ<B, C, CtxResultOp2>,
    op3: Operator.fλ<C, D, CtxResultOp3>,
    op4: Operator.fλ<D, E, CtxResultOp4>,
    op5: Operator.fλ<E, F, CtxResultOp5>
): Operator.fλ.Stateless<A, F, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;


export function compose<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: Operator<A, B, CtxResultOp1>,
    op2: Operator<B, C, CtxResultOp2>
): Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>;

export function compose<A, B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
    op1: Operator<A, B, any>,
    op2: Operator<B, C, any>,
    op3: Operator<C, D, any>
): Operator.fλ.Stateless<A, D, CtxResultOp1 | CtxResultOp2 | CtxResultOp3>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
    op1: Operator<A, B, CtxResultOp1>,
    op2: Operator<B, C, CtxResultOp2>,
    op3: Operator<C, D, CtxResultOp3>,
    op4: Operator<D, E, CtxResultOp4>,
): Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;

export function compose<A, B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 =any, CtxResultOp5 = any>(
    op1: Operator<A, B, CtxResultOp1>,
    op2: Operator<B, C, CtxResultOp2>,
    op3: Operator<C, D, CtxResultOp3>,
    op4: Operator<D, E, CtxResultOp4>,
    op5: Operator<E, F, CtxResultOp5>
): Operator.fλ.Stateless<A, F, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;


export function compose<T>(
    ...ops: [
        Operator<T, any, any>,
        ...Operator<any, any, any>[]
    ]
): Operator.Stateless<T, any, any>;

export function compose<T>(
    ...ops: [
        Operator<T, any, any>,
        ...Operator<any, any, any>[]
    ]
): Operator.Stateless<T, any, any> | Operator.Stateless<T, any, never> {

    if (ops.length === 1) {

        const [op] = ops;

        return Operator.fλ.Stateful.match<T, any, any>(op) ?
            encapsulateOpState(op) :
            op
            ;

    }

    const [op1, op2, ...rest] = ops;

    const op1_o_op2 = f_o_g(op1, op2);

    if (rest.length === 0) {
        return op1_o_op2;
    }

    return compose(op1_o_op2, ...rest);


}
