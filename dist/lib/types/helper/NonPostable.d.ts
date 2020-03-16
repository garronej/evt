import { EvtLike } from "./EvtLike";
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/** https://docs.evt.land/api/nonpostable */
export declare type NonPostable<T extends EvtLike<any>> = Omit<T, "post" | "postAsyncOnceHandled">;
export {};
