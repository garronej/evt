
type StatefulNonPostableEvt<T> = import("./StatefulNonPostableEvt").StatefulNonPostableEvt<T>;
type StatefulPostable<T> = import("./StatefulPostable").StatefulPostable<T>;

export interface StatefulEvt<T> extends StatefulNonPostableEvt<T>, StatefulPostable<T> {
    state: T;
};
