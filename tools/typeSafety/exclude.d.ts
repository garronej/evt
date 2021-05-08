/** Return a function to use as Array.prototype.filter argument
 * to exclude one or many primitive value element from the array.
 * Ex: ([ "a", "b" ] as const).filter(exclude("a") return "b"[]
 */
export declare function exclude<T extends string | number | null | undefined | boolean>(target: readonly T[] | T): <U>(str: U) => str is Exclude<U, T>;
