export * from "./helper";
export * from "./interfaces";
export { EventTargetLike } from "./EventTargetLike";
export { EvtError } from "./EvtError";
declare type CtxLike<Result> = import("../types/interfaces").CtxLike<Result>;
/** https://docs.evt.land/api/handler */
export declare type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = import("./Handler").Handler<T, U, CtxProp>;
export declare namespace Handler {
    /** Handlers params that come from the arguments passed to the method invoked */
    type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = import("./Handler").Handler.PropsFromArgs<T, U, CtxProp>;
    /**
     * Handlers params that are implicitly specified by the method used:
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    type PropsFromMethodName = import("./Handler").Handler.PropsFromMethodName;
    namespace PropsFromMethodName {
        type Sync = import("./Handler").Handler.PropsFromMethodName.Sync;
        type Async = import("./Handler").Handler.PropsFromMethodName.Async;
    }
    type WithEvt<T, CtxResult> = import("./Handler").Handler.WithEvt<T, CtxResult>;
}
import * as dom from "./lib.dom";
export { dom };
export { Operator } from "./Operator";
