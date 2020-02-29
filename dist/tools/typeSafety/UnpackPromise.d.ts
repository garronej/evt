/**
 * Usecase:
 * declare const pr: Promise<string[]>;
 * const x: Unpack<typeof pr>; <== x is string[]
 */
export declare type UnpackPromise<T> = T extends Promise<infer U> ? U : never;
