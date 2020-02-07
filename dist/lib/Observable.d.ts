import { Evt } from "./Evt";
/**
 * Construct a type with the properties of T except for those in type K.
 */
declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<Evt<T>, "post">;
}
export declare class ObservableImpl<T> implements Observable<T> {
    private areSame;
    readonly evtChange: Evt<T>;
    readonly value: T;
    constructor(initialValue: T, areSame?: (oldValue: T, newValue: T) => boolean);
    private overwriteReadonlyValue;
    onPotentialChange(newValue: T): void;
}
export {};
