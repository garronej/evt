

import { assert, typeGuard } from "../typeSafety";
import { ReduceArguments, toReduceArguments } from "./reduceify";

function arrSplitImpl<ArrOf, U extends ArrOf>(
    arr: readonly ArrOf[],
    matcher: (entry: ArrOf) => entry is U
): [U[], Exclude<ArrOf, U>[]] {

    return arr.reduce<[U[], Exclude<ArrOf, U>[]]>((previousValue, currentValue) => {

        if (matcher(currentValue)) {

            previousValue[0].push(currentValue);

        } else {

            //NOTE: Should be deduced by the compiler
            assert(typeGuard.dry<Exclude<ArrOf, U>>(currentValue));

            previousValue[1].push(currentValue);

        }

        return previousValue;

    }, [[], []]);

}

export function arrSplit<ArrOf, U extends ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => entry is U): [U[], Exclude<ArrOf, U>[]];
export function arrSplit<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]];
export function arrSplit<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]] {
    return arrSplitImpl(arr, (entry: ArrOf): entry is ArrOf => matcher(entry));
}

export function split<ArrOf, U extends ArrOf>(
    matcher: (entry: ArrOf) => entry is U
): ReduceArguments<ArrOf, [U[], Exclude<ArrOf, U>[]]>;
export function split<ArrOf>(
    matcher: (entry: ArrOf) => boolean
): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]>;
export function split<ArrOf>(
    matcher: (entry: ArrOf) => boolean
): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]> | ReduceArguments<ArrOf, [any[], Exclude<ArrOf, any>[]]> {
    return toReduceArguments<ArrOf, [ArrOf[], ArrOf[]], [(entry: ArrOf) => boolean]>(arrSplit, matcher);
}