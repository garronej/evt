import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
import { setPostCount } from "./EvtCore";
import { Bindable } from "./types/Bindable";
import { assert } from "../tools/typeSafety/assert";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { id } from "../tools/typeSafety/id";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

export class Ctx {

    public static __CtxForEvtBrand = true;

    private evtDetachedInitialPostCount = 0;
    private evtDetach: Evt<Handler.WithEvt<any>[]> | undefined = undefined;

    public getEvtDetach(): NonNullable<typeof Ctx.prototype.evtDetach> {

        if (this.evtDetach === undefined) {
            this.evtDetach = new Evt();
            setPostCount(
                this.evtDetach,
                this.evtDetachedInitialPostCount
            );
        }

        return this.evtDetach;

    }

    constructor() {

        this.onDetach = handlers => {
            if (this.evtDetach === undefined) {
                this.evtDetachedInitialPostCount++
                return;
            }
            this.evtDetach.post(handlers);
        };
    }

    public detach(attachedTo?: EvtCore<any>): Handler.WithEvt<any>[] {

        const out: Handler.WithEvt<any>[] = [];

        for (const handler of this.handlers.values()) {

            const evt = this.evtByHandler.get(handler)!;

            if (
                attachedTo !== undefined &&
                evt !== attachedTo
            ) {
                continue;
            }

            const wasStillAttached = handler.detach();

            if (!wasStillAttached) {
                continue;
            }

            out.push({ handler, evt });
        }

        this.onDetach?.(out);

        return out;

    }

    private readonly onDetach: ((detachedHandlers: Handler.WithEvt<any>[]) => void);

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
        const ctx = handler.boundTo;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
    }

    public static __removeHandlerFromCtxCore(
        handler: Handler<any, any, Ctx>
    ) {
        const ctx = handler.boundTo;
        ctx.handlers.delete(handler);
    }


    private static readonly __EVT_CTX_VERSION = 1;

    //NOTE: Use this instead of instanceof for interoperability between versions.
    private static match(boundTo: Bindable): boundTo is Ctx {

        if (typeof boundTo !== "object") {
            return false;
        }

        const { __EVT_CTX_VERSION: REF_CORE_VERSION } = id<typeof Ctx>(Object.getPrototypeOf(boundTo).constructor);

        if (typeof REF_CORE_VERSION !== "number") {
            return false;
        }

        assert(
            REF_CORE_VERSION === Ctx.__EVT_CTX_VERSION,
            "Compatibility issues between different version of ts-evt"
        );

        return true;

    }

    public static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, Ctx> {
        return Ctx.match(handler.boundTo);
    }


}