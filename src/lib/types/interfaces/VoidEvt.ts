
type Evt<T> = import("./Evt").Evt<T>;

/** 
 * Think of it as void.
 * void itself is indistinguishable from undefined or null
 * which cause inference problem using ToPostable<E>
 * */
export interface Void { __voidBrand: any; }

export interface VoidEvt extends Evt<Void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
};