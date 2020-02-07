export interface Postable<T> {
    post(data: T): void;
}
/** Way of defining Object so it does not match number and string */
export declare type Object_ = {
    [k: string]: any;
};
/** Anything but a number, a callable function (i.e. not a constructor), undefined  or null */
export declare type Bindable = Object_ | string;
export interface UserProvidedParams<T> {
    matcher: (data: T) => boolean;
    boundTo: Bindable;
    timeout: number | undefined;
    callback: ((data: T) => any) | undefined;
}
export declare type ImplicitParams = ImplicitParams.Sync | ImplicitParams.Async;
export declare namespace ImplicitParams {
    type _Base = {
        once: boolean;
        prepend: boolean;
        extract: boolean;
    };
    type Sync = _Base & {
        async: false;
    };
    type Async = _Base & {
        async: true;
    };
}
export declare type Handler<T> = UserProvidedParams<T> & ImplicitParams & {
    detach(): boolean;
    promise: Promise<T>;
};
export declare namespace EvtError {
    class Timeout extends Error {
        readonly timeout: number;
        constructor(timeout: number);
    }
    class Detached extends Error {
        constructor();
    }
}
