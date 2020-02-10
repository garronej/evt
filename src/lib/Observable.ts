
import { Evt } from "./Evt";

//NOTE: Pick was only introduced with typescript 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type EvtChange<T> = Evt<{
    newValue: T;
    previousValue: T;
}>;

export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<EvtChange<T>, "post" | "postOnceMatched">;
}

export class ObservableImpl<T> implements Observable<T> {


    private readonly evtChange_post: EvtChange<T>["post"];

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

            const evtChange: EvtChange<T> = new Evt();

            this.evtChange_post = (...args) => evtChange.post(...args);

            this.evtChange = evtChange;

        }

        this.overwriteReadonlyValue(initialValue);

    }

    private readonly overwriteReadonlyValue = (() => {

        const propertyDescriptor: PropertyDescriptor = {
            "configurable": true,
            "enumerable": true,
            "writable": false
        };

        return (newValue: T) => {

            propertyDescriptor.value = newValue;

            Object.defineProperty(this, "value", propertyDescriptor);

        };

    })();

    /** Return true if the value have been changed */
    public onPotentialChange(newValue: T): boolean {

        if (this.areSame(this.value, newValue)) {
            return false;
        }

        const previousValue = this.value;

        this.overwriteReadonlyValue(newValue);

        this.evtChange_post({ previousValue, newValue });

        return true;

    }

}
