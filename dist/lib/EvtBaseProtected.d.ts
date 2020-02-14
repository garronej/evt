import "minimal-polyfills/dist/lib/Array.prototype.find";
import { UserProvidedParams, ImplicitParams, Bindable, Handler } from "./defs";
/** If the matcher is not transformative then the transformedData will be the input data */
export declare function invokeMatcher<T, U>(matcher: (data: T) => boolean | [U] | null, data: T): [T | U] | null;
export declare const overwriteReadonlyProp: (obj: {
    [key: string]: any;
}, propertyName: string, value: any) => void;
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export declare class EvtBaseProtected<T> {
    /** https://garronej.github.io/ts-evt/#evtpostcount */
    readonly postCount: number;
    private incrementPostCount;
    private traceId;
    private traceFormatter;
    private log;
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    enableTrace(id: string, formatter?: (data: T) => string, log?: (message?: any, ...optionalParams: any[]) => void): void;
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    disableTrace(): void;
    private readonly handlers;
    private readonly handlerTriggers;
    private readonly asyncHandlerChronologyMark;
    private readonly asyncHandlerChronologyExceptionRange;
    private readonly getChronologyMark;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
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
    protected __waitFor<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attach<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attachExtract<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attachPrepend<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attachOnce<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attachOncePrepend<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    protected __attachOnceExtract<U>(attachParams: UserProvidedParams<T, U>): Promise<U>;
    /** https://garronej.github.io/ts-evt/#evtgethandler */
    getHandlers(): Handler<T, any>[];
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    detach(boundTo?: Bindable): Handler<T, any>[];
}
