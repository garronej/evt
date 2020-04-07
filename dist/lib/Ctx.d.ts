import { Handler } from "./types/Handler";
declare type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
declare type Evt<T> = import("./types/interfaces").Evt<T>;
declare type CtxLike<T> = import("./types/interfaces").CtxLike<T>;
export declare namespace Ctx {
    type DoneOrAborted<Result> = DoneOrAborted.Done<Result> | DoneOrAborted.Aborted<Result>;
    namespace DoneOrAborted {
        type Common<Result> = {
            handlers: Handler.WithEvt<any, Result>[];
        };
        export type Done<Result> = Common<Result> & {
            type: "DONE";
            result: Result;
            error?: undefined;
        };
        export type Aborted<Result> = Common<Result> & {
            type: "ABORTED";
            error: Error;
            result?: undefined;
        };
        export {};
    }
}
/** https://docs.evt.land/api/ctx */
export declare class Ctx<Result> {
    /** https://docs.evt.land/api/ctx#ctx-evtdoneoraborted */
    readonly evtDoneOrAborted: Evt<Ctx.DoneOrAborted<Result>>;
    /**
     * https://docs.evt.land/api/ctx#ctx-evtattach
     *
     * Posted every time a handler is bound to this context
     * */
    readonly evtAttach: Evt<Handler.WithEvt<any, Result>>;
    /**
     * https://docs.evt.land/api/ctx#ctx-evtdetach
     *
     * Posted every time a handler bound to this context is detached from it's Evt
     * */
    readonly evtDetach: Evt<Handler.WithEvt<any, Result>>;
    private lazyEvtAttach;
    private lazyEvtDetach;
    private lazyEvtDoneOrAborted;
    private onDoneOrAborted;
    private static __1;
    /**
     * https://docs.evt.land/api/ctx#ctx-waitfor-timeout
     *
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject
     * with EvtError.Timeout if done(result) is not called within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    waitFor(timeout?: number): Promise<Result>;
    /**
     * https://docs.evt.land/api/ctx#ctx-abort-error
     *
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    abort(error: Error): Handler.WithEvt<any, Result>[];
    /**
     * https://docs.evt.land/api/ctx#ctx-done-result
     *
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    done(result: Result): Handler.WithEvt<any, Result>[];
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    private __done;
    private handlers;
    private evtByHandler;
    /** https://docs.evt.land/api/ctx#ctx-gethandlers */
    getHandlers(): Handler.WithEvt<any, Result>[];
    /**
     * Exposed to enable safe interoperability between mismatching EVT versions.
     * Should be considered private
     * */
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    /**
     * Exposed to enable safe interoperability between EVT versions.
     * Should be considered private
     * */
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}
/** https://docs.evt.land/api/ctx */
export declare class VoidCtx extends Ctx<void> {
    done(): Handler.WithEvt<any, void>[];
}
export {};
