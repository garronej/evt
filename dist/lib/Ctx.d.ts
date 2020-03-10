import { Handler } from "./types/Handler";
declare type EvtCore<T> = import("./EvtCore").EvtCore<T>;
export declare class Ctx {
    private evtDetachedInitialPostCount;
    private evtCtxDetach;
    /** returns an Evt that is posted when ctx.detach is invoked. */
    getEvtCtxDetach(): NonNullable<typeof Ctx.prototype.evtCtxDetach>;
    /** Detach all handlers from their respective evt and post getEvtCtxDetach(). */
    detach(): Handler.WithEvt<any>[];
    private handlers;
    private evtByHandler;
    getHandlers(): Handler.WithEvt<any>[];
    static __addHandlerToCtxCore<T>(handler: Handler<T, any, Ctx>, evt: EvtCore<T>): void;
    static __removeHandlerFromCtxCore(handler: Handler<any, any, Ctx>): void;
    static __matchHandlerBoundToCtx<T>(handler: Handler<T, any>): handler is Handler<T, any, Ctx>;
}
export {};
