/**
 * A bindable can be anything BUT:
 * -A callable function. ( Constructor are not callable so they are Bindable )
 * -null
 * -undefined
 * -A number
 * -An array with two elements, the first being a callable function
 */
export declare type Bindable = {
    [k: string]: any;
} | string;
