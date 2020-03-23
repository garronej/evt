import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
declare type EvtLike<T> = import("./Evt").EvtLike<T>;
export declare type CtxEvtDoneData<Result> = [Error | null, Result, Handler.WithEvt<any, Result>[]];
export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}
/** https://docs.evt.land/api/ctx */
export declare class Ctx<Result> implements CtxLike<Result> {
    /**
     * https://docs.evt.land/api/ctx#ctx-getevtdone
     *
     * Posted every time ctx.done() is invoked, post the detached handler ( return value of evt.done())
     */
    readonly getEvtDone: () => Evt<CtxEvtDoneData<Result>>;
    /**
     *
     * https://docs.evt.land/api/ctx#ctx-getprdone-timeout
     *
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject
     * with EvtError.Timeout if done(result) is not called * within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    getPrDone(timeout?: number): Promise<Result>;
    /**
     * https://docs.evt.land/api/ctx#ctx-getevtattach
     *
     * Posted every time a handler is bound to this context
     * */
    readonly getEvtAttach: () => Evt<Handler.WithEvt<any, Result>>;
    /**
     * https://docs.evt.land/api/ctx#ctx-getevtdetach
     *
     * Posted every time a handler bound to this context is detached from it's Evt
     * */
    readonly getEvtDetach: () => Evt<Handler.WithEvt<any, Result>>;
    private readonly onDone;
    private readonly onAttach;
    private readonly onDetach;
    constructor();
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
    /** Exposed only to enable safe interoperability between mismatching EVT versions, do not use */
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    /** Exposed only to enable safe interoperability between EVT versions, do not use */
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}
export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}
/** https://docs.evt.land/api/ctx */
export declare class VoidCtx extends Ctx<void> implements VoidCtxLike {
    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    done(): Handler.WithEvt<any, void>[];
}
export {};
