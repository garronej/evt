import { Evt } from "./Evt";
import { NonPostable } from "./types/helper/NonPostable";
/**
 * https://docs.evt.land/api/observable
 *
 * Interface to be exposed to users that should
 * have read only access on the observable
 * */
export interface IObservable<T> {
    readonly value: T;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtChangeDiff: NonPostable<Evt<IObservable.ChangeDiff<T>>>;
    /** when value changed post the new value */
    readonly evtChange: NonPostable<Evt<T>>;
}
export declare namespace IObservable {
    type ChangeDiff<T> = {
        newValue: T;
        previousValue: T;
    };
}
/** https://docs.evt.land/api/observable */
export declare class Observable<T> implements IObservable<T> {
    private readonly areSame;
    private readonly evtChangeDiff_post;
    readonly evtChangeDiff: IObservable<T>["evtChangeDiff"];
    readonly evtChange: IObservable<T>["evtChange"];
    readonly value: T;
    constructor(initialValue: T, areSame?: (currentValue: T, newValue: T) => boolean);
    /** Return true if the value have been changed */
    onPotentialChange(newValue: T): boolean;
}
