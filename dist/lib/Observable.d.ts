import { Evt } from "./Evt";
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
declare type EvtChange<T> = Evt<{
    newValue: T;
    previousValue: T;
}>;
export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<EvtChange<T>, "post" | "postOnceMatched">;
}
export declare class ObservableImpl<T> implements Observable<T> {
    private readonly areSame;
    private readonly evtChange_post;
    readonly evtChange: Observable<T>["evtChange"];
    readonly value: T;
    constructor(initialValue: T, areSame?: (currentValue: T, newValue: T) => boolean);
    private readonly overwriteReadonlyValue;
    /** Return true if the value have been changed */
    onPotentialChange(newValue: T): boolean;
}
export {};
