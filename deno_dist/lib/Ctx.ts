import { Polyfill as Set } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v1.0.8/deno_dist/lib/Set.ts";
import { Polyfill as WeakMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v1.0.8/deno_dist/lib/WeakMap.ts";
import { assert } from "../tools/typeSafety/assert.ts";
import { typeGuard } from "../tools/typeSafety/typeGuard.ts";
import { LazyEvt } from "./LazyEvt.ts";
import { importProxy } from "./importProxy.ts";
import { Handler } from "./types/Handler.ts";
import { defineAccessors } from "../tools/typeSafety/defineAccessors.ts";
import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp.ts";

type EvtLike<T> = import("./types/helper/UnpackEvt.ts").EvtLike<T>;
type Evt<T> = import("./types/interfaces/index.ts").Evt<T>;
type CtxLike<T> = import("./types/interfaces/index.ts").CtxLike<T>;
type DoneOrAborted<Result> = import("./types/interfaces/Ctx.ts").DoneOrAborted<Result>;

export type Ctx<Result> = import("./types/interfaces/index.ts").Ctx<Result>;

class CtxImpl<Result> implements Ctx<Result>{

    declare readonly evtDoneOrAborted: Evt<DoneOrAborted<Result>>;

    declare readonly evtAttach: Evt<Handler.WithEvt<any, Result>>;

    declare readonly evtDetach: Evt<Handler.WithEvt<any, Result>>;


    private lazyEvtAttach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDetach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDoneOrAborted = new LazyEvt<DoneOrAborted<Result>>();

    private onDoneOrAborted(doneEvtData: DoneOrAborted<Result>): void {
        this.lazyEvtDoneOrAborted.post(doneEvtData);
    }

    private static __1: void = (() => {

        if (false) { CtxImpl.__1 }

        defineAccessors(
            CtxImpl.prototype,
            "evtDoneOrAborted",
            {
                "get": function (this: CtxImpl<any>) {
                    return this.lazyEvtDoneOrAborted.evt;
                }
            }
        );

        defineAccessors(
            CtxImpl.prototype,
            "evtAttach",
            {
                "get": function (this: CtxImpl<any>) {
                    return this.lazyEvtAttach.evt;
                }
            }
        );

        defineAccessors(
            CtxImpl.prototype,
            "evtDetach",
            {
                "get": function (this: CtxImpl<any>) {
                    return this.lazyEvtDetach.evt;
                }
            }
        );

    })();

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


    abort(error: Error) {
        return this.__done(error);
    }

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

    getHandlers(): Handler.WithEvt<any, Result>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


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

export const Ctx: {
    new <Result>(): Ctx<Result>;
    readonly prototype: Ctx<any>;
} = CtxImpl;

try{ overwriteReadonlyProp(Ctx as any, "name", "Ctx"); }catch{}

importProxy.Ctx = Ctx;


