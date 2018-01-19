import { UserProvidedParams, ImplicitParams, Bindable, Handler } from "./defs";
/** SyncEvent without evtAttach property and without overload */
export declare class SyncEventBaseProtected<T> {
    private tick;
    private defaultFormatter(...inputs);
    postCount: number;
    private traceId;
    private traceFormatter;
    enableTrace(id: string, formatter?: (data: T) => string): void;
    disableTrace(): void;
    private readonly handlers;
    private readonly handlerTriggers;
    protected addHandler(attachParams: UserProvidedParams<T>, implicitAttachParams: ImplicitParams): Handler<T>;
    private trace(data);
    post(data: T): number;
    private postSync(data);
    private readonly postAsync;
    constructor();
    constructor(eventEmitter: {
        on(eventName: string, listener: Function);
    }, eventName: string, formatter?: (...inputs) => T);
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
