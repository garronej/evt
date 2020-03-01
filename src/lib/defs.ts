import { setPrototypeOf } from "../tools/setPrototypeOfPolyfill";

/**
 * A bindable can be anything BUT:
 * -A callable function. ( Constructor are not callable so they are Bindable )
 * -null
 * -undefined
 * -A number
 * -An array with two elements, the first being a callable function
 */
export type Bindable = Bindable.Object_ | string;

export namespace Bindable {
    /** Way of defining Object so it does not match number and string */
    export type Object_ = { [k: string]: any; };
}

export type HandlerGroup = {
    detach(): Handler<any,any>[];
};



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
        matcher: TransformativeMatcher<T,U>;
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

    export class RacePromiseRejection extends Error {
        constructor(
            public readonly onRejectedArgument: any,
            public readonly i: number,
            public readonly racer: PromiseLike<any>
        ) {
            super(`Evt race error: Promise at index ${i} rejected`);
            setPrototypeOf(this, new.target.prototype);
        }
    }

}

export type TransformativeMatcher<T, U> =
    TransformativeMatcher.Stateless<T, U> |
    TransformativeMatcher.Stateful<T, U>
    ;

export namespace TransformativeMatcher {

    /**
     * [U] => pass U to the handler's callback.
     * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
     * null => do not pass the event data to the handler callback.
     * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
     */
    export type Returns<U> =
        readonly [U] | readonly [U, "DETACH" | null]
        |
        null | "DETACH"
        ;

    export type Stateless<T, U> = (data: T) => Returns<U>;

    export namespace Stateless{

        export function match<T,U>(matcher: TransformativeMatcher<T,U>): matcher is Stateless<T,U> {
            return typeof matcher === "function"
        }

    }

    export type Stateful<T, U> = [(data: T, prev: U) => Returns<U>, U];

    export namespace Stateful {

        export function match<T,U>(matcher: TransformativeMatcher<T,U>): matcher is Stateful<T,U> {
            return !Stateless.match(matcher);
        }


    }

}


export namespace TransformativeMatcher {

    /**
     * When using a transformative matcher with
     * waitFor, attachOnce or attachOncePrepend 
     * the first matched event will cause the handler
     * to be detached so there is no purpose of 
     * detaching via the matcher or using a stateful matcher
     */
    export type Once<T, U> = (data: T) => (
        readonly [U]
        |
        null | "DETACH"
    );

}

