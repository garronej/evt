import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class Ctx {
    /** Posted each time ctx.done() is invoked, post the detached handler ( return value of evt.done()) */
    readonly getEvtDone: () => Evt<Handler.WithEvt<any>[]>;
    /** Posted every time a handler is bound to this context */
    readonly getEvtAttach: () => Evt<Handler.WithEvt<any>>;
    /** Posted every time a handler bound to this context is detached from it's Evt */
    readonly getEvtDetach: () => Evt<Handler.WithEvt<any>>;
    private readonly onDone;
    private readonly onAttach;
    private readonly onDetach;
    constructor();
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    done(): Handler.WithEvt<any>[];
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, Ctx>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, Ctx>): void;
    static __matchHandlerBoundToCtx<T>(handler: Handler<T, any>): handler is Handler<T, any, Ctx>;
}
export {};
