import { encapsulateOpState } from "./encapsulateOpState";
import { invokeOperator } from "./invokeOperator";
import { Operator } from "../types/Operator";
import { id } from "../../tools/typeSafety/id";


function f_o_g<A, B, C>(
    op1: Operator<A, B>,
    op2: Operator<B, C>
): Operator.fλ.Stateless<A, C> {

    const opAtoB = Operator.fλ.Stateful.match(op1) ?
        encapsulateOpState(op1) :
        id<Operator.Stateless<A, B>>(op1)
        ;

    const opBtoC = Operator.fλ.Stateful.match(op2) ?
        encapsulateOpState(op2) :
        id<Operator.Stateless<B, C>>(op2)
        ;

    return id<Operator.fλ.Stateless<A, C>>(
        (...[dataA, , cbInvokedIfMatched]) => {

            const resultB = invokeOperator(
                opAtoB,
                dataA,
                cbInvokedIfMatched
            );

            if (Operator.fλ.Result.NotMatched.match(resultB)) {
                return resultB;
            }

            const [dataB] = resultB;

            return invokeOperator(
                opBtoC,
                dataB,
                cbInvokedIfMatched
            );


        }
    );
}

export function composeOperators<A, B, C>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>
): Operator.fλ.Stateless<A, C>;
export function composeOperators<A, B, C extends B>(
    op1: Operator.fλ<A, B>,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C>;
export function composeOperators<A, B>(
    op1: Operator.fλ<A, B>,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B>;
export function composeOperators<A, B extends A, C>(
    op1: (data: A) => data is B,
    op2: Operator.fλ<B, C>
): Operator.fλ.Stateless<A, B>;
export function composeOperators<A, B>(
    op1: (data: A) => boolean,
    op2: Operator.fλ<A, B>
): Operator.fλ.Stateless<A, B>;
export function composeOperators<A, B extends A, C extends B>(
    op1: (data: A) => data is B,
    op2: (data: B) => data is C,
): Operator.fλ.Stateless<A, C>;
export function composeOperators<A, B extends A>(
    op1: (data: A) => data is B,
    op2: (data: B) => boolean,
): Operator.fλ.Stateless<A, B>;
export function composeOperators<A, B extends A>(
    op1: (data: A) => boolean,
    op2: (data: A) => data is B
): Operator.fλ.Stateless<A, B>;
export function composeOperators<A>(
    op1: (data: A) => boolean,
    op2: (data: A) => boolean,
): Operator.fλ.Stateless<A, A>;


export function composeOperators<A, B, C, D>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>
): Operator.fλ.Stateless<A, D>;

export function composeOperators<A, B, C, D, E>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>
): Operator.fλ.Stateless<A, E>;

export function composeOperators<A, B, C, D, E>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>
): Operator.fλ.Stateless<A, E>;

export function composeOperators<A, B, C, D, E, F>(
    op1: Operator.fλ<A, B>,
    op2: Operator.fλ<B, C>,
    op3: Operator.fλ<C, D>,
    op4: Operator.fλ<D, E>,
    op5: Operator.fλ<E, F>,
): Operator.fλ.Stateless<A, F>;


export function composeOperators<A, B, C>(
    op1: Operator<A, B>,
    op2: Operator<B, C>
): Operator.fλ.Stateless<A, C>;

export function composeOperators<A, B, C, D>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>
): Operator.fλ.Stateless<A, D>;

export function composeOperators<A, B, C, D, E>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>,
    op4: Operator<D, E>,
): Operator.fλ.Stateless<A, E>;

export function composeOperators<A, B, C, D, E, F>(
    op1: Operator<A, B>,
    op2: Operator<B, C>,
    op3: Operator<C, D>,
    op4: Operator<D, E>,
    op5: Operator<E, F>
): Operator.fλ.Stateless<A, F>;


export function composeOperators<T>(
    ...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]
): Operator.Stateless<T, any>;

export function composeOperators<T>(
    ...ops: [
        Operator<T, any>,
        ...Operator<any, any>[]
    ]
): Operator.Stateless<T, any> {

    if (ops.length === 1) {

        const [op] = ops;

        return Operator.fλ.Stateful.match<T, any>(op) ?
            encapsulateOpState(op) :
            op
            ;

    }

    const [op1, op2, ...rest] = ops;

    const op1_o_op2 = f_o_g(op1, op2);

    if (rest.length === 0) {
        return op1_o_op2;
    }

    return composeOperators(op1_o_op2, ...rest);


}




/*

opCompose(
    (data: string)=> [ data.length ],
    data => [ `${data}` ]
);

opCompose(
    (data: string)=> true,
    (data)=> [ data.length ],
);

opCompose(
    (data: string)=> [ data.length ],
    (data)=> true,
);
opCompose(
    (data: string)=> true,
    data=> true,
);

opCompose(
    (data: string | number): data is string => true,
    data=> [ data.length ]
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    (data): data is Function=> true
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    data => typeof data === "string" ? [ data ] : null
);

opCompose(
    (data: string | number | Function ): data is (string | Function) => true,
    data => true
);

opCompose(
    (data: string | number | Function) => true,
    (data): data is (string | Function) => true,
);

opCompose(
    (data: string) => [ data.length > 3 ? data.length : data ],
    (data): data is string => true,
);


opCompose(
    id<Operator<string,string>>((data: string) => true),
    id<Operator<string, number>>((data: string) => [data.length] as const)
);



opCompose(
    id<Operator<string, string>>(
        (data: string) => true
    ),
    id<Operator.fλ<string, number>>(
        (data) => [data.length]
    ),
    id<Operator.fλ<number, string>>(
        data => [`${data}`]
    )
);

opCompose(
    (data: string)=> [data],
    data => [data],
    data => [data]
);

opCompose(
    (data: string)=> [ data],
    data => [ data ],
    data => [ data ],
    data => [ data ],
    data => [ data ]
);

*/
