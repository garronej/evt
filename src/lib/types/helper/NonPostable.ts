
type EvtLike<T> = import("../../Evt").EvtLike<T>;

//NOTE: Omit only introduced in 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** https://docs.evt.land/api/nonpostable */
export type NonPostable<T extends EvtLike<any>> = Omit<T, "post" | "postAsyncOnceHandled">;
