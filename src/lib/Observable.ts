

import { SyncEvent } from "./SyncEvent";

export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<SyncEvent<T>, "post">
}

export class ObservableImpl<T> implements Observable<T> {

    public readonly evtChange = new SyncEvent<T>();

    constructor(
        public value: T,
        private areSame: (oldValue: T, newValue: T) => boolean = (oldValue, newValue) => oldValue === newValue
    ) {
    }

    public onPotentialChange(newValue: T): void {

        if (this.areSame(this.value, newValue)) {
            return;
        }

        this.value = newValue;

        this.evtChange.post(this.value);

    }

}
