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
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnce(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
     */
    attachOnce<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOnce<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachOnce(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachOnce(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnce(callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
     */
    attachExtract<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachExtract<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachExtract(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachPrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
     */
    attachPrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachPrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachPrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachPrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    attachPrepend(callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
     */
    attachOncePrepend<U>(matcher: (data: T) => [U] | null, callback: (transformedData: U) => void): Promise<U>;
    attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    attachOncePrepend(matcher: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    attachOncePrepend(callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * boundTo
     *
     * callback
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, boundTo: Bindable, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<U>(matcher: (data: T) => [U] | null, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    attachOnceExtract(matcher: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    attachOnceExtract(boundTo: Bindable, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * matcher - Transformative
     *
     * callback
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
