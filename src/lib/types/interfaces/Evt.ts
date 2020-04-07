
type Postable<T> = import("./Postable").Postable<T>;
type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;

export type Evt<T> = Postable<T> & NonPostableEvt<T>;