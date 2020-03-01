import { TransformativeMatcher } from "../defs";

export function compose<A, B, C>(
    tm1: TransformativeMatcher<A, B>,
    tm2: TransformativeMatcher<B, C>
): TransformativeMatcher<A, C> {

    let bPrev: B | undefined = typeof tm1 === "function" ? undefined  : tm1[1];

    const f = (a: A, cPrev?: C, cbInvokedIfMatched?: true) => {

        //console.log({ a, cPrev, cbInvokedIfMatched });

        const bWrap = typeof tm1 === "function" ? 
            tm1(a, undefined, cbInvokedIfMatched) : 
            tm1[0](a, bPrev!, cbInvokedIfMatched)
            ;

        if (TransformativeMatcher.Returns.NotMatched.match(bWrap)) {
            return null;
        }

        const [b] = bWrap;


        const cWrap = typeof tm2 === "function" ? 
            tm2(b, undefined, cbInvokedIfMatched) : 
            tm2[0](b, cPrev!, cbInvokedIfMatched)

        if (
            !!cbInvokedIfMatched && 
            typeof tm1 !== "function" &&
            !TransformativeMatcher.Returns.NotMatched.match(cWrap)
        ) {
            bPrev = b;
        }

        return cWrap;


    };

    return typeof tm2 === "function" ? f : [f, tm2[1]];

}

/** assert args length !== 0 */
export function composeMany<T>(
    args: [
        TransformativeMatcher<T, any>,
        ...TransformativeMatcher<any, any>[]
    ]
): TransformativeMatcher<T, any> {

    if (args.length === 0) {
        throw new Error();
    }

    if (args.length === 1) {
        return args[0];
    }

    const [tm1, tm2, ...rest] = args;

    return composeMany([
        compose(tm1, tm2),
        ...rest
    ]);

}

export function scan<T, U>(
    accumulator: (acc: U, value: T, index: number) => U, seed: U
): TransformativeMatcher.Stateful<T, [T, U, number]> {
    return [
        (data, [, acc, index]) => [[data, accumulator(acc, data, index), index + 1]],
        [null as any, seed, 0]
    ];
}

export function throttleTime<T>(duration: number) {
    return compose<T, { data: T; lastClick: number; }, T>(
        [
            (data, { lastClick }) => {

                const now = Date.now();

                return now - lastClick < duration ?
                    null :
                    [{ data, "lastClick": now }]
                    ;

            },
            { "lastClick": 0, "data": null as any }
        ],
        ({ data }) => [data]
    );
}