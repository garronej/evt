import { EvtBase } from "./EvtBase";
import { Handler, UserProvidedParams, ImplicitParams } from "./defs";
import { Bindable, TransformativeMatcher } from "./defs"

export class EvtCompat<T> extends EvtBase<T> {

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

    protected onHandlerDetached(handler: Handler<T, any>){
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

        const { matcher, boundTo } = this.parseOverloadParams<U>(
            inputs,
            "createDelegate"
        );

        return this.__createDelegate<T | U>(
            typeof matcher === "function" ?
                (data => this.invokeMatcher<T | U>(matcher, data))
                :
                matcher,
            boundTo
        );

    }

}

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
