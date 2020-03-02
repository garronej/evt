import { EvtOverloaded } from "./EvtOverloaded";
import { Handler, $Matcher } from "./types";
import { HandlerGroup } from "./HandlerGroup";

export class Evt<T> extends EvtOverloaded<T> {

    public static createHandlerGroup() { return new HandlerGroup(); }

    /** https://garronej.github.io/ts-evt/#evtevtattach */
    public readonly evtAttach = new EvtOverloaded<Handler<T, any>>()

    protected onHandlerAdded(handler: Handler<T, any>) {
        super.onHandlerDetached(handler);
        this.evtAttach.post(handler);
    }

    public readonly evtDetach = new EvtOverloaded<Handler<T, any>>()

    protected onHandlerDetached(handler: Handler<T, any>) {
        super.onHandlerDetached(handler);
        this.evtDetach.post(handler);
    }

    public async postAsyncOnceHandled(data: T) {
        return this.__postOnceHandled({ data, "isSync": false });
    }

    public async postSyncOnceHandled(data: T) {
        return this.__postOnceHandled({ data, "isSync": true });
    }

    private __postOnceHandled(
        { data, isSync }: { data: T; isSync: boolean; }
    ): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }


        let resolvePr: (postCount: number) => void;
        const pr = new Promise<number>(resolve => resolvePr = resolve);

        const resolvePrAndPost = (data: T) => resolvePr(this.post(data));

        this.evtAttach.attachOnce(
            ({ matcher }) => !!this.invokeMatcher(matcher, data),
            () => isSync ?
                resolvePrAndPost(data) :
                Promise.resolve().then(() => resolvePrAndPost(data))
        );

        return pr;


    }

    public pipe(): Evt<T>;
    public pipe<A>($matcher: $Matcher<T, A>): Evt<A>;
    public pipe<A, B>($matcher: $Matcher<T, A>, $matcher2: $Matcher<A, B>): Evt<B>;
    public pipe<A, B, C>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>): Evt<C>;
    public pipe<A, B, C, D>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>): Evt<D>;
    public pipe<A, B, C, D, E>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>): Evt<E>;
    public pipe<A, B, C, D, E, F>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>): Evt<F>;
    public pipe<A, B, C, D, E, F, G>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>): Evt<G>;
    public pipe<A, B, C, D, E, F, G, H>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>): Evt<H>;
    public pipe<A, B, C, D, E, F, G, H, I>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>): Evt<I>;
    public pipe<A, B, C, D, E, F, G, H, I>($matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>, ...$matchererations: $Matcher<any, any>[]): Evt<{}>;

    public pipe(boundTo: HandlerGroup): Evt<T>;
    //public pipe(boundTo: HandlerGroup): Evt<T>;
    //public pipe<A>(boundTo: HandlerGroup, $matcher: $Matcher<T, A>): Evt<A>;
    //public pipe<A, B>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>): Evt<B>;
    //public pipe<A, B, C>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>): Evt<C>;
    //public pipe<A, B, C, D>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>): Evt<D>;
    //public pipe<A, B, C, D, E>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>): Evt<E>;
    //public pipe<A, B, C, D, E, F>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>): Evt<F>;
    //public pipe<A, B, C, D, E, F, G>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>): Evt<G>;
    //public pipe<A, B, C, D, E, F, G, H>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>): Evt<H>;
    //public pipe<A, B, C, D, E, F, G, H, I>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>): Evt<I>;
    //public pipe<A, B, C, D, E, F, G, H, I>(boundTo: HandlerGroup, $matcher1: $Matcher<T, A>, $matcher2: $Matcher<A, B>, $matcher3: $Matcher<B, C>, $matcher4: $Matcher<C, D>, $matcher5: $Matcher<D, E>, $matcher6: $Matcher<E, F>, $matcher7: $Matcher<F, G>, $matcher8: $Matcher<G, H>, $matcher9: $Matcher<H, I>, ...$matchers: $Matcher<any, any>[]): Evt<{}>;

    public pipe<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    //public pipe<Q extends T>(boundTo: HandlerGroup, matcher: (data: T) => data is Q): Evt<Q>;

    public pipe(matcher: (data: T) => boolean): Evt<T>;
    //public pipe(boundTo: HandlerGroup, matcher: (data: T) => boolean): Evt<T>;

    public pipe(...inputs: any[]): Evt<any> {

        const evtDelegate = new Evt<any>();
        this.__attach(
            {
                ...this.parseOverloadParams(inputs, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            }
        );

        return evtDelegate;

    }


}

/** https://garronej.github.io/ts-evt/#voidevt */
export class VoidEvt extends Evt<void> {

    public post(): number {
        return super.post(undefined);
    }

    public async postAsyncOnceHandled() {
        return super.postAsyncOnceHandled(undefined);
    }

    public async postSyncOnceHandled() {
        return super.postSyncOnceHandled(undefined);
    }

}
