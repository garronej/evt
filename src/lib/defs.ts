import { setPrototypeOf } from "../tools/setPrototypeOfPolyfill";

/** Anything but a number, a callable function (constructors are bindable), undefined  or null */
export type Bindable = Bindable.Object_ | string;

export namespace Bindable {
    /** Way of defining Object so it does not match number and string */
    export type Object_ = { [k: string]: any; };
}

/*
export type HandlerGroup = {
    readonly _handlerGroupBrand: true;
    detach(): Handler<any,any>[];
};

export class HandlerGroupImpl implements HandlerGroup{

    public readonly _handlerGroupBrand = true;
    
    private __detach: () => Handler<any, any>[] = () => [];

    public detach(){
        return this.__detach();
    }

    public overwriteDetach(detach: ()=> Handler<any,any>[]): void {
        this.__detach = detach;
    }

}
*/


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

/**
 * [U] => pass U to the handler's callback.
 * [U,"DETACH"] => detach the handler then pass U to the handler's callback.
 * null => do not pass the event data to the handler callback.
 * "DETACH" => detach the handler and do not pass the event data to the handler's callback.
 * 
 * When the returned value is truthy posting has an effect
 */
export type TransformativeMatcher<T, U> = (data: T) => (
    readonly [U] | readonly [U, "DETACH" | null]
    |
    null | "DETACH"
);

export namespace TransformativeMatcher {

    /**
     * When using a transformative matcher with
     * waitFor, attachOnce or attachOncePrepend 
     * the first matched event will cause the handler
     * to be detached so we do not allow to return [ U, "DETACH" ]
     * as it is redundant.
     */
    export type Once<T, U> = (data: T) => (
        readonly [U]
        |
        null | "DETACH"
    );

}

