
/**
 * Usecase: 
 * declare const pr: Promise<string[]>;
 * const x: Unpack<typeof pr>; <== x is string[]
 */
export type UnpackPromise<T> = T extends Promise<infer U> ? U : never;