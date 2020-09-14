export * from "./helper";
export * from "./interfaces";
export { EventTargetLike } from "./EventTargetLike";
export { EvtError } from "./EvtError";

type CtxLike<Result> = import("../types/interfaces").CtxLike<Result>;

/** https://docs.evt.land/api/handler */
export type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = 
    import("./Handler").Handler<T, U, CtxProp>;

export namespace Handler {

    /** Handlers params that come from the arguments passed to the method invoked */
    export type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = 
        import("./Handler").Handler.PropsFromArgs<T, U, CtxProp>;

    /** 
     * Handlers params that are implicitly specified by the method used: 
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    export type PropsFromMethodName = 
        import("./Handler").Handler.PropsFromMethodName;

    export namespace PropsFromMethodName {

        export type Sync = 
            import("./Handler").Handler.PropsFromMethodName.Sync;

        export type Async = 
            import("./Handler").Handler.PropsFromMethodName.Async;

    }

    export type WithEvt<T, CtxResult> = 
        import("./Handler").Handler.WithEvt<T, CtxResult>;
    

}

import * as dom from "./lib.dom"; export { dom };
export { Operator } from "./Operator";
