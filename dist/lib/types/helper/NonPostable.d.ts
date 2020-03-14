declare type EvtCore<T> = import("../../EvtCore").EvtCore<T>;
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/** https://garronej.github.io/ts-evt/#nonpostableevtt */
export declare type NonPostable<T extends EvtCore<any>> = Omit<T, "post" | "postAsyncOnceHandled">;
export {};
