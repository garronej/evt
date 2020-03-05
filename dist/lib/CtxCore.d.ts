import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class CtxCore {
    detach(attachedTo?: EvtCore<any>): Handler.WithEvt<any>[];
    protected onDetach: ((detachedHandlers: Handler.WithEvt<any>[]) => void) | undefined;
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, CtxCore>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, CtxCore>): void;
    private static readonly REF_CORE_VERSION;
    private static match;
    static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, CtxCore>;
}
export {};
