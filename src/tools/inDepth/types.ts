import { typeGuard } from "../typeSafety/typeGuard";
import { getPrototypeChain } from "./getPrototypeChain";


export const z_ = {
    "SetLike_match":
        function match<T>(set: Object): set is SetLike<T> {
            return (
                typeGuard<SetLike<T>>(set) &&
                typeof set.values === "function" &&
                getPrototypeChain.isMatched(set, /Set/)
            );
        },
    "MapLike_match":
        function match<T, U>(map: Object): map is MapLike<T, U> {
            return (
                typeGuard<MapLike<T, U>>(map) &&
                typeof map.keys === "function" &&
                typeof map.get === "function" &&
                getPrototypeChain.isMatched(map, /Map/)
            );
        },
    "ArrayLike_match":

        function match<T>(arr: Object): arr is ArrayLike<T> {
            return (
                typeGuard<ArrayLike<T>>(arr) &&
                    typeof arr.length === "number" &&
                    arr.length !== 0 ?
                    (`${arr.length - 1}` in arr) :
                    getPrototypeChain.isMatched(arr, /Array/)
            );
        },
    "DateLike_match":
        function match(date: Object): date is DateLike {
            return (
                typeGuard<DateLike>(date) &&
                typeof date.getTime === "function" &&
                getPrototypeChain.isMatched(date, /Date/)
            )
        }
};

export type SetLike<T> = {
    values: () => Iterable<T>;
};

export namespace SetLike {

    export const match = z_.SetLike_match;

}

export type MapLike<T, U> = {
    keys: () => Iterable<T>;
    get(key: T): U | undefined;
};

export namespace MapLike {

    export const match = z_.MapLike_match;

}

export namespace ArrayLike {

    export const match = z_.ArrayLike_match;

}


export type DateLike = {
    getTime: () => number;
}

export namespace DateLike {

    export const match = z_.DateLike_match;

}

