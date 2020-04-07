declare type StatefulNonPostableEvt<T> = import("./StatefulNonPostableEvt").StatefulNonPostableEvt<T>;
declare type Postable<T> = import("./Postable").Postable<T>;
export interface StatefulEvt<T> extends StatefulNonPostableEvt<T>, Postable<T> {
    state: T;
}
export {};
