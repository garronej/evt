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
export declare function representsSameDataFactory({ takeIntoAccountArraysOrdering }: {
    takeIntoAccountArraysOrdering: boolean;
}): {
    representsSameData: <T>(o1: T, o2: T) => boolean;
};
