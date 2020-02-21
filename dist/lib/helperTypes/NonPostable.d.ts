declare type EvtBaseProtected<T> = import("../EvtBaseProtected").EvtBaseProtected<T>;
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/** https://garronej.github.io/ts-evt/#nonpostableevtt */
export declare type NonPostable<T extends EvtBaseProtected<any>> = Omit<T, "post" | "postOnceMatched">;
export {};
