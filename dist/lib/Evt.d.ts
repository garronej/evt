import { EvtCompat } from "./EvtCompat";
import { Bindable } from "./defs";
export declare class Evt<T> extends EvtCompat<T> {
    protected __createDelegate<U>(matcher: (data: T) => [U] | null): Evt<U>;
    createDelegate<U>(matcher: (data: T) => [U] | null): Evt<U>;
    createDelegate<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    createDelegate(matcher: (data: T) => boolean): Evt<T>;
    createDelegate(): Evt<T>;
    /** new annotation */
    attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attach(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /** new annotation */
    attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attach(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /** New annotation */
    attach<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attach(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attach(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /** New annotation */
    attach<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attach<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attach(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attach(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attach(timeout: number, callback: (data: T) => void): Promise<T>;
    attach(callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnce(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachOnce(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnce(callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachPrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachPrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    attachPrepend(callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnceExtract(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachOnceExtract(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachOnceExtract(timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnceExtract(callback: (data: T) => void): Promise<T>;
}
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postOnceMatched(): Promise<number>;
}
