import { EvtBaseProtected } from "./EvtBaseProtected";
import { Bindable } from "./defs";
/** Evt without evtAttach property, attachOnceMatched and createDelegate */
export declare class EvtBase<T> extends EvtBaseProtected<T> {
    private defaultParams;
    private readParams;
    /**
     *
     *
     *
     * matcher - Transformative
     *
     * timeout
     *
     */
    waitFor<U>(matcher: (data: T) => [U] | null, timeout?: number): Promise<U>;
    /**
     *
     * {@link https://github.com GitHub2}.
     *
     * @param matcher Type guard
     * @param [timeout]
     */
    waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    /**
     * Waits for
     * @param matcher Filter
     * @param [timeout]
     */
    waitFor(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    /**
     *
     * 'await' the next event. Can be used in async loop without missing events.
     *
     * matcher - Match and cast the event to be returned.
     *
     * timeout - Throw Error (promise is rejected) after X ms. ( never if not set )
     *
     * Return - The matched event.
     *
     */
    waitFor(timeout?: number): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher -
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    $attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    $attach<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    $attach<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    $attach<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event.
     */
    attach(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attach(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event or reject on timeout.
     */
    attach(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attach<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event..
     */
    attach(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event.
     */
    attach(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event or reject on timeout.
     */
    attach(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a permanent handler.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event.
     */
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
    $attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
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
    $attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
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
    $attachOnce<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    $attachOnce<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnce(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOnce(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event..
     */
    attachOnce(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
    attachOnce(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Enqueue a handler called only one time.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
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
    $attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
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
    $attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
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
    $attachExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    $attachExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler that will extract matched events.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event..
     */
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
    $attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
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
    $attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
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
    $attachPrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    $attachPrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    attachPrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event or reject on timeout.
     */
    attachPrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on first matched event.
     */
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on first matched event..
     */
    attachPrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event.
     */
    attachPrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event or reject on timeout.
     */
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a permanent handler to the queue..
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on first event.
     */
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
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
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
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    $attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOncePrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event..
     */
    attachOncePrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
    attachOncePrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
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
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
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
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
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
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    $attachOnceExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after witch the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOnceExtract(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events casted by the matcher.
     *
     * Return - Promise that resolve on matched event.
     */
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * matcher - Filter events that should be passed to the callback.
     *
     * callback - Receive the matched events.
     *
     * Return - Promise that resolve on matched event..
     */
    attachOnceExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * boundTo - Call context of callback, used as id to detach.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
    attachOnceExtract(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * timeout - ms after with the returned promise will reject if no event matched.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event or reject on timeout.
     */
    attachOnceExtract(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     *
     * Unshift a handler called only one time that will extract the event.
     *
     * callback - Receive events.
     *
     * Return - Promise that resolve on event.
     */
    attachOnceExtract(callback: (data: T) => void): Promise<T>;
}
