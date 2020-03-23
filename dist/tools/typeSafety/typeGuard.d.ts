/** Invoke a test function as if it was a typeGuard for a given type */
export declare function typeGuard<T>(o: any, matcher: (o: any) => boolean): o is T;
export declare namespace typeGuard {
    /**
     * type guard that always returns true for a given type.
     *
     * Use case:
     * declare const x: "FOO" | "BAR";
     * assert(typeGuard.dry<"BAR">(x));
     * x; <== x is of type "BAR"
     *
     * OR
     *
     * assert(!typeGuard.dry<"BAR">(x,false));
     * x; <== x is of type "FOO"
     */
    function dry<T>(o: any, isMatched?: boolean): o is T;
}
