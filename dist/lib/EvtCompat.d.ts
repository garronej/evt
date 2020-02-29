import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
import { Bindable, TransformativeMatcher } from "./defs";
export declare class EvtCompat<T> extends EvtBase<T> {
    /** https://garronej.github.io/ts-evt/#evtevtattach */
    readonly evtAttach: EvtBase<Handler<T, any>>;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
    readonly evtDetach: EvtBase<Handler<T, any>>;
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    detach(boundTo?: Bindable): Handler<T, any>[];
    postAsyncOnceHandled(data: T): Promise<number>;
    postSyncOnceHandled(data: T): Promise<number>;
    private __postOnceHandled;
    protected __createDelegate<U>(matcher: TransformativeMatcher<T, U>, boundTo: Bindable): EvtCompat<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Transformative
     *
     * boundTo?
     */
    createDelegate<U>(matcher: TransformativeMatcher<T, U>, boundTo?: Bindable): EvtCompat<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Type guard
     *
     * boundTo?
     */
    createDelegate<Q extends T>(matcher: (data: T) => data is Q, boundTo?: Bindable): EvtCompat<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * matcher - Filter only
     *
     * boundTo?
     */
    createDelegate(matcher: (data: T) => boolean, boundTo?: Bindable): EvtCompat<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     *
     * boundTo?
     * */
    createDelegate(boundTo?: Bindable): EvtCompat<T>;
}
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvtCompat extends EvtCompat<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
    postSyncOnceHandled(): Promise<number>;
}
