import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
import { setPostCount } from "./EvtCore";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

export class Ctx {

    private evtDetachedInitialPostCount = 0;

    
    private evtCtxDetach: Evt<Handler.WithEvt<any>[]> | undefined = undefined;

    /** returns an Evt that is posted when ctx.detach is invoked. */
    public getEvtCtxDetach(): NonNullable<typeof Ctx.prototype.evtCtxDetach> {

        if (this.evtCtxDetach === undefined) {
            this.evtCtxDetach = new Evt();
            setPostCount(
                this.evtCtxDetach,
                this.evtDetachedInitialPostCount
            );
        }

        return this.evtCtxDetach;

    }

    /** Detach all handlers from their respective evt and post getEvtCtxDetach(). */
    public detach(): Handler.WithEvt<any>[] {

        const handlers: Handler.WithEvt<any>[] = [];

        for (const handler of this.handlers.values()) {

            const evt = this.evtByHandler.get(handler)!;

            const wasStillAttached = handler.detach();

            if (!wasStillAttached) {
                continue;
            }

            handlers.push({ handler, evt });
        }


        if (this.evtCtxDetach === undefined) {
            this.evtDetachedInitialPostCount++
            return handlers;
        }
        this.evtCtxDetach.post(handlers);

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
        handler: Handler<T, any, Ctx>,
        evt: EvtCore<T>
    ) {
        const { ctx } = handler;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
    }

    public static __removeHandlerFromCtxCore(
        handler: Handler<any, any, Ctx>
    ) {
        const { ctx } = handler;
        ctx.handlers.delete(handler);
    }

    public static __matchHandlerBoundToCtx<T>(handler: Handler<T, any>): handler is Handler<T, any, Ctx> {
        return handler.ctx !== undefined;
    }

    

}
