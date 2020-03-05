
import { toReduceArguments, ReduceArguments } from "./reduceify";

export function arrContains<ArrOf>(
    arr: readonly ArrOf[],
    matcher: (e: ArrOf) => boolean
): boolean {

    for( const entry of arr ){

        if( !matcher(entry) ){
            continue;
        }

        return true;

    }

    return false;

}


export function contains<ArrOf>(
    matcher: (e: ArrOf) => boolean
): ReduceArguments<ArrOf, boolean> {
    return toReduceArguments(arrContains, matcher);
}