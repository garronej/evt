
import { Evt } from "./Evt";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import /*type*/ { NonPostable } from "./types/helper/NonPostable";
import { importProxy } from "./importProxy";
import { from } from "./util/observableFrom";


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
};

export namespace IObservable {
    export type ChangeDiff<T> = {
        newValue: T;
        previousValue: T;
    }
}

/** https://docs.evt.land/api/observable */
export class Observable<T> implements IObservable<T> {

    /*** https://docs.evt.land/api/observable#observable-from */
    public static readonly from = from;

    private readonly evtChangeDiff_post: (data: IObservable.ChangeDiff<T>) => void;

    public readonly evtChangeDiff: IObservable<T>["evtChangeDiff"];
    public readonly evtChange: IObservable<T>["evtChange"];

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    public readonly value!: T;

    constructor(
        initialValue: T,
        private readonly areSame: (currentValue: T, newValue: T) => boolean =
            (currentValue, newValue) => currentValue === newValue
    ) {

        {

            const evtChangeDiff: Evt<IObservable.ChangeDiff<T>> = new Evt();

            this.evtChangeDiff_post = changeDiff => evtChangeDiff.post(changeDiff);

            this.evtChange = evtChangeDiff.pipe(({ newValue }) => [newValue]);

            this.evtChangeDiff = evtChangeDiff;

        }

        overwriteReadonlyProp(this, "value", initialValue);

    }

    /** Return true if the value have been changed */
    public onPotentialChange(newValue: T): boolean {

        if (this.areSame(this.value, newValue)) {
            return false;
        }

        const previousValue = this.value;

        overwriteReadonlyProp(this, "value", newValue);

        this.evtChangeDiff_post({ previousValue, newValue });

        return true;

    }

}

importProxy.Observable = Observable;
