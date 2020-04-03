import { Evt } from "./Evt";
import { NonPostable } from "./types/helper/NonPostable";
import { from } from "./util/observableFrom";
/**
 * https://docs.evt.land/api/observable
 *
 * Interface to be exposed to users that should
 * have read only access on the observable
 * */
export interface IObservable<T> {
    readonly val: T;
    /** when value changed post the new value */
    readonly evt: NonPostable<Evt<T>>;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtDiff: NonPostable<Evt<IObservable.Diff<T>>>;
}
export declare namespace IObservable {
    type Diff<T> = {
        currVal: T;
        prevVal: T;
    };
}
/** https://docs.evt.land/api/observable */
export declare class Observable<T> implements IObservable<T> {
    private readonly same;
    /*** https://docs.evt.land/api/observable#observable-from */
    static readonly from: typeof from;
    private readonly evtChangeDiff_post;
    readonly evtDiff: IObservable<T>["evtDiff"];
    readonly evt: IObservable<T>["evt"];
    readonly val: T;
    private setVal;
    constructor(initialValue: T, same?: (currentValue: T, newValue: T) => boolean);
    /** Return true if the value have been changed */
    update(val: T): boolean;
}
