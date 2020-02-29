import { removeDuplicates } from "./removeDuplicates";
import { allEquals } from "./allEquals";
import { ReduceArguments, toReduceArguments } from "./reduceify";

export function arrAllUniq<ArrOf>(
    arr: readonly ArrOf[],
    areEquals: (e1: ArrOf, e2: ArrOf) => boolean = (e1, e2) => e1 === e2
): boolean {

    return [
        arr.reduce(...removeDuplicates<ArrOf>(areEquals)),
        arr
    ]
        .map(arr => arr.length)
        .reduce(...allEquals<number>((x1, x2) => x1 === x2))
        ;

}

export function allUniq<ArrOf>(
    areEquals?: (e1: ArrOf, e2: ArrOf) => boolean
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrAllUniq, areEquals);
}

export function allUniqFactory({ areEquals }: {areEquals: <T>(e1: T, e2: T) => boolean}){
    return { "allUniq": <ArrOf>() => allUniq<ArrOf>(areEquals) };
}