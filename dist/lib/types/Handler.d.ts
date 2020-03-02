import { Bindable } from "./Bindable";
import { $Matcher } from "./$Matcher";
export declare type Handler<T, U> = Handler.PropsFromArgs<T, U> & Handler.PropsFromMethodName & Readonly<{
    detach(): boolean;
    promise: Promise<U>;
}>;
export declare namespace Handler {
    /** Handlers params that come from the arguments passed to the method invoked */
    type PropsFromArgs<T, U> = PropsFromArgs.WithNonTransformativeMatcher<T> | PropsFromArgs.WithTransformativeMatcher<T, U>;
    namespace PropsFromArgs {
        type Common = Readonly<{
            boundTo: Bindable;
            timeout: number | undefined;
        }>;
        export type WithTransformativeMatcher<T, U> = Common & Readonly<{
            matcher: $Matcher<T, U>;
            callback: ((transformedData: U) => void) | undefined;
        }>;
        export type WithNonTransformativeMatcher<T> = Common & Readonly<{
            matcher: (data: T) => boolean;
            callback: ((data: T) => void) | undefined;
        }>;
        export {};
    }
    /** Handlers params that are implicitly specified by the method used:
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    type PropsFromMethodName = PropsFromMethodName.Sync | PropsFromMethodName.Async;
    namespace PropsFromMethodName {
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
}
