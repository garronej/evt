import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { assert } from "../tools/typeSafety/assert";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { LazyEvt } from "./LazyEvt";
import { importProxy } from "./importProxy";
import /*type*/ { Handler } from "./types/Handler";
import { defineAccessors } from "../tools/defineAccessors";
import { id } from "../tools/typeSafety/id";

type EvtLike<T> = import("./types/helper/UnpackEvt").EvtLike<T>;
type Evt<T> = import("./types/interfaces").Evt<T>;
type CtxLike<T> = import("./types/interfaces").CtxLike<T>;

export namespace Ctx {

    export type DoneOrAborted<Result> = DoneOrAborted.Done<Result> | DoneOrAborted.Aborted<Result>;

    export namespace DoneOrAborted {

        type Common<Result> = {
            handlers: Handler.WithEvt<any, Result>[];
        }

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

    }
}

/** https://docs.evt.land/api/ctx */
export class Ctx<Result>{

    /** https://docs.evt.land/api/ctx#ctx-evtdoneoraborted */
    declare readonly evtDoneOrAborted: Evt<Ctx.DoneOrAborted<Result>>;

    /** 
     * https://docs.evt.land/api/ctx#ctx-evtattach
     * 
     * Posted every time a handler is bound to this context 
     * */
    declare readonly evtAttach: Evt<Handler.WithEvt<any, Result>>;

    /** 
     * https://docs.evt.land/api/ctx#ctx-evtdetach
     * 
     * Posted every time a handler bound to this context is detached from it's Evt 
     * */
    declare readonly evtDetach: Evt<Handler.WithEvt<any, Result>>;


    private lazyEvtAttach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDetach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDoneOrAborted = new LazyEvt<Ctx.DoneOrAborted<Result>>();

    private onDoneOrAborted(doneEvtData: Ctx.DoneOrAborted<Result>): void {
        this.lazyEvtDoneOrAborted.post(doneEvtData);
    }



    private static __1: void = (() => {

        if (false) { Ctx.__1 }

        defineAccessors(
            Ctx.prototype,
            "evtDoneOrAborted",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtDoneOrAborted.evt;
                }
            }
        );

        defineAccessors(
            Ctx.prototype,
            "evtAttach",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtAttach.evt;
                }
            }
        );

        defineAccessors(
            Ctx.prototype,
            "evtDetach",
            {
                "get": function () {
                    return id<Ctx<any>>(this).lazyEvtDetach.evt;
                }
            }
        );




    })();

    /** 
     * https://docs.evt.land/api/ctx#ctx-waitfor-timeout 
     * 
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject 
     * with EvtError.Timeout if done(result) is not called within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    waitFor(timeout?: number): Promise<Result> {
        return this.evtDoneOrAborted
            .waitFor(timeout)
            .then(
                data => {
                    if (data.type === "ABORTED") {
                        throw data.error;
                    }
                    return data.result;
                },
                timeoutError => {
                    this.abort(timeoutError);
                    throw timeoutError;
                }
            )
            ;
    }


    /** 
     * https://docs.evt.land/api/ctx#ctx-abort-error
     * 
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    abort(error: Error) {
        return this.__done(error);
    }

    /**
     * https://docs.evt.land/api/ctx#ctx-done-result
     * 
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    done(result: Result) {
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

        this.onDoneOrAborted({
            ...(!!error ?
                { type: "ABORTED", error } :
                { type: "DONE", "result": result as NonNullable<typeof result> }
            ),
            handlers
        });


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
    getHandlers(): Handler.WithEvt<any, Result>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    /** 
     * Exposed to enable safe interoperability between mismatching EVT versions. 
     * Should be considered private
     * */
    zz__addHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
        evt: EvtLike<T>
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.lazyEvtAttach.post({ handler, evt });
    }

    /** 
     * Exposed to enable safe interoperability between EVT versions. 
     * Should be considered private
     * */
    zz__removeHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
    ) {
        assert(handler.ctx === this);
        assert(typeGuard<Handler<T, any, Ctx<Result>>>(handler));

        this.lazyEvtDetach.post({
            handler,
            "evt": this.evtByHandler.get(handler)!
        });

        this.handlers.delete(handler);
    }

}

importProxy.Ctx = Ctx;

/** https://docs.evt.land/api/ctx */
export class VoidCtx extends Ctx<void> {

    done(): Handler.WithEvt<any, void>[] {
        return super.done(undefined);
    }

}

importProxy.VoidCtx = VoidCtx;