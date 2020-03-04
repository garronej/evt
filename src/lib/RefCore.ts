import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
import { assert } from "../tools/typeSafety/assert";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { id } from "../tools/typeSafety/id";
type EvtCore<T> = import("./EvtCore").EvtCore<T>;

export class RefCore {

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
        Handler<any, any, RefCore>
    >();
    private evtByHandler = new WeakMap<
        Handler<any, any, RefCore>,
        EvtCore<any>
    >();

    public getHandlers(): Handler.WithEvt<any>[] {
        return Array.from(this.handlers.values())
            .map(handler => ({ handler, "evt": this.evtByHandler.get(handler)! }))
            ;
    }


    public static __addHandlerToRefCore<T>(
        handler: Handler<T, any, RefCore>,
        evt: EvtCore<T>
    ) {
        const ref = handler.boundTo;
        ref.handlers.add(handler);
        ref.evtByHandler.set(handler, evt);
    }

    public static __removeHandlerFromRefCore(
        handler: Handler<any, any, RefCore>
    ) {
        const ref = handler.boundTo;
        ref.handlers.delete(handler);
    }


    private static readonly REF_CORE_VERSION = 1;

    //NOTE: Use this instead of instanceof for interoperability between versions.
    private static match(boundTo: Bindable): boundTo is RefCore {

        if (typeof boundTo !== "object") {
            return false;
        }

        const { REF_CORE_VERSION } = id<typeof RefCore>(Object.getPrototypeOf(boundTo).constructor);

        if (typeof REF_CORE_VERSION !== "number") {
            return false;
        }

        assert(
            REF_CORE_VERSION === RefCore.REF_CORE_VERSION,
            "Compatibility issues between different version of ts-evt"
        );

        return true;

    }

    public static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, RefCore> {
        return RefCore.match(handler.boundTo);
    }





}
