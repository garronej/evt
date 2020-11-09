export { assert } from "./assert";
/** Extract the return type of an async function */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = import("./AsyncReturnType").AsyncReturnType<T>;
export { exclude } from "./exclude";
export { id } from "./id";
export { matchVoid } from "./matchVoid";
export type MethodNames<Api extends {}> = import("./MethodNames").MethodNames<Api>;
export { objectKeys } from "./objectKeys";
export { typeGuard } from "./typeGuard";
/**
 * Usecase: 
 * declare const pr: Promise<string[]>;
 * const x: Unpack<typeof pr>; <== x is string[]
 */
export type UnpackPromise<T> = import("./UnpackPromise").UnpackPromise<T>;
export type UnpackTypeGuard<T> = import("./UnpackTypeGuard").UnpackTypeGuard<T>;
