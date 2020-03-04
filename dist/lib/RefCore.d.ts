import { Handler } from "./types/Handler";
import { Bindable } from "./types/Bindable";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class RefCore {
    detach(attachedTo?: EvtCore<any>): Handler.WithEvt<any>[];
    protected onDetach: ((detachedHandlers: Handler.WithEvt<any>[]) => void) | undefined;
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToRefCore<T>(handler: Handler<T, any, RefCore>, evt: EvtCore<T>): void;
    static __removeHandlerFromRefCore(handler: Handler<any, any, RefCore>): void;
    private static readonly REF_CORE_VERSION;
    private static match;
    static matchHandler<T>(handler: Handler<T, any, Bindable>): handler is Handler<T, any, RefCore>;
}
export {};
