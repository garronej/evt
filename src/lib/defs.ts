import setPrototypeOf = require("setprototypeof");

//NOTE: Pick was only introduced with typescript 3.5
/**
 * Construct a type with the properties of T except for those in type K.
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;


/** Anything but a number, a callable function (constructors are bindable), undefined  or null */
export type Bindable = Bindable.Object_ | string;

export namespace Bindable {

    /** Way of defining Object so it does not match number and string */
    export type Object_ = { [k: string]: any; };

}

export type UserProvidedParams<T, U> =
    UserProvidedParams.WithNonTransformativeMatcher<T> |
    UserProvidedParams.WithTransformativeMatcher<T, U>
    ;

export namespace UserProvidedParams {

    type Common = Readonly<{
        boundTo: Bindable;
        timeout: number | undefined;
    }>;

    export type WithTransformativeMatcher<T, U> = Common & Readonly<{
        matcher: (data: T) => [U] | null;
        callback: ((transformedData: U) => void) | undefined;
    }>;

    export type WithNonTransformativeMatcher<T> = Common & Readonly<{
        matcher: (data: T) => boolean;
        callback: ((data: T) => void) | undefined;
    }>;

}




export type ImplicitParams = ImplicitParams.Sync | ImplicitParams.Async;

export namespace ImplicitParams {

    type Common = Readonly<{
        once: boolean;
        prepend: boolean;
        extract: boolean;
    }>;

    export type Sync = Common & Readonly<{
        async: false;
    }>;

    export type Async = Common & Readonly<{
        async: true;
    }>;


}

export type Handler<T, U> = UserProvidedParams<T, U> & ImplicitParams & Readonly<{
    detach(): boolean;
    promise: Promise<U>;
}>;

export namespace EvtError {

    export class Timeout extends Error {
        constructor(public readonly timeout: number) {
            super(`Evt timeout after ${timeout}ms`);
            setPrototypeOf(this, new.target.prototype);
        }
    }

    export class Detached extends Error {
        constructor() {
            super(`Evt handler detached`);
            setPrototypeOf(this, new.target.prototype);
        }
    }

}

