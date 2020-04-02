import { typeGuard } from "../typeSafety/typeGuard";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";

type SetLike<T> = {
    values: () => Iterable<T>;
};

namespace SetLike {

    export function match<T>(set: Object): set is SetLike<T> {
        return (
            typeGuard<SetLike<T>>(set) &&
            typeof set.values === "function" &&
            /Set/.test(Object.getPrototypeOf(set).constructor.name)
        );
    }

}

type MapLike<T, U> = {
    keys: () => Iterable<T>;
    get(key: T): U | undefined;
};

namespace MapLike {

    export function match<T, U>(map: Object): map is MapLike<T, U> {
        return (
            typeGuard<MapLike<T, U>>(map) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            /Map/.test(Object.getPrototypeOf(map).constructor.name)
        );
    }

}

/** 
 * Return a function that perform a in depth comparison of two things of arbitrary type T. 
 * 
 * Think of it as JSON.stringify(o1) === JSON.stringify(o2)
 * but unlike a test performed with JSON.stringify the order in the property
 * have been assigned to an object does not matter.
 *
 * If takeIntoAccountArraysOrdering === false then
 * representsSameData(["a", "b"], ["b", "a"]) will return true.
 * 
 * If Date are compared via .getTime()
 * 
 * The objects can includes Map and Set.
 * */
export function representsSameDataFactory({ takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean; }) {
    return { "representsSameData": <T>(o1: T, o2: T) => representsSameData(o1, o2, takeIntoAccountArraysOrdering) }
}

export function representsSameData<T>(
    o1: T,
    o2: T,
    takeIntoAccountArraysOrdering: boolean = true
): boolean {

    if (o1 === o2) {
        return true;
    }

    if (o1 instanceof Date) {

        if (!(o2 instanceof Date)) {

            return false;

        }

        return o1.getTime() === o2!.getTime();

    }

    if (o1 instanceof Object) {

        if (!(o2 instanceof Object)) {
            return false;
        }

        if (MapLike.match<any, any>(o1)) {

            if (!MapLike.match(o2)) {
                return false;
            }

            type Entry = { key: any, value: any };

            const newO1 = new Set<Entry>();
            const newO2 = new Set<Entry>();

            for (const o of [o1, o2]) {

                const newO = o === o1 ? newO1 : newO2;

                const arr = Array.from(o.keys());

                for (let i = 0; i < arr.length; i++) {

                    const key = arr[i];
                    const value = o.get(key)!;

                    newO.add({ key, value });

                }

            }

            return representsSameData(
                newO1,
                newO2,
                takeIntoAccountArraysOrdering
            );

        }


        let takeIntoAccountArraysOrderingOv: false | undefined = undefined;

        if (SetLike.match(o1)) {

            if (!SetLike.match(o2)) {
                return false;
            }

            o1 = Array.from(o1.values()) as any;
            o2 = Array.from(o2.values()) as any;

            takeIntoAccountArraysOrderingOv = false

        }

        if (
            !(takeIntoAccountArraysOrderingOv ?? takeIntoAccountArraysOrdering) &&
            o1 instanceof Array
        ) {

            if (!(o2 instanceof Array)) {

                return false;

            }

            if (o1.length !== o2.length) {

                return false;

            }

            const o2Set = new Set(o2);

            for (let val1 of o1) {

                let isFound = false;

                for (const val2 of o2Set.values()) {

                    const result = representsSameData(
                        val1,
                        val2,
                        takeIntoAccountArraysOrdering
                    );

                    if (!result) {
                        continue;
                    }

                    isFound = true;
                    o2Set.delete(val2);
                    break;

                }

                if (!isFound) {
                    return false;
                }

            }

        } else {

            if (o1 instanceof Array) {

                if (!(o2 instanceof Array)) {
                    return false;
                }

                if (o1.length !== o2.length) {
                    return false;
                }

            } else {

                const result = representsSameData(
                    Object.keys(o1).filter(key => (o1 as any)[key] !== undefined),
                    Object.keys(o2).filter(key => (o2 as any)[key] !== undefined),
                    false
                );

                if (!result) {
                    return false;
                }

            }


            for (const key in o1) {

                const result = representsSameData(
                    o1[key],
                    o2[key],
                    takeIntoAccountArraysOrdering
                );
                if (!result) {
                    return false;
                }
            }

        }

        return true;

    }

    return false;

}

