
type Postable<T> = import("./Postable.ts").Postable<T>;
type NonPostableEvt<T> = import("./NonPostableEvt.ts").NonPostableEvt<T>;

export interface Evt<T> extends Postable<T>, NonPostableEvt<T> { }