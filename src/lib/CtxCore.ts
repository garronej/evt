import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
import { assert } from "../tools/typeSafety/assert";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { id } from "../tools/typeSafety/id";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

export class CtxCore {

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

    protected onDetach: ((detachedHandlers: Handler.WithEvt<any>[]) => void) | undefined;

    private handlers = new Set<
        Handler<any, any, CtxCore>
    >();
    private evtByHandler = new WeakMap<
        Handler<any, any, CtxCore>,
        EvtCore<any>
    >();

    public getHandlers(): Handler.WithEvt<any>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    public static __addHandlerToCtxCore<T>(
        handler: Handler<T, any, CtxCore>,
        evt: EvtCore<T>
    ) {
        const ctx = handler.boundTo;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
    }

    public static __removeHandlerFromCtxCore(
        handler: Handler<any, any, CtxCore>
    ) {
        const ctx = handler.boundTo;
        ctx.handlers.delete(handler);
    }


    private static readonly REF_CORE_VERSION = 1;

    //NOTE: Use this instead of instanceof for interoperability between versions.
    private static match(boundTo: Bindable): boundTo is CtxCore {

        if (typeof boundTo !== "object") {
            return false;
        }

        const { REF_CORE_VERSION } = id<typeof CtxCore>(Object.getPrototypeOf(boundTo).constructor);

        if (typeof REF_CORE_VERSION !== "number") {
            return false;
        }

        assert(
            REF_CORE_VERSION === CtxCore.REF_CORE_VERSION,
            "Compatibility issues between different version of ts-evt"
        );

        return true;

    }

    public static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, CtxCore> {
        return CtxCore.match(handler.boundTo);
    }





}
