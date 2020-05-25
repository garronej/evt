
type StatefulReadonlyEvt<T> = import("./StatefulReadonlyEvt.ts").StatefulReadonlyEvt<T>;
type StatefulPostable<T> = import("./StatefulPostable.ts").StatefulPostable<T>;

export interface StatefulEvt<T> extends StatefulReadonlyEvt<T>, StatefulPostable<T> {

     /** https://docs.evt.land/api/statefulevt#state */
    state: T;

};
