import { Polyfill as Set } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.2/deno_dist/Set.ts";
import { Polyfill as WeakMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v2.2.2/deno_dist/WeakMap.ts";
import { assert } from "https://deno.land/x/tsafe@v1.1.1/assert.ts";;
import { is } from "https://deno.land/x/tsafe@v1.1.1/is.ts";
import { LazyEvt } from "./LazyEvt.ts";
import { importProxy } from "./importProxy.ts";
import { overwriteReadonlyProp } from "https://deno.land/x/tsafe@v1.1.1/lab/overwriteReadonlyProp.ts";

import type { 
    Handler, 
    NonPostableEvtLike,
    Evt,
    CtxLike,
    DoneOrAborted
} from "./types/index.ts";

export type Ctx<Result = void> = import("./types/interfaces/index.ts").Ctx<Result>;

class CtxImpl<Result> implements Ctx<Result>{


    get evtDoneOrAborted(): Evt<DoneOrAborted<Result>> {
        return this.lazyEvtDoneOrAborted.evt;
    }

    get evtAttach(): Evt<Handler.WithEvt<any, Result>> {
        return this.lazyEvtAttach.evt;
    }

    get evtDetach(): Evt<Handler.WithEvt<any, Result>> {
        return this.lazyEvtDetach.evt;
    }

    private __completionStatus: DoneOrAborted<Result> | undefined;

    get completionStatus(): DoneOrAborted<Result> | undefined {
        return this.__completionStatus;
    }


    private lazyEvtAttach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDetach = new LazyEvt<Handler.WithEvt<any, Result>>();
    private lazyEvtDoneOrAborted = new LazyEvt<DoneOrAborted<Result>>();

    private onDoneOrAborted(doneOrAborted: DoneOrAborted<Result>): void {

        this.__completionStatus = doneOrAborted;

        this.lazyEvtDoneOrAborted.post(doneOrAborted);
    }

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
        NonPostableEvtLike<any>
    >();

    getHandlers(): Handler.WithEvt<any, Result>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    zz__addHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
        evt: NonPostableEvtLike<T>
    ) {
        assert(handler.ctx === this);
        assert(is<Handler<T, any, Ctx<Result>>>(handler));

        if( this.completionStatus !== undefined ){
            handler.detach();
            return;
        }

        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.lazyEvtAttach.post({ handler, evt });
    }

    zz__removeHandler<T>(
        handler: Handler<T, any, CtxLike<Result>>,
    ) {
        assert(handler.ctx === this);
        assert(is<Handler<T, any, Ctx<Result>>>(handler));

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


