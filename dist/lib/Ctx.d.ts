import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
declare type Done<T> = [Error | null, T, Handler.WithEvt<any>[]];
export declare class Ctx<T = any> {
    /** Posted each time ctx.done() is invoked, post the detached handler ( return value of evt.done()) */
    readonly getEvtDone: () => Evt<Done<T>>;
    /**
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject
     * with EvtError.Timeout if done(result) is not called * within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    getPrDone(timeout?: number): Promise<T>;
    /** Posted every time a handler is bound to this context */
    readonly getEvtAttach: () => Evt<Handler.WithEvt<any>>;
    /** Posted every time a handler bound to this context is detached from it's Evt */
    readonly getEvtDetach: () => Evt<Handler.WithEvt<any>>;
    private readonly onDone;
    private readonly onAttach;
    private readonly onDetach;
    constructor();
    /**
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    abort(error: Error): Handler.WithEvt<any>[];
    /**
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    done(result: T): Handler.WithEvt<any>[];
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    private __done;
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, Ctx<T>>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, Ctx>): void;
    static __matchHandlerBoundToCtx<T>(handler: Handler<T, any>): handler is Handler<T, any, Ctx>;
}
export declare class VoidCtx extends Ctx<undefined> {
    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    done(): ReturnType<typeof Ctx.prototype.done>;
}
export {};
