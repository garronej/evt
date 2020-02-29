import { ReduceArguments } from "./reduceify";
export declare function arrSplit<ArrOf, U extends ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => entry is U): [U[], Exclude<ArrOf, U>[]];
export declare function arrSplit<ArrOf>(arr: readonly ArrOf[], matcher: (entry: ArrOf) => boolean): [ArrOf[], ArrOf[]];
export declare function split<ArrOf, U extends ArrOf>(matcher: (entry: ArrOf) => entry is U): ReduceArguments<ArrOf, [U[], Exclude<ArrOf, U>[]]>;
export declare function split<ArrOf>(matcher: (entry: ArrOf) => boolean): ReduceArguments<ArrOf, [ArrOf[], ArrOf[]]>;
