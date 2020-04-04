import "../tools/polyfill/Object.is";
import { Evt } from "./Evt";
import { NonPostable } from "./types/helper/NonPostable";
import { from } from "./util/Tracked.from";
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
export declare class Tracked<T> implements Trackable<T> {
    static from: typeof from;
    private _val;
    get val(): T;
    set val(newVal: T);
    forceUpdate(newVal: T): void;
    private _setValAndPost;
    readonly evtDiff: Trackable<T>["evtDiff"];
    readonly evt: Trackable<T>["evt"];
    private readonly _postEvtChangeDiff;
    constructor(val: T);
}
