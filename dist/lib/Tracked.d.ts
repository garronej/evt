import "../tools/polyfill/Object.is";
import { Evt } from "./Evt";
import { NonPostable } from "./types/helper/NonPostable";
import { from } from "./Tracked.from";
export interface Trackable<T> {
    readonly val: T;
    evt: NonPostable<Evt<T>>;
    evtDiff: NonPostable<Evt<Trackable.Diff<T>>>;
}
export declare namespace Trackable {
    type Diff<T> = {
        prevVal: T;
        newVal: T;
    };
}
/** https://docs.evt.land/api/tracked */
export declare class Tracked<T> implements Trackable<T> {
    /** https://docs.evt.land/api/tracked#tracked-from */
    static from: typeof from;
    private __val;
    val: T;
    private static __1;
    forceUpdate(newVal: T): void;
    private __setValAndPost;
    readonly evtDiff: Trackable<T>["evtDiff"];
    readonly evt: Trackable<T>["evt"];
    private readonly __postEvtChangeDiff;
    constructor(val: T);
}
