import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class Ctx {
    static __CtxForEvtBrand: boolean;
    private evtDetachedInitialPostCount;
    private evtDetach;
    getEvtDetach(): NonNullable<typeof Ctx.prototype.evtDetach>;
    constructor();
    detach(attachedTo?: EvtCore<any>): Handler.WithEvt<any>[];
    private readonly onDetach;
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, Ctx>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, Ctx>): void;
    private static readonly __EVT_CTX_VERSION;
    private static match;
    static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, Ctx>;
}
export {};
