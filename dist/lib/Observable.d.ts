import { SyncEvent } from "./SyncEvent";
export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<SyncEvent<T>, "post">;
}
export declare class ObservableImpl<T> implements Observable<T> {
    value: T;
    private areSame;
    readonly evtChange: SyncEvent<T>;
    constructor(value: T, areSame?: (oldValue: T, newValue: T) => boolean);
    onPotentialChange(newValue: T): void;
}
