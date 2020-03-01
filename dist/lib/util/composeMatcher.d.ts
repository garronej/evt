import { TransformativeMatcher } from "../defs";
export declare function compose<A, B, C>(tm1: TransformativeMatcher<A, B>, tm2: TransformativeMatcher<B, C>): TransformativeMatcher<A, C>;
/** assert args length !== 0 */
export declare function composeMany<T>(args: [TransformativeMatcher<T, any>, ...TransformativeMatcher<any, any>[]]): TransformativeMatcher<T, any>;
export declare function scan<T, U>(accumulator: (acc: U, value: T, index: number) => U, seed: U): TransformativeMatcher.Stateful<T, [T, U, number]>;
export declare function throttleTime<T>(duration: number): TransformativeMatcher<T, T>;
