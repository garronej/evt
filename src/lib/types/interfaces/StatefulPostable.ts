
type Postable<T>= import("./Postable").Postable<T>;

export interface StatefulPostable<T> extends Postable<T>  {

    /** Last event data posted*/
    state: T;

    /** 
     * Post and enforce that .evtChange and .evtChangeDiff 
     * be posted even if the state has not changed.
     * 
     * If no argument is passed the post is performed with the current state.
     * 
     * Returns post count 
     * */
    postForceChange(wData?: readonly [T]): number;

}
