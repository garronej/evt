import { EvtBase } from "./EvtBase";
import { OneShot } from "./helperTypes";
import { HandlerGroupBaseProtected } from "./EvtBaseProtected";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
import { Bindable, TransformativeMatcher } from "./defs";
export declare class HandlerGroup extends HandlerGroupBaseProtected {
    readonly evtDetached: OneShot<EvtCompat<Handler<any, any>[]>>;
    constructor();
}
export declare class EvtCompat<T> extends EvtBase<T> {
    static createHandlerGroup(): HandlerGroup;
    /** https://garronej.github.io/ts-evt/#evtevtattach */
    readonly evtAttach: EvtBase<Handler<T, any>>;
    protected addHandler<U>(attachParams: UserProvidedParams<T, U>, implicitAttachParams: ImplicitParams): Handler<T, U>;
    readonly evtDetach: EvtBase<Handler<T, any>>;
    protected onHandlerDetached(handler: Handler<T, any>): void;
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
    pipe(): EvtCompat<T>;
    pipe<A>(op1: TransformativeMatcher<T, A>): EvtCompat<A>;
    pipe<A, B>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>): EvtCompat<B>;
    pipe<A, B, C>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>): EvtCompat<C>;
    pipe<A, B, C, D>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>): EvtCompat<D>;
    pipe<A, B, C, D, E>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>): EvtCompat<E>;
    pipe<A, B, C, D, E, F>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>): EvtCompat<F>;
    pipe<A, B, C, D, E, F, G>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>): EvtCompat<G>;
    pipe<A, B, C, D, E, F, G, H>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>): EvtCompat<H>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>, op9: TransformativeMatcher<H, I>): EvtCompat<I>;
    pipe<A, B, C, D, E, F, G, H, I>(op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>, op9: TransformativeMatcher<H, I>, ...operations: TransformativeMatcher<any, any>[]): EvtCompat<{}>;
    pipe(boundTo: Bindable): EvtCompat<T>;
    pipe<A>(boundTo: Bindable, op1: TransformativeMatcher<T, A>): EvtCompat<A>;
    pipe<A, B>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>): EvtCompat<B>;
    pipe<A, B, C>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>): EvtCompat<C>;
    pipe<A, B, C, D>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>): EvtCompat<D>;
    pipe<A, B, C, D, E>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>): EvtCompat<E>;
    pipe<A, B, C, D, E, F>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>): EvtCompat<F>;
    pipe<A, B, C, D, E, F, G>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>): EvtCompat<G>;
    pipe<A, B, C, D, E, F, G, H>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>): EvtCompat<H>;
    pipe<A, B, C, D, E, F, G, H, I>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>, op9: TransformativeMatcher<H, I>): EvtCompat<I>;
    pipe<A, B, C, D, E, F, G, H, I>(boundTo: Bindable, op1: TransformativeMatcher<T, A>, op2: TransformativeMatcher<A, B>, op3: TransformativeMatcher<B, C>, op4: TransformativeMatcher<C, D>, op5: TransformativeMatcher<D, E>, op6: TransformativeMatcher<E, F>, op7: TransformativeMatcher<F, G>, op8: TransformativeMatcher<G, H>, op9: TransformativeMatcher<H, I>, ...operations: TransformativeMatcher<any, any>[]): EvtCompat<{}>;
}
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvtCompat extends EvtCompat<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
    postSyncOnceHandled(): Promise<number>;
}
