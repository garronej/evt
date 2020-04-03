import { Evt } from "./Evt";
import { NonPostable } from "./types/helper/NonPostable";
import { from, copy } from "./util/observableFrom";
import "../tools/polyfill/Object.is";
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
    readonly same: (val1: T, val2: T) => boolean;
    readonly copy?: ((val: T) => T) | undefined;
    /*** https://docs.evt.land/api/observable#observable-from */
    static readonly from: typeof from;
    private readonly evtChangeDiff_post;
    readonly evtDiff: IObservable<T>["evtDiff"];
    readonly evt: IObservable<T>["evt"];
    readonly val: T;
    private setVal;
    constructor(val: T, same?: (val1: T, val2: T) => boolean, copy?: ((val: T) => T) | undefined);
    /** Return true if the value have been changed */
    update(val: T): boolean;
    forceUpdate(valWrap?: [T]): void;
}
export declare class ObservableCopy<T> extends Observable<T> {
    /*** https://docs.evt.land/api/observable#observable-from */
    static readonly from: typeof copy.from;
    constructor(val: T);
}
