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
        matcher: TransformativeMatcher<T, U>;
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
    class RacePromiseRejection extends Error {
        readonly onRejectedArgument: any;
        readonly i: number;
        readonly racer: PromiseLike<any>;
        constructor(onRejectedArgument: any, i: number, racer: PromiseLike<any>);
    }
}
/**
 * [U] => pass U to the handler's callback.
 * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
 * null => do not pass the event data to the handler callback.
 * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
 *
 * When the returned value is truthy posting has an effect
 */
export declare type TransformativeMatcher<T, U> = (data: T) => (readonly [U] | readonly [U, "DETACH" | null] | null | "DETACH");
export declare namespace TransformativeMatcher {
    /**
     * When using a transformative matcher with
     * waitFor, attachOnce or attachOncePrepend
     * the first matched event will cause the handler
     * to be detached so we do not allow to return [ U, "DETACH" ]
     * as it is redundant.
     */
    type Once<T, U> = (data: T) => (readonly [U] | null | "DETACH");
}
