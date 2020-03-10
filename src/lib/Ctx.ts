import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { getLazyEvtFactory } from "./util/getLazyEvtFactory";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

export class Ctx {

    /** Posted each time ctx.done() is invoked, post the detached handler ( return value of evt.done()) */
    public readonly getEvtDone: () => Evt<Handler.WithEvt<any>[]>;

    /** Posted every time a handler is bound to this context */
    public readonly getEvtAttach: () => Evt<Handler.WithEvt<any>>;

    /** Posted every time a handler bound to this context is detached from it's Evt */
    public readonly getEvtDetach: () => Evt<Handler.WithEvt<any>>;

    private readonly onDone: (handlers: Handler.WithEvt<any>[]) => void;
    private readonly onAttach: (handler: Handler.WithEvt<any>) => void;
    private readonly onDetach: (handler: Handler.WithEvt<any>) => void;

    constructor() {

        {

            const { getEvt, post } = getLazyEvtFactory<Handler.WithEvt<any>[]>();

            this.onDone = post;
            this.getEvtDone = getEvt;

        }

        {

            const { getEvt, post } = getLazyEvtFactory<Handler.WithEvt<any>>();

            this.getEvtAttach = getEvt;
            this.onAttach = post;

        }

        {

            const { getEvt, post } = getLazyEvtFactory<Handler.WithEvt<any>>();

            this.getEvtDetach = getEvt;
            this.onDetach = post;

        }


    }


    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    public done(): Handler.WithEvt<any>[] {

        const handlers: Handler.WithEvt<any>[] = [];

        for (const handler of this.handlers.values()) {

            const evt = this.evtByHandler.get(handler)!;

            const wasStillAttached = handler.detach();

            if (!wasStillAttached) {
                continue;
            }

            handlers.push({ handler, evt });
        }

        this.onDone(handlers);

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
        ctx.onAttach({ handler, evt });
    }

    public static __removeHandlerFromCtxCore(
        handler: Handler<any, any, Ctx>
    ) {
        const { ctx } = handler;
        ctx.onDetach({ handler, "evt": ctx.evtByHandler.get(handler)! });
        ctx.handlers.delete(handler);
    }

    public static __matchHandlerBoundToCtx<T>(handler: Handler<T, any>): handler is Handler<T, any, Ctx> {
        return handler.ctx !== undefined;
    }



}
