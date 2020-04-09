declare type Postable<T> = import("./Postable").Postable<T>;
declare type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;
export interface Evt<T> extends Postable<T>, NonPostableEvt<T> {
}
export {};
