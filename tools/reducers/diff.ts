import { ReduceArguments, toReduceArguments } from "./reduceify.ts";
import { contains } from "./contains.ts";
import { removeDuplicates } from "./removeDuplicates.ts";

export type ArrDiff<T> = {
    added: readonly T[];
    removed: readonly T[];
}

export function arrDiff<ArrOf>(
    arr: readonly ArrOf[],
    newArr: readonly ArrOf[],
    areEquals: (e1: ArrOf, e2: ArrOf) => boolean = (e1, e2) => e1 === e2
): ArrDiff<ArrOf> {

    return {
        "added": newArr
            .reduce(...removeDuplicates<ArrOf>(areEquals))
            .filter(newEntry => !arr.reduce(...contains<ArrOf>(entry => areEquals(entry, newEntry)))),
        "removed": arr
            .reduce(...removeDuplicates<ArrOf>(areEquals))
            .filter(entry => !newArr.reduce(...contains<ArrOf>(newEntry => areEquals(newEntry, entry))))
    };


}

export function diff<ArrOf>(
    newArr: readonly ArrOf[],
    areEquals?: (e1: ArrOf, e2: ArrOf) => boolean 
): ReduceArguments<ArrOf, ArrDiff<ArrOf>> {
    return toReduceArguments(arrDiff, newArr, areEquals);
}

export function diffFactory({ areEquals }: { areEquals: <T>(e1: T, e2: T) => boolean; }) {
    return { "diff": <ArrOf>(newArr: readonly ArrOf[]) => diff<ArrOf>(newArr, areEquals) };
}
