
import { assert } from "../typeSafety/assert";
import { representsSameDataFactory } from "./representsSameData";

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