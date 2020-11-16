export { assert } from "./assert.ts";
/** Extract the return type of an async function */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = import("./AsyncReturnType.ts").AsyncReturnType<T>;
export { exclude } from "./exclude.ts";
export { id } from "./id.ts";
export type Id<Generic, Specific extends Generic> = import("./id.ts").Id<Generic, Specific>;
export { matchVoid } from "./matchVoid.ts";
export type MethodNames<Api extends {}> = import("./MethodNames.ts").MethodNames<Api>;
export { objectKeys } from "./objectKeys.ts";
export type PromiseOrNot<T> = import("./PromiseOrNot.ts").PromiseOrNot<T>;
export { typeGuard } from "./typeGuard.ts";
/**
 * Usecase: 
 * declare const pr: Promise<string[]>;
 * const x: Unpack<typeof pr>; <== x is string[]
 */
export type UnpackPromise<T> = import("./UnpackPromise.ts").UnpackPromise<T>;
export type UnpackTypeGuard<T> = import("./UnpackTypeGuard.ts").UnpackTypeGuard<T>;
