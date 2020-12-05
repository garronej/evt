export { assert } from "./assert";
/** Extract the return type of an async function */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = import("./AsyncReturnType").AsyncReturnType<T>;
export { exclude } from "./exclude";
export { id } from "./id";
export type Id<Generic, Specific extends Generic> = import("./id").Id<Generic, Specific>;
export { matchVoid } from "./matchVoid";
export type MethodNames<Api extends {}> = import("./MethodNames").MethodNames<Api>;
export { objectKeys } from "./objectKeys";
/** 
 * Like the 'Required' builtin type alias helper 
 * but it only keeps properties that are marked optional.
 * 
 * Example: 
 * 
 * Optional<{ p1: string; p2?: string; p3?: number; }> 
 * is the type
 * { p2: string; p3: number }
 */
export type Optional<T extends object> = import("./Optional").Optional<T>;
/**
 * Example: 
 * OptionalPropertiesOf<{ foo: string; bar?: string; baz?: number }> 
 * is the type:  "bar" | "baz"
 */
export type OptionalPropertiesOf<T extends object> = import("./Optional").Optional<T>;
export type PromiseOrNot<T> = import("./PromiseOrNot").PromiseOrNot<T>;
export { typeGuard } from "./typeGuard";
/**
 * Usecase: 
 * declare const pr: Promise<string[]>;
 * const x: Unpack<typeof pr>; <== x is string[]
 */
export type UnpackPromise<T> = import("./UnpackPromise").UnpackPromise<T>;
export type UnpackTypeGuard<T> = import("./UnpackTypeGuard").UnpackTypeGuard<T>;
