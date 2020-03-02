import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
export declare class HandlerGroupCore {
    readonly isHandlerGroup = true;
    detach(): Handler<any, any>[];
    protected onDetach: ((detachedHandlers: Handler<any, any>[]) => void) | undefined;
    private handlers;
    addHandler(handler: Handler<any, any>): void;
    removeHandler(handler: Handler<any, any>): void;
    static match(boundTo: Bindable): boundTo is HandlerGroupCore;
}
