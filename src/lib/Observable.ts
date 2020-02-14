
import { Evt } from "./Evt";
import { overwriteReadonlyProp } from "./EvtBaseProtected";

type ChangeDiff<T> = {
    newValue: T;
    previousValue: T;
};

//NOTE: Exclude only introduced in typescript 2.8
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

//NOTE: Pick was only introduced with typescript 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type NonPostable<T> = Omit<Evt<T>, "post" | "postOnceMatched">

/** 
 * https://garronej.github.io/ts-evt/#observert-documentation 
 * The interface that should be exposed to users that should 
 * have read only access on the observable */
export interface Observable<T> {
    readonly value: T;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtChangeDiff: NonPostable<ChangeDiff<T>>;
    /** when value changed post the new value */
    readonly evtChange: NonPostable<T>;
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
