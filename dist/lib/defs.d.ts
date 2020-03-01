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
export declare type HandlerGroup = {
    detach(): Handler<any, any>[];
};
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
export declare type TransformativeMatcher<T, U> = TransformativeMatcher.Stateless<T, U> | TransformativeMatcher.Stateful<T, U>;
export declare namespace TransformativeMatcher {
    /**
     * [U] => pass U to the handler's callback.
     * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
     * null => do not pass the event data to the handler callback.
     * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
     */
    type Returns<U> = readonly [U] | readonly [U, "DETACH" | null] | null | "DETACH";
    type Stateless<T, U> = (data: T) => Returns<U>;
    namespace Stateless {
        function match<T, U>(matcher: TransformativeMatcher<T, U>): matcher is Stateless<T, U>;
    }
    type Stateful<T, U> = [(data: T, prev: U) => Returns<U>, U];
    namespace Stateful {
        function match<T, U>(matcher: TransformativeMatcher<T, U>): matcher is Stateful<T, U>;
    }
}
export declare namespace TransformativeMatcher {
    /**
     * When using a transformative matcher with
     * waitFor, attachOnce or attachOncePrepend
     * the first matched event will cause the handler
     * to be detached so there is no purpose of
     * detaching via the matcher or using a stateful matcher
     */
    type Once<T, U> = (data: T) => (readonly [U] | null | "DETACH");
}
