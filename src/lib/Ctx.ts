import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { assert } from "../tools/typeSafety/assert";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { LazyEvtFactory } from "./util/LazyEvtFactory";
import { importProxy } from "./importProxy";
import /*type*/ { Handler } from "./types/Handler";

type EvtLike<T> = import("./Evt").EvtLike<T>;
type Evt<T> = import("./Evt").Evt<T>;

export interface CtxLike<Result = any> {
    done(result: Result): void;
    abort(error: Error): void;
    zz__addHandler<T>(handler: Handler<T, any, CtxLike<Result>>, evt: EvtLike<T>): void;
    zz__removeHandler<T>(handler: Handler<T, any, CtxLike<Result>>): void;
}

/** https://docs.evt.land/api/ctx */
export class Ctx<Result> implements CtxLike<Result>{

    /** 
     * https://docs.evt.land/api/ctx#ctx-getevtdone
     * 
     * Posted every time ctx.done() is invoked, post the detached handler ( return value of evt.done()) 
     */
    public readonly getEvtDone: () => Evt<Ctx.DoneEvtData<Result>>;

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
    public getPrDone(timeout?: number): Promise<Result> {
        return this.getEvtDone()
            .waitFor(timeout)
            .then(
                ([error, result]) => {
                    if (!!error) {
                        throw error;
                    }
                    return result;
                },
                timeoutError => {
                    this.abort(timeoutError);
                    throw timeoutError;
                }
            )
            ;
    }

    /** 
     * https://docs.evt.land/api/ctx#ctx-getevtattach
     * 
     * Posted every time a handler is bound to this context 
     * */
    public readonly getEvtAttach: () => Evt<Handler.WithEvt<any, Result>>;

    /** 
     * https://docs.evt.land/api/ctx#ctx-getevtdetach
     * 
     * Posted every time a handler bound to this context is detached from it's Evt 
     * */
    public readonly getEvtDetach: () => Evt<Handler.WithEvt<any, Result>>;

    private readonly onDone: (doneEvtData: Ctx.DoneEvtData<Result>) => void;
    private readonly onHandler: (isAttach: boolean, handler: Handler.WithEvt<any, Result>) => void;

    constructor() {

        {

            const lazyEvtAttachFactory = new LazyEvtFactory<Handler.WithEvt<any, Result>>();
            const lazyEvtDetachFactory = new LazyEvtFactory<Handler.WithEvt<any, Result>>();

            this.onHandler = (isAttach, handler) =>
                isAttach ?
                    lazyEvtAttachFactory.post(handler) :
                    lazyEvtDetachFactory.post(handler)
                ;

            this.getEvtAttach = () => lazyEvtAttachFactory.getEvt();
            this.getEvtDetach = () => lazyEvtDetachFactory.getEvt();

        }

        {

            const lazyEvtDoneFactory = new LazyEvtFactory<Ctx.DoneEvtData<Result>>();

            this.onDone = doneEvtData => lazyEvtDoneFactory.post(doneEvtData);

            this.getEvtDone = () => lazyEvtDoneFactory.getEvt();

        }

    }

    /** 
     * https://docs.evt.land/api/ctx#ctx-abort-error
     * 
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    public abort(error: Error) {
        return this.__done(error);
    }

    /**
     * https://docs.evt.land/api/ctx#ctx-done-result
     * 
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    public done(result: Result) {
        return this.__done(undefined, result);
    }

    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    private __done(error: Error | undefined, result?: Result): Handler.WithEvt<any, Result>[] {

        const handlers: Handler.WithEvt<any, Result>[] = [];

        for (const handler of this.handlers.values()) {

            const evt = this.evtByHandler.get(handler)!;

            const wasStillAttached = handler.detach();

            //NOTE: It should not be possible
            if (!wasStillAttached) {
                continue;
            }

            handlers.push({ handler, evt });
        }

        this.onDone([
            error ?? null,
            result as NonNullable<typeof result>,
            handlers
        ]);

        return handlers;

    }

    private handlers = new Set<
        Handler<any, any, Ctx<Result>>
    >();
    private evtByHandler = new WeakMap<
        Handler<any, any, Ctx<Result>>,
        EvtLike<any>
    >();

    /** https://docs.evt.land/api/ctx#ctx-gethandlers */
    public getHandlers(): Handler.WithEvt<any, Result>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    /** Exposed only to enable safe interoperability between mismatching EVT versions, do not use */
    public zz__addHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
        evt: EvtLike<T>
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.onHandler(true, { handler, evt });
    }

    /** Exposed only to enable safe interoperability between EVT versions, do not use */
    public zz__removeHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));

        this.onHandler(false, { handler, "evt": this.evtByHandler.get(handler)! });
        this.handlers.delete(handler);
    }

}

export namespace Ctx {
    export type DoneEvtData<Result> = [Error | null, Result, Handler.WithEvt<any, Result>[]];
}

importProxy.Ctx = Ctx;

export interface VoidCtxLike extends CtxLike<void> {
    done(): void;
}

/** https://docs.evt.land/api/ctx */
export class VoidCtx extends Ctx<void> implements VoidCtxLike {

    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    public done(): Handler.WithEvt<any, void>[] {
        return super.done(undefined);
    }

}

importProxy.VoidCtx = VoidCtx;
