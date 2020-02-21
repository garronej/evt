
import { Evt } from "./Evt";
import { overwriteReadonlyProp } from "./EvtBaseProtected";
import { NonPostable } from "./helperTypes/NonPostable";

type ChangeDiff<T> = {
    newValue: T;
    previousValue: T;
};

/** 
 * https://garronej.github.io/ts-evt/#observert-documentation 
 * The interface that should be exposed to users that should 
 * have read only access on the observable */
export interface Observable<T> {
    readonly value: T;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtChangeDiff: NonPostable<Evt<ChangeDiff<T>>>;
    /** when value changed post the new value */
    readonly evtChange: NonPostable<Evt<T>>;
};

/** https://garronej.github.io/ts-evt/#observert-documentation */
export class ObservableImpl<T> implements Observable<T> {

    private readonly evtChangeDiff_post: (data: ChangeDiff<T>) => void;

    public readonly evtChangeDiff: Observable<T>["evtChangeDiff"];
    public readonly evtChange: Observable<T>["evtChange"];

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    public readonly value!: T;

    constructor(
        initialValue: T,
        private readonly areSame: (currentValue: T, newValue: T) => boolean =
            (currentValue, newValue) => currentValue === newValue
    ) {

        {

            const evtChangeDiff: Evt<ChangeDiff<T>> = new Evt();

            this.evtChangeDiff_post = changeDiff => evtChangeDiff.post(changeDiff);

            this.evtChange = evtChangeDiff.createDelegate(
                ({ newValue }) => [newValue]
            );

            this.evtChangeDiff = evtChangeDiff;

        }

        this.overwriteReadonlyValue(initialValue);

    }

    private overwriteReadonlyValue(newValue: T){
        overwriteReadonlyProp(this, "value", newValue);
    }


    /** Return true if the value have been changed */
    public onPotentialChange(newValue: T): boolean {

        if (this.areSame(this.value, newValue)) {
            return false;
        }

        const previousValue = this.value;

        this.overwriteReadonlyValue(newValue);

        this.evtChangeDiff_post({ previousValue, newValue });

        return true;

    }

}
