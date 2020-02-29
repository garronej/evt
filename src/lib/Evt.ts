
import { EvtCompat } from "./EvtCompat";
import { Bindable, TransformativeMatcher } from "./defs";

/*
WARNING -- This class is dead code until the TypeScript team fixes
https://github.com/microsoft/TypeScript/issues/36735

EvtCompat is the class exported by the module as Evt.

In current typescript we cannot includes in the same overload
the definition using a transformative matcher so we have 
to define other methods that uses the $ prefix as a workaround.

In the future this limitation may fall off, it will be possible, then
to use this class and the '$' wont be needed anymore.

*/
export class Evt<T> extends EvtCompat<T> {


    protected __createDelegate<U>(
        matcher: TransformativeMatcher<T, U>,
        boundTo: Bindable
    ): Evt<U> {

        const evtDelegate = new Evt<U>();

        this.$attach(
            matcher,
            boundTo,
            transformedData => evtDelegate.post(transformedData)
        );

        return evtDelegate;

    }

    public createDelegate<U>(matcher: TransformativeMatcher<T,U>, boundTo?: Bindable): Evt<U>;
    public createDelegate<Q extends T>(matcher: (data: T) => data is Q, boundTo?: Bindable): Evt<Q>;
    public createDelegate(matcher: (data: T) => boolean, boundTo?: Bindable): Evt<T>;
    public createDelegate(boundTo?: Bindable): Evt<T>;
    public createDelegate(...inputs: any[]): any {
        return (super.createDelegate as any)(...inputs);
    }


    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach<U>(
        matcher: TransformativeMatcher<T,U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attach<U>(
        matcher: TransformativeMatcher<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attach<U>(
        matcher: TransformativeMatcher<T,U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attach(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attach(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;


    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attach<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;


    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attach(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attach(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    public attach(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attach(
        callback: (data: T) => void
    ): Promise<T>;
    public attach(...inputs: any[]) {
        return (super.attach as any)(...inputs);
    }








    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnce(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnce(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(...inputs: any[]) {
        return (super.attachOnce as any)(...inputs);
    }
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: TransformativeMatcher<T,U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: TransformativeMatcher<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: TransformativeMatcher<T,U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: TransformativeMatcher<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachExtract(...inputs: any[]) {
        return (super.attachExtract as any)(...inputs);
    }











    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: TransformativeMatcher<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: TransformativeMatcher<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: TransformativeMatcher<T,U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachPrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: TransformativeMatcher<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachPrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(...inputs: any[]) {
        return (super.attachPrepend as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(...inputs: any[]) {
        return (super.attachOncePrepend as any)(...inputs);
    }



    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: TransformativeMatcher.Once<T,U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(...inputs: any[]) {
        return (super.attachOnceExtract as any)(...inputs);
    }


}

export class VoidEvt extends Evt<void> {
}





