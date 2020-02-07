
import { Evt } from "./Evt";

//NOTE: Pick was only introduced with typescript 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export interface Observable<T> {
    readonly value: T;
    readonly evtChange: Omit<Evt<T>, "post">
}

export class ObservableImpl<T> implements Observable<T> {

    public readonly evtChange = new Evt<T>();

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    public readonly value!: T;

    constructor(
        initialValue: T,
        private areSame: (oldValue: T, newValue: T) => boolean = 
            (oldValue, newValue) => oldValue === newValue
    ) {
        this.overwriteReadonlyValue(initialValue);
    }


    private overwriteReadonlyValue = (() => {

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

    public onPotentialChange(newValue: T): void {

        if (this.areSame(this.value, newValue)) {
            return;
        }

        this.overwriteReadonlyValue(newValue);

        this.evtChange.post(this.value);

    }

}
