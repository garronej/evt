declare type Postable<T> = import("./Postable").Postable<T>;
declare type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;
export declare type Evt<T> = Postable<T> & NonPostableEvt<T>;
export {};
