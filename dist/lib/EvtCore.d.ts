import "minimal-polyfills/dist/lib/Array.prototype.find";
import { Handler } from "./types/Handler";
import { Operator } from "./types/Operator";
import { Ctx } from "./Ctx";
export declare const setPostCount: (evt: EvtCore<any>, value: number) => void;
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export declare class EvtCore<T> {
    private __maxHandlers;
    /**
     *
     * By default EventEmitters will print a warning if more than 25 handlers are added for
     * a particular event. This is a useful default that helps finding memory leaks.
     * Not all events should be limited to 25 handlers. The evt.setMaxHandlers() method allows the limit to be
     * modified for this specific EventEmitter instance.
     * The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.
     * Returns a reference to the EventEmitter, so that calls can be chained.
     *
     */
    setMaxHandlers(n: number): this;
    /**
     * https://docs.evt.land/api/evt/post
     *
     * Number of times .post(data) have been called.
     */
    readonly postCount: number;
    private traceId;
    private traceFormatter;
    private log;
    /** https://docs.evt.land/api/evt/enabletrace */
    enableTrace(id: string, formatter?: (data: T) => string, log?: (message?: any, ...optionalParams: any[]) => void): void;
    /** https://docs.evt.land/api/evt/enabletrace */
    disableTrace(): void;
    private readonly handlers;
    private readonly handlerTriggers;
    private readonly asyncHandlerChronologyMark;
    private readonly asyncHandlerChronologyExceptionRange;
    private readonly getChronologyMark;
    private readonly statelessByStatefulOp;
    protected onHandler: ((isAttach: boolean, handler: Handler<T, any>) => void) | undefined;
    private detachHandler;
    private static doDetachIfNeeded;
    private triggerHandler;
    private addHandler;
    /** https://docs.evt.land/api/evt/getstatelessop */
    getStatelessOp(op: Operator<T, any>): Operator.Stateless<T, any>;
    private trace;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * Returns post count
     * */
    post(data: T): number;
    /** Return isExtracted */
    private postSync;
    private readonly postAsync;
    protected __waitFor<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attach<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachExtract<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachPrepend<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOnce<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOncePrepend<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    protected __attachOnceExtract<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/ishandled
     *
     * Test if posting a given event data will have an effect.
     *
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -Handlers could be will be detached
     * if the event data is posted.
     *
     */
    isHandled(data: T): boolean;
    /** https://docs.evt.land/api/evt/gethandler */
    getHandlers(): Handler<T, any>[];
    /**
     * https://docs.evt.land/api/evt/detach
     *
     * Detach every handlers of the Evt that are bound to the provided context
     * */
    detach(ctx: Ctx): Handler<T, any, Ctx>[];
    /**
     * https://docs.evt.land/api/evt/detach
     *
     * (unsafe) Detach every handlers from the Evt
     * */
    detach(): Handler<T, any>[];
}
