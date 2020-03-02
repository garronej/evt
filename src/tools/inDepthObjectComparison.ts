
import { assert } from "./typeSafety/assert";

export class RepresentsSameDataError<T> extends Error {
    constructor(
        message: string,
        public readonly got: T,
        public readonly expected: T
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export function assertRepresentsSameDataFactory(
    { takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean; }
) {

    const { representsSameData } = representsSameDataFactory({ takeIntoAccountArraysOrdering });

    /** Compare if two object represent the same data, [ "ok", "foo" ] <=> [ "foo", "ok" ] */
    function assertRepresentsSameData<T>({ got, expected, errorMessage }: {
        got: T, expected: T, errorMessage?: string
    }) {

        try {

            assert(
                representsSameData(
                    got,
                    expected
                )
            );

        } catch (e) {

            throw new RepresentsSameDataError(
                `${errorMessage ?? "Wrongly assert same"}`,
                got,
                expected
            );

        }

    }

    return { assertRepresentsSameData }

}


/** Return a function that perform a in depth comparison of two things of arbitrary type T. */
export function representsSameDataFactory({ takeIntoAccountArraysOrdering }: { takeIntoAccountArraysOrdering: boolean; }) {
    return { "representsSameData": <T>(o1: T, o2: T) => representsSameData(o1, o2, takeIntoAccountArraysOrdering) }
}

function representsSameData<T>(
    o1: T,
    o2: T,
    takeIntoAccountArraysOrdering: boolean
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

        if (!takeIntoAccountArraysOrdering && o1 instanceof Array) {

            if (!(o2 instanceof Array)) {

                return false;

            }

            if (o1.length !== o2.length) {

                return false;

            }

            const o2Set = new Set(o2);

            for (let val1 of o1) {

                let isFound = false;

                for (const val2 of o2Set) {

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
                    takeIntoAccountArraysOrdering
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