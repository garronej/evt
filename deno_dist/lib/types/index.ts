export * from "./helper/index.ts";
export * from "./interfaces/index.ts";
export { EventTargetLike } from "./EventTargetLike.ts";
export { EvtError } from "./EvtError.ts";

type CtxLike<Result> = import("../types/interfaces/index.ts").CtxLike<Result>;

/** https://docs.evt.land/api/handler */
export type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = 
    import("./Handler.ts").Handler<T, U, CtxProp>;

export namespace Handler {

    /** Handlers params that come from the arguments passed to the method invoked */
    export type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> = 
        import("./Handler.ts").Handler.PropsFromArgs<T, U, CtxProp>;

    /** 
     * Handlers params that are implicitly specified by the method used: 
     * attachOnce => once
     * attachOncePrepend => once + prepend
     * waitFor => once + async
     * ...
     */
    export type PropsFromMethodName = 
        import("./Handler.ts").Handler.PropsFromMethodName;

    export namespace PropsFromMethodName {

        export type Sync = 
            import("./Handler.ts").Handler.PropsFromMethodName.Sync;

        export type Async = 
            import("./Handler.ts").Handler.PropsFromMethodName.Async;

    }

    export type WithEvt<T, CtxResult> = 
        import("./Handler.ts").Handler.WithEvt<T, CtxResult>;
    

}

import * as dom from "./lib.dom.ts"; export { dom };
export { Operator } from "./Operator.ts";
