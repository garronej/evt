
import { Operator, NonPostableEvt } from "../lib/types/index.ts";
import { StatefulEvt } from "../lib/StatefulEvt.ts";
import { same } from "../tools/inDepth/same.ts";

const initialValue = {};

export const onlyIfChanged= <T>(
    params?: {
        areEqual?: (a: T, b: T) => boolean;
    }
): Operator.fλ.Stateful<T, T> => {

    const { areEqual = same } = params ?? {};

    const op: Operator.fλ.Stateful<T, T> = [
        function (this: NonPostableEvt<T>, data: T, prev: T) {
            return (
                this instanceof StatefulEvt ? 
                areEqual(data, this.state) : 
                prev === initialValue ? false : areEqual(data, prev)
            ) ? null : [data];
        },
        initialValue as T
    ] ;

    return op;

}

