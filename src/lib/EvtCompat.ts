import { EvtBase } from "./EvtBase";
import { OneShot, UnpackEvt } from "./helperTypes";
import { HandlerGroupBaseProtected } from "./EvtBaseProtected";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
import { Bindable, TransformativeMatcher } from "./defs"

export class HandlerGroup extends HandlerGroupBaseProtected {

    public readonly evtDetached: OneShot<EvtCompat<Handler<any, any>[]>>;

    constructor() {
        super();
        const evtDetached = new EvtCompat<UnpackEvt<typeof HandlerGroup.prototype.evtDetached>>();
        this.onDetach = handlers => evtDetached.post(handlers);
        this.evtDetached = evtDetached;
    }

}


export class EvtCompat<T> extends EvtBase<T> {

    public static createHandlerGroup() { return new HandlerGroup(); }

    /** https://garronej.github.io/ts-evt/#evtevtattach */
    public readonly evtAttach = new EvtBase<Handler<T, any>>()

    protected addHandler<U>(
        attachParams: UserProvidedParams<T, U>,
        implicitAttachParams: ImplicitParams
    ): Handler<T, U> {

        let handler = super.addHandler(attachParams, implicitAttachParams);

        this.evtAttach.post(handler);

        return handler;

    }

    public readonly evtDetach = new EvtBase<Handler<T, any>>()

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


    protected __createDelegate<U>(
        matcher: TransformativeMatcher<T, U>,
        boundTo: Bindable
    ): EvtCompat<U> {

        const evtDelegate = new EvtCompat<U>();

        this.$attach(
            matcher,
            boundTo,
            transformedData => evtDelegate.post(transformedData)
        );

        return evtDelegate;

    }


    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     * 
     * matcher - Transformative
     * 
     * boundTo?
     */
    public createDelegate<U>(
        matcher: TransformativeMatcher<T, U>,
        boundTo?: Bindable
    ): EvtCompat<U>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     * 
     * matcher - Type guard
     * 
     * boundTo?
     */
    public createDelegate<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo?: Bindable
    ): EvtCompat<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtcreatedelegate
     * 
     * matcher - Filter only
     * 
     * boundTo?
     */
    public createDelegate(
        matcher: (data: T) => boolean,
        boundTo?: Bindable
    ): EvtCompat<T>;
    /** 
     * https://garronej.github.io/ts-evt/#evtcreatedelegate 
     * 
     * boundTo?
     * */
    public createDelegate(
        boundTo?: Bindable
    ): EvtCompat<T>;
    public createDelegate<U>(
        ...inputs: any[]
    ): EvtCompat<T | U> {

        const { matcher, boundTo } = this.parseOverloadParams(
            inputs,
            "createDelegate"
        );

        return this.__createDelegate<T | U>(
            typeof matcher === "function" ?
                ((...[data,,cbInvokedIfMatched]) => this.invokeMatcher<T | U>(matcher, data, cbInvokedIfMatched))
                :
                matcher,
            boundTo
        );

    }

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
    pipe(...inputs: any[]): EvtCompat<any> {

        const { matcher, boundTo } = this.parseOverloadParams(
            inputs,
            "pipe"
        );

        return this.__createDelegate(
            typeof matcher === "function" ?
                ((...[data, , cbInvokedIfMatched]) => this.invokeMatcher(matcher, data, cbInvokedIfMatched))
                :
                matcher,
            boundTo
        );




    }


}

/*
const tm1: TransformativeMatcher.Stateful<string, number> = [(str, prev1) => [prev1 + str.length], 0];
const tm2: TransformativeMatcher.Stateful<number, string[]> = [(n, prev2) => [[...prev2, `${n}`]], []];

const tmu: TransformativeMatcher<string, string[]> = (() => {


    let prev1: number = 0;

    return id<TransformativeMatcher<string, string[]>>(
        [(str, prev2, isInternalInvocation) => {

            const n = prev1 + str.length;

            const data= [...prev2, `${n}`];

            if( !!isInternalInvocation && !TransformativeMatcher.Returns.NotMatched.match([data]) ){
                prev1 = n;
            }

            return [data];

        }, []]
    );


})();
*/










/** https://garronej.github.io/ts-evt/#voidevt */
export class VoidEvtCompat extends EvtCompat<void> {

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
