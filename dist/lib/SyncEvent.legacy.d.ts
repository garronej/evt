export interface Postable<T> {
    post(data: T): void;
}
export declare function isCallable(o: any): boolean;
/** Way of defining Object so it does not match number and string */
export declare type Object_ = {
    [k: string]: any;
};
/** Anything but a number, a callable function (i.e. not a constructor), undefined  or null */
export declare type Bindable = Object_ | string;
export declare type AttachParams<T> = {
    matcher(data: T): boolean;
    boundTo: Bindable;
    handler(data: T): any;
};
export declare class SyncEvent<T> {
    static readonly stopPropagation: never[];
    postCount: number;
    /** Posted when an handler is attached to the event handler */
    readonly evtAttach: SyncEvent<"attach" | "attachPrepend" | "attachOnce" | "attachOncePrepend" | "waitFor" | "attachExtract" | "attachOnceExtract" | "waitForExtract">;
    private readonly callbackHandlers;
    private readonly promiseHandlers;
    constructor();
    stopWaiting(): void;
    getHandlerCount(): number;
    getWaiterCount(): number;
    getPermanentHandlerCount(): number;
    getOnceHandlerCount(): number;
    createProxy<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    createProxy(matcher?: (data: T) => boolean): SyncEvent<T>;
    createProxyExtract<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    createProxyExtract(matcher?: (data: T) => boolean): SyncEvent<T>;
    private __createProxy__(matcher, extract);
    private readWaitForParams(inputs);
    waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    waitFor(timeout?: number): Promise<T>;
    waitFor(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    waitForExtract<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    waitForExtract(timeout?: number): Promise<T>;
    waitForExtract(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    private __waitFor__(inputs, extract);
    private readAttachParams(inputs);
    /** handler */
    attach(handler: (data: T) => any): this;
    /** matcher, handler */
    attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attach(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attach(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attach(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attach(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attach(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attach(evt: Postable<T>): this;
    /** matcher, evt */
    attach<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attach(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attach(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attach(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    /** handler */
    attachOnce(handler: (data: T) => any): this;
    /** matcher, handler */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attachOnce(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attachOnce(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attachOnce(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnce(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attachOnce(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attachOnce(evt: Postable<T>): this;
    /** matcher, evt */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attachOnce(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attachOnce(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOnce(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    /** handler */
    attachPrepend(handler: (data: T) => any): this;
    /** matcher, handler */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attachPrepend(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attachPrepend(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attachPrepend(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachPrepend(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attachPrepend(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attachPrepend(evt: Postable<T>): this;
    /** matcher, evt */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attachPrepend(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attachPrepend(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachPrepend(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    /** handler */
    attachOncePrepend(handler: (data: T) => any): this;
    /** matcher, handler */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attachOncePrepend(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attachOncePrepend(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attachOncePrepend(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attachOncePrepend(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attachOncePrepend(evt: Postable<T>): this;
    /** matcher, evt */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attachOncePrepend(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attachOncePrepend(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    /** handler */
    attachExtract(handler: (data: T) => any): this;
    /** matcher, handler */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attachExtract(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attachExtract(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attachExtract(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachExtract(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attachExtract(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attachExtract(evt: Postable<T>): this;
    /** matcher, evt */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attachExtract(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attachExtract(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachExtract(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    /** handler */
    attachOnceExtract(handler: (data: T) => any): this;
    /** matcher, handler */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    attachOnceExtract(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    attachOnceExtract(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    attachOnceExtract(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    attachOnceExtract(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    attachOnceExtract(evt: Postable<T>): this;
    /** matcher, evt */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    attachOnceExtract(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    attachOnceExtract(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;
    private __attach__(inputs, once, extract, prepend);
    post(data: T): this;
    private postPromisesThenCallbacks;
    private postCallback(data);
    private readDetachParams(inputs);
    /** Detach every handlers and waiters of event emitter */
    detach(): this;
    /** Detach specific postable attached to event emitter */
    detach(evt: Postable<T>): this;
    /** Detach every handler boundTo Object */
    detach(boundTo: Bindable): this;
    /** Detach specific handler */
    detach(handler: (data: T) => void): this;
    /** Detach specific handler bound bound to Object */
    detach(boundTo: Bindable, handler: (data: T) => void): this;
    /** Explicitly tell what you want to detach  matcher and/or boundTo and/or handler */
    detach(by: Partial<AttachParams<T>>): this;
}
export declare class VoidSyncEvent extends SyncEvent<void> {
    post(): this;
}
