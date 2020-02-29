export declare class RepresentsSameDataError<T> extends Error {
    readonly got: T;
    readonly expected: T;
    constructor(message: string, got: T, expected: T);
}
export declare function assertRepresentsSameDataFactory({ takeIntoAccountArraysOrdering }: {
    takeIntoAccountArraysOrdering: boolean;
}): {
    assertRepresentsSameData: <T>({ got, expected, errorMessage }: {
        got: T;
        expected: T;
        errorMessage?: string | undefined;
    }) => void;
};
/** Return a function that perform a in depth comparison of two things of arbitrary type T. */
export declare function representsSameDataFactory({ takeIntoAccountArraysOrdering }: {
    takeIntoAccountArraysOrdering: boolean;
}): {
    representsSameData: <T>(o1: T, o2: T) => boolean;
};
