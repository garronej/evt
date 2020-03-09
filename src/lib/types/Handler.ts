import { Bindable } from "./Bindable";
import { Operator } from "./Operator";
type EvtCore<T> = import("../EvtCore").EvtCore<T>;
type Ctx = import("../Ctx").Ctx;


export type Handler<T, U, BoundTo extends Bindable = Bindable> =
    Handler.PropsFromArgs<T, U, BoundTo> &
    Handler.PropsFromMethodName & Readonly<{
        detach(): boolean;
        promise: Promise<U>;
    }>
    ;

export namespace Handler {

    /** Handlers params that come from the arguments passed to the method invoked */
    export type PropsFromArgs<T, U, BoundTo extends Bindable = Bindable> = {
        boundTo: BoundTo;
        timeout: number | undefined;
        op: Operator<T, U>;
        callback: ((transformedData: U) => void) | undefined;
    };

    /** Handlers params that are implicitly specified by the method used: 
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    export type PropsFromMethodName = PropsFromMethodName.Sync | PropsFromMethodName.Async;

    export namespace PropsFromMethodName {

        type Common = Readonly<{
            prepend: true;
            extract: true;
        } | {
            prepend: boolean;
            extract: false;
        }>;

        export type Sync = Common & Readonly<{
            async: false;
            once: boolean;
        }>;

        export type Async = Common & Readonly<{
            async: true;
            once: true;
        }>;

    }

    export type WithEvt<T> = {
        handler: Handler<T, any, Ctx>;
        evt: EvtCore<T>;
    };

}