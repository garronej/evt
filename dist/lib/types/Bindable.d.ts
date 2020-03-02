/**
 * A bindable can be anything BUT:
 * -A callable function. ( Constructor are not callable so they are Bindable )
 * -null
 * -undefined
 * -A number
 * -An array with two elements, the first being a callable function
 */
export declare type Bindable = Bindable.Object_ | string;
export declare namespace Bindable {
    /** Way of defining Object so it does not match number and string */
    type Object_ = {
        [k: string]: any;
    };
}
