import { encapsulateOpState } from "./encapsulateOpState";
import { invokeOperator } from "./invokeOperator";
import { id } from "../../tools/typeSafety/id";
import { assert } from "../../tools/typeSafety/assert";
import { typeGuard } from "../../tools/typeSafety/typeGuard";
import * as _1 from "../types/Operator";

function f_o_g<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: _1.Operator<A, B, CtxResultOp1>,
    op2: _1.Operator<B, C, CtxResultOp2>
): _1.Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2> {

    const opAtoB = _1.z_f1.fλ_Stateful_match(op1) ?
        encapsulateOpState(op1) :
        id<_1.Operator.Stateless<A, B, CtxResultOp1>>(op1)
        ;

    const opBtoC = _1.z_f1.fλ_Stateful_match(op2) ?
        encapsulateOpState(op2) :
        id<_1.Operator.Stateless<B, C, CtxResultOp2>>(op2)
        ;

    return id<_1.Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>>(
        (...[dataA, , isPost]) => {

            const resultB = invokeOperator(
                opAtoB,
                dataA,
                isPost
            );

            if (_1.z_f1.fλ_Result_NotMatched_match<CtxResultOp1>(resultB)) {
                //CtxResultOp1 assignable to CtxResultOp1 | CtxResultOp2...
                assert(typeGuard<_1.Operator.fλ.Result.NotMatched<CtxResultOp1 | CtxResultOp2>>(resultB));
                return resultB;
            }


            const detachOp1 = !!resultB[1] ? resultB[1] : null;

            //...same...
            assert(typeGuard<_1.Operator.fλ.Result.Detach<CtxResultOp1 | CtxResultOp2> | null>(detachOp1));

            const [dataB] = resultB;

            const resultC = invokeOperator(
                opBtoC,
                dataB,
                isPost
            );

            if (_1.Operator.fλ.Result.NotMatched.match<CtxResultOp2>(resultC)) {
                //...same
                assert(typeGuard<_1.Operator.fλ.Result.NotMatched<CtxResultOp1 | CtxResultOp2>>(resultC));
                return detachOp1 !== null ? detachOp1 : resultC;
            }

            return id<_1.Operator.fλ.Result<C, CtxResultOp1 | CtxResultOp2>>([
                resultC[0],
                !!detachOp1 ? detachOp1 : (!!resultC[1] ? resultC[1] : null)
            ]);



        }
    );
}

export function compose<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: _1.Operator.fλ<A, B, CtxResultOp1>,
    op2: _1.Operator.fλ<B, C, CtxResultOp2>
): _1.Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>;
export function compose<A, B, C extends B, CtxResult = any>(
    op1: _1.Operator.fλ<A, B, CtxResult>,
    op2: (data: B) => data is C,
): _1.Operator.fλ.Stateless<A, C, CtxResult>;
export function compose<A, B, CtxResult = any>(
    op1: _1.Operator.fλ<A, B, CtxResult>,
    op2: (data: B) => boolean,
): _1.Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B extends A, C, CtxResult = any>(
    op1: (data: A) => data is B,
    op2: _1.Operator.fλ<B, C, CtxResult>
): _1.Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B, CtxResult = any>(
    op1: (data: A) => boolean,
    op2: _1.Operator.fλ<A, B, CtxResult>
): _1.Operator.fλ.Stateless<A, B, CtxResult>;
export function compose<A, B extends A, C extends B>(
    op1: (data: A) => data is B,
    op2: (data: B) => data is C,
): _1.Operator.fλ.Stateless<A, C, never>;
export function compose<A, B extends A>(
    op1: (data: A) => data is B,
    op2: (data: B) => boolean,
): _1.Operator.fλ.Stateless<A, B, never>;
export function compose<A, B extends A>(
    op1: (data: A) => boolean,
    op2: (data: A) => data is B
): _1.Operator.fλ.Stateless<A, B, never>;
export function compose<A>(
    op1: (data: A) => boolean,
    op2: (data: A) => boolean,
): _1.Operator.fλ.Stateless<A, A, never>;


export function compose<A, B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
    op1: _1.Operator.fλ<A, B, CtxResultOp1>,
    op2: _1.Operator.fλ<B, C, CtxResultOp2>,
    op3: _1.Operator.fλ<C, D, CtxResultOp3>
): _1.Operator.fλ.Stateless<A, D, CtxResultOp1 | CtxResultOp2 | CtxResultOp3>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
    op1: _1.Operator.fλ<A, B, CtxResultOp1>,
    op2: _1.Operator.fλ<B, C, CtxResultOp2>,
    op3: _1.Operator.fλ<C, D, CtxResultOp3>,
    op4: _1.Operator.fλ<D, E, CtxResultOp4>
): _1.Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
    op1: _1.Operator.fλ<A, B, CtxResultOp1>,
    op2: _1.Operator.fλ<B, C, CtxResultOp2>,
    op3: _1.Operator.fλ<C, D, CtxResultOp3>,
    op4: _1.Operator.fλ<D, E, CtxResultOp4>
): _1.Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4>;

export function compose<A, B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
    op1: _1.Operator.fλ<A, B, CtxResultOp1>,
    op2: _1.Operator.fλ<B, C, CtxResultOp2>,
    op3: _1.Operator.fλ<C, D, CtxResultOp3>,
    op4: _1.Operator.fλ<D, E, CtxResultOp4>,
    op5: _1.Operator.fλ<E, F, CtxResultOp5>
): _1.Operator.fλ.Stateless<A, F, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;


export function compose<A, B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
    op1: _1.Operator<A, B, CtxResultOp1>,
    op2: _1.Operator<B, C, CtxResultOp2>
): _1.Operator.fλ.Stateless<A, C, CtxResultOp1 | CtxResultOp2>;

export function compose<A, B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
    op1: _1.Operator<A, B, any>,
    op2: _1.Operator<B, C, any>,
    op3: _1.Operator<C, D, any>
): _1.Operator.fλ.Stateless<A, D, CtxResultOp1 | CtxResultOp2 | CtxResultOp3>;

export function compose<A, B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
    op1: _1.Operator<A, B, CtxResultOp1>,
    op2: _1.Operator<B, C, CtxResultOp2>,
    op3: _1.Operator<C, D, CtxResultOp3>,
    op4: _1.Operator<D, E, CtxResultOp4>,
): _1.Operator.fλ.Stateless<A, E, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;

export function compose<A, B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
    op1: _1.Operator<A, B, CtxResultOp1>,
    op2: _1.Operator<B, C, CtxResultOp2>,
    op3: _1.Operator<C, D, CtxResultOp3>,
    op4: _1.Operator<D, E, CtxResultOp4>,
    op5: _1.Operator<E, F, CtxResultOp5>
): _1.Operator.fλ.Stateless<A, F, CtxResultOp1 | CtxResultOp2 | CtxResultOp3 | CtxResultOp4 | CtxResultOp5>;


export function compose<T>(
    ...ops: [
        _1.Operator<T, any, any>,
        ..._1.Operator<any, any, any>[]
    ]
): _1.Operator.Stateless<T, any, any>;

export function compose<T>(
    ...ops: [
        _1.Operator<T, any, any>,
        ..._1.Operator<any, any, any>[]
    ]
): _1.Operator.Stateless<T, any, any> | _1.Operator.Stateless<T, any, never> {

    if (ops.length === 1) {

        const [op] = ops;

        return _1.z_f1.fλ_Stateful_match<T, any, any>(op) ?
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
