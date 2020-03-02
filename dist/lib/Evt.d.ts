import { EvtOverloaded } from "./EvtOverloaded";
import { Handler, $Matcher } from "./types";
import { HandlerGroup } from "./HandlerGroup";
export declare class Evt<T> extends EvtOverloaded<T> {
    static createHandlerGroup(): HandlerGroup;
    /** https://garronej.github.io/ts-evt/#evtevtattach */
    readonly evtAttach: EvtOverloaded<Handler<T, any>>;
    protected onHandlerAdded(handler: Handler<T, any>): void;
    readonly evtDetach: EvtOverloaded<Handler<T, any>>;
    protected onHandlerDetached(handler: Handler<T, any>): void;
    postAsyncOnceHandled(data: T): Promise<number>;
    postSyncOnceHandled(data: T): Promise<number>;
    private __postOnceHandled;
    pipe(): Evt<T>;
    pipe<A>($matcher: $Matcher<T, A>): Evt<A>;
    pipe<A, B>($matcher: $Matcher<T, A>, $matcher2: $Matcher<A, B>): Evt<B>;
    pipe<A, B, C>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>): Evt<C>;
    pipe<A, B, C, D>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>): Evt<D>;
    pipe<A, B, C, D, E>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>): Evt<E>;
    pipe<A, B, C, D, E, F>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>): Evt<F>;
    pipe<A, B, C, D, E, F, G>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>): Evt<G>;
    pipe<A, B, C, D, E, F, G, H>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>): Evt<H>;
    pipe<A, B, C, D, E, F, G, H, I>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>): Evt<I>;
    pipe<A, B, C, D, E, F, G, H, I>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>, ...$matchererations: $Matcher<any, any>[]): Evt<{}>;
    pipe(boundTo: HandlerGroup): Evt<T>;
    pipe<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    pipe(matcher: (data: T) => boolean): Evt<T>;
}
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
    postSyncOnceHandled(): Promise<number>;
}
