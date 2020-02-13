
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
     * 
     * Enqueue a handler called only one time.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
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
     * 
     * Enqueue a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Enqueue a handler called only one time.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
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
     * 
     * Enqueue a handler called only one time.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
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
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
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
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
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
     * 
     * Unshift a permanent handler to the queue..
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
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
     * 
     * Unshift a permanent handler to the queue..
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
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
     * 
     * Unshift a permanent handler to the queue..
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
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
     * 
     * Unshift a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Unshift a handler called only one time.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Unshift a handler called only one time.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
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
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
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





