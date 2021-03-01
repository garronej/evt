
/** Extract the return type of an async function */
export type AsyncReturnType<T extends ((...args: any) => Promise<any>) | null | undefined | false | ""> = 
    T extends (...args: any) => Promise<infer R> ? R : never;