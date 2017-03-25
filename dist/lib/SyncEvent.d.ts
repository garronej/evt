export interface Postable<T> {
    post(data: T): void;
}
export declare type AttachParams<T> = {
    matcher(data: T): boolean;
    boundTo: Object;
    handler(data: T): void;
};
export declare type HandlerType = "attach" | "attachOnce";
export declare class SyncEvent<T> {
    private static readonly defaultEvtMatcher;
    postCount: number;
    readonly evtAttach: SyncEvent<HandlerType | "waitFor">;
    private readonly handlers;
    private readonly promiseHandlers;
    stopWaiting(): void;
    readonly handlerCount: number;
    readonly waiterCount: number;
    readonly permanentHandlerCount: number;
    readonly onceHandlerCount: number;
    constructor();
    private readWaitForParams(inputs);
    waitFor<Q extends T>(matcher: (data: T) => data is Q): Promise<Q>;
    waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout: number): Promise<Q>;
    waitFor(): Promise<T>;
    waitFor(timeout: number): Promise<T>;
    waitFor(matcher: (data: T) => boolean): Promise<T>;
    waitFor(matcher: (data: T) => boolean, timeout: number): Promise<T>;
    private readAttachParams(inputs);
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;
    attachOnce(event: Postable<T>): void;
    attachOnce(handler: (data: T) => void): void;
    attachOnce(matcher: (data: T) => boolean, event: Postable<T>): void;
    attachOnce(matcher: (data: T) => boolean, handler: (data: T) => void): void;
    attachOnce(boundTo: Object, handler: (data: T) => void): void;
    attachOnce(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void;
    attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    attach<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;
    attach(event: Postable<T>): void;
    attach(handler: (data: T) => void): void;
    attach(matcher: (data: T) => boolean, event: Postable<T>): void;
    attach(matcher: (data: T) => boolean, handler: (data: T) => void): void;
    attach(boundTo: Object, handler: (data: T) => void): void;
    attach(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void;
    private __attach__(type, matcher, boundTo, handler);
    private readDetachParams(inputs);
    detach(): void;
    detach(event: Postable<T>): void;
    detach(by: Partial<AttachParams<T>>): void;
    detach(boundTo: Object): void;
    detach(handler: (data: T) => void): void;
    detach(boundTo: Object, handler: (data: T) => void): void;
    post(data: T): void;
    private postPromise;
}
export declare class VoidSyncEvent extends SyncEvent<void> {
    post(): void;
}
