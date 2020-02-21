
type EvtBaseProtected<T> = import("../EvtBaseProtected").EvtBaseProtected<T>;

//NOTE: Omit only introduced in 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** https://garronej.github.io/ts-evt/#nonpostableevtt */
export type NonPostable<T extends EvtBaseProtected<any>>= 
    Omit<T, "post" | "postOnceMatched">;
