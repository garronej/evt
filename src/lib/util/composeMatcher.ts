import { $Matcher } from "../types/$Matcher";

export function composeMatcher<A, B, C>(
    tm1: $Matcher<A, B>,
    tm2: $Matcher<B, C>
): $Matcher<A, C> {

    let bPrev: B | undefined = typeof tm1 === "function" ? undefined : tm1[1];

    const f = (a: A, cPrev?: C, cbInvokedIfMatched?: true) => {

        //console.log({ a, cPrev, cbInvokedIfMatched });

        const bWrap = typeof tm1 === "function" ?
            tm1(a, undefined, cbInvokedIfMatched) :
            tm1[0](a, bPrev!, cbInvokedIfMatched)
            ;

        if ($Matcher.Result.NotMatched.match(bWrap)) {
            return bWrap;
        }

        const [b] = bWrap;


        const cWrap = typeof tm2 === "function" ?
            tm2(b, undefined, cbInvokedIfMatched) :
            tm2[0](b, cPrev!, cbInvokedIfMatched)

        if (
            !!cbInvokedIfMatched &&
            typeof tm1 !== "function" &&
            $Matcher.Result.Matched.match(cWrap)
        ) {
            bPrev = b;
        }

        return cWrap;


    };

    return typeof tm2 === "function" ? f : [f, tm2[1]];

}

export namespace composeMatcher {

    export function many<T>(
        args: [
            $Matcher<T, any>,
            ...$Matcher<any, any>[]
        ]
    ): $Matcher<T, any> {

        if (args.length === 1) {
            return args[0];
        }

        const [tm1, tm2, ...rest] = args;

        return many([
            composeMatcher(tm1, tm2),
            ...rest
        ]);

    }

}


