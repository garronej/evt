/** Anything but a number, a callable function (constructors are bindable), undefined  or null */
export declare type Bindable = Bindable.Object_ | string;
export declare namespace Bindable {
    /** Way of defining Object so it does not match number and string */
    type Object_ = {
        [k: string]: any;
    };
}
export declare type UserProvidedParams<T, U> = UserProvidedParams.WithNonTransformativeMatcher<T> | UserProvidedParams.WithTransformativeMatcher<T, U>;
export declare namespace UserProvidedParams {
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
    export {};
}
export declare type ImplicitParams = ImplicitParams.Sync | ImplicitParams.Async;
export declare namespace ImplicitParams {
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
    export {};
}
export declare type Handler<T, U> = UserProvidedParams<T, U> & ImplicitParams & Readonly<{
    detach(): boolean;
    promise: Promise<U>;
}>;
export declare namespace EvtError {
    class Timeout extends Error {
        readonly timeout: number;
        constructor(timeout: number);
    }
    class Detached extends Error {
        constructor();
    }
}
