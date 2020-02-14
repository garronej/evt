
import { EvtCompat } from "./EvtCompat";
import { Bindable } from "./defs";

//Merge into overloads the methods using mutational callbacks alongside callbacks.
//Might be working in future version of typescript but as for Feb 2020 EvtCompat should be used instead.
export class Evt<T> extends EvtCompat<T> {

    protected __createDelegate<U>(
        matcher: (data: T) => [U] | null,
    ): Evt<U> {

        const evtDelegate = new Evt<U>();

        this.$attach(
            matcher,
            transformedData => evtDelegate.post(transformedData)
        );

        return evtDelegate;

    }

    public createDelegate<U>(matcher: (data: T) => [U] | null): Evt<U>;
    public createDelegate<Q extends T>(matcher: (data: T) => data is Q): Evt<Q>;
    public createDelegate(matcher: (data: T) => boolean): Evt<T>;
    public createDelegate(): Evt<T>;
    public createDelegate(...inputs: any[]): any {
        return (super.createDelegate as any)(...inputs);
    }

    /** new annotation */
    public attach<U>(
        matcher: (data: T) => [U] | null,
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

    /** new annotation */
    public attach<U>(
        matcher: (data: T) => [U] | null,
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

    /** New annotation */
    public attach<U>(
        matcher: (data: T) => [U] | null,
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


    /** New annotation */
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachOnce<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachPrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
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
     * matcher - Transformative
     * 
     * callback
     */
    public attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
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

    public post(): number {
        return super.post(undefined);
    }

    public postOnceMatched(): Promise<number> {
        return super.postOnceMatched(undefined);
    }
}





