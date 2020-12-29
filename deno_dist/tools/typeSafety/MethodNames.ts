/**  
 * Takes as type argument an Api interface and return 
 * an union type constituted of all the properties names
 * whose values are functions.
 * 
 * Example:
 * 
 * interface Api {
 *     getFoo(): number;
 *     getBar(): string;
 *     p: object;
 * }
 * 
 * MethodNames<Api> is "getFoo" | "getBar"
 * 
 */ 
export type MethodNames<Api extends {}> = keyof {
    [K in
    Exclude<
        keyof Api,
        ({
            [P in keyof Api]: Api[P] extends Function ? never : P
        })[keyof Api]>
    ]: Api[K]
};
