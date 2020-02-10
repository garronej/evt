import "minimal-polyfills/dist/lib/Array.prototype.find";
import { UserProvidedParams, ImplicitParams, Bindable, Handler } from "./defs";
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export declare class EvtBaseProtected<T> {
    private defaultFormatter;
    postCount: number;
    private traceId;
    private traceFormatter;
    private log;
    enableTrace(id: string, formatter?: (data: T) => string, log?: (message?: any, ...optionalParams: any[]) => void): void;
    disableTrace(): void;
    private readonly handlers;
    private readonly handlerTriggers;
    private readonly asyncHandlerChronologyMark;
    private readonly asyncHandlerChronologyExceptionRange;
    private readonly getChronologyMark;
    protected addHandler(attachParams: UserProvidedParams<T>, implicitAttachParams: ImplicitParams): Handler<T>;
    private trace;
    /** Returns post count */
    post(data: T): number;
    /** Return isExtracted */
    private postSync;
    private readonly postAsync;
    constructor();
    constructor(eventEmitter: {
        on(eventName: string, listener: Function): any;
    }, eventName: string, formatter?: (...inputs: any[]) => T);
    protected __waitFor(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attach(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attachExtract(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attachPrepend(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attachOnce(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attachOncePrepend(attachParams: UserProvidedParams<T>): Promise<T>;
    protected __attachOnceExtract(attachParams: UserProvidedParams<T>): Promise<T>;
    getHandlers(): Handler<T>[];
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    detach(boundTo?: Bindable): Handler<T>[];
}
