import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
import { assert } from "../tools/typeSafety/assert";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";

export class HandlerGroupCore {

    public readonly isHandlerGroup = true;

    public detach() {

        const detachedHandlers: Handler<any, any>[] = [];

        for (const handler of this.handlers.values()) {

            const wasStillAttached = handler.detach();
            if (!wasStillAttached) {
                continue;
            }
            detachedHandlers.push(handler);
        }

        this.onDetach?.(detachedHandlers);

        return detachedHandlers;

    }

    protected onDetach: ((detachedHandlers: Handler<any, any>[]) => void) | undefined;

    private handlers = new Set<Handler<any, any>>();

    public addHandler(handler: Handler<any, any>) {
        this.handlers.add(handler);
    }

    public removeHandler(handler: Handler<any, any>) {
        this.handlers.delete(handler);
    }

    static match(boundTo: Bindable): boundTo is HandlerGroupCore {
        assert(typeGuard.dry<HandlerGroupCore>(boundTo));
        return !!boundTo.isHandlerGroup;
    }

}