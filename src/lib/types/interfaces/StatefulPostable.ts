
type Postable<T>= import("./Postable").Postable<T>;

export interface StatefulPostable<T> extends Postable<T>  {

    state: T;

    /** https://docs.evt.land/api/statefulevt#postfocechange */
    postForceChange(wData?: readonly [T]): number;

}
