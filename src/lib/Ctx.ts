import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { getLazyEvtFactory } from "./util/getLazyEvtFactory";
import { UnpackEvt } from "./types/helper/UnpackEvt";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

type Done<T> = [Error | null, T, Handler.WithEvt<any>[]];

export class Ctx<T = any> {

    /** Posted each time ctx.done() is invoked, post the detached handler ( return value of evt.done()) */
    public readonly getEvtDone: () => Evt<Done<T>>;

    /** 
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject 
     * with EvtError.Timeout if done(result) is not called * within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    public getPrDone(timeout?: number): Promise<T> {
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

    /** Posted every time a handler is bound to this context */
    public readonly getEvtAttach: () => Evt<Handler.WithEvt<any>>;

    /** Posted every time a handler bound to this context is detached from it's Evt */
    public readonly getEvtDetach: () => Evt<Handler.WithEvt<any>>;

    private readonly onDone: ([error, result, handlers]: Done<T>) => void;
    private readonly onAttach: (handler: UnpackEvt<ReturnType<typeof Ctx.prototype.getEvtAttach>>) => void;
    private readonly onDetach: (handler: UnpackEvt<ReturnType<typeof Ctx.prototype.getEvtDetach>>) => void;

    constructor() {

        {

            const { getEvt, post } = getLazyEvtFactory<Done<T>>();

            this.onDone = post;
            this.getEvtDone = getEvt;

        }

        {

            const { getEvt, post } = getLazyEvtFactory<
                UnpackEvt<ReturnType<typeof Ctx.prototype.getEvtAttach>>
            >();

            this.getEvtAttach = getEvt;
            this.onAttach = post;

        }

        {

            const { getEvt, post } = getLazyEvtFactory<
                UnpackEvt<ReturnType<typeof Ctx.prototype.getEvtDetach>>
            >();

            this.getEvtDetach = getEvt;
            this.onDetach = post;

        }


    }

    /** 
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    public abort(error: Error) {
        return this.__done(error);
    }

    /**
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    public done(result: T) {
        return this.__done(undefined, result);
    }

    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    private __done(error: Error | undefined, result?: T): Handler.WithEvt<any>[] {

        const handlers: Handler.WithEvt<any>[] = [];

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
        Handler<any, any, Ctx>
    >();
    private evtByHandler = new WeakMap<
        Handler<any, any, Ctx>,
        EvtCore<any>
    >();

    public getHandlers(): Handler.WithEvt<any>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }

    public static __addHandlerToCtxCore<T>(
        handler: Handler<T, any, Ctx<T>>,
        evt: EvtCore<T>
    ) {
        const { ctx } = handler;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
        ctx.onAttach({ handler, evt });
    }

    public static __removeHandlerFromCtxCore(
        handler: Handler<any, any, Ctx>
    ) {
        const { ctx } = handler;
        ctx.onDetach({ handler, "evt": ctx.evtByHandler.get(handler)! });
        ctx.handlers.delete(handler);
    }

    public static __matchHandlerBoundToCtx<T>(
        handler: Handler<T, any>
    ): handler is Handler<T, any, Ctx> {
        return handler.ctx !== undefined;
    }



}

export class VoidCtx extends Ctx<undefined> {

    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    public done(): ReturnType<typeof Ctx.prototype.done> {
        return super.done(undefined);
    }

}
