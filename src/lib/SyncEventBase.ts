import { SyncEventBaseProtected } from "./SyncEventBaseProtected";
import { Postable, Bindable, UserProvidedParams } from "./defs"

function matchPostable(o: any): o is Postable<any> {
    return o instanceof Object && typeof o.post === "function";
}

function isCallable(o: any): boolean {

    if (typeof o !== "function") return false;

    let prototype = o["prototype"];

    if (!prototype) return true;

    let methods = Object.getOwnPropertyNames(prototype);

    if (methods.length !== 1) return false;

    let name: string = o.name;

    if (!name) return true;

    if (name[0].toUpperCase() === name[0]) return false;

    return true;

}


/** SyncEvent without evtAttach property */
export class SyncEventBase<T> extends SyncEventBaseProtected<T> {

    private defaultParams: UserProvidedParams<T> = {
        "matcher": function matchAll() { return true; },
        "boundTo": this,
        "timeout": undefined,
        "callback": undefined
    };

    private getDefaultParams(): UserProvidedParams<T> {
        return { ...this.defaultParams };
    }

    private readParams(inputs: any[]): UserProvidedParams<T> {

        let out = this.getDefaultParams();

        let n = inputs.length;

        if (!n) return out;

        //[ matcher, boundTo, timeout, callback ]
        //[ matcher, boundTo, callback ]
        //[ matcher, timeout, callback ]
        //[ boundTo, timeout, callback ]
        //[ matcher, callback ]
        //[ boundTo, callback ]
        //[ timeout, callback ]
        //[ callback ]
        //[ matcher, timeout, evt ]
        //[ matcher, evt ]
        //[ timeout, evt ]
        //[ evt ]

        if (matchPostable(inputs[n - 1])) {
            out.boundTo = inputs[n - 1];
            inputs[n - 1] = inputs[n - 1].post;
        }
        //[ matcher, boundTo, timeout, callback ]
        //[ matcher, boundTo, callback ]
        //[ matcher, timeout, callback ]
        //[ boundTo, timeout, callback ]
        //[ matcher, callback ]
        //[ boundTo, callback ]
        //[ timeout, callback ]
        //[ callback ]
        if (n === 4) {
            //[ matcher, boundTo, timeout, callback ]
            let [p1, p2, p3, p4] = inputs;
            out.matcher = p1;
            out.boundTo = p2;
            out.timeout = p3;
            out.callback = p4;
        } else if (n === 3) {
            //[ matcher, boundTo, callback ]
            //[ matcher, timeout, callback ]
            //[ boundTo, timeout, callback ]
            let [p1, p2, p3] = inputs;
            if (typeof p2 === "number") {
                //[ matcher, timeout, callback ]
                //[ boundTo, timeout, callback ]
                out.timeout = p2;
                out.callback = p3;
                if (isCallable(p1)) {
                    //[ matcher, timeout, callback ]
                    out.matcher = p1;
                } else {
                    //[ boundTo, timeout, callback ]
                    out.boundTo = p1;
                }
            } else {
                //[ matcher, boundTo, callback ]
                out.matcher = p1;
                out.boundTo = p2;
                out.callback = p3;
            }
        } else if (n === 2) {
            //[ matcher, callback ]
            //[ boundTo, callback ]
            //[ timeout, callback ]
            let [p1, p2] = inputs;
            if (typeof p1 === "number") {
                //[ timeout, callback ]
                out.timeout = p1;
                out.callback = p2;
            } else {
                //[ matcher, callback ]
                //[ boundTo, callback ]
                out.callback = p2;
                if (isCallable(p1)) {
                    out.matcher = p1;
                } else {
                    out.boundTo = p1;
                }
            }
        } else if (n === 1) {
            //[ callback ]
            let [p] = inputs;
            out.callback = p;
        }

        return out;

    }

    /**
     * 
     * 'await' a specific event. Can be used in async loop without missing events.
     * 
     * matcher - Match and cast the event to be returned.
     * 
     * timeout - Throw Error after X ms if no event matched. ( never if not set )
     * 
     * Return - The the matched event casted.
     * 
     */
    public waitFor<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout?: number
    ): Promise<Q>;

    /**
     * 
     * 'await' a specific event. Can be used in async loop without missing events.
     * 
     * matcher - Match the event to be returned.
     * 
     * timeout - Throw Error after X ms if no event matched. ( never if not set )
     * 
     * Return - The the matched event.
     * 
     */
    public waitFor(
        matcher: (data: T) => boolean,
        timeout?: number
    ): Promise<T>;

    /**
     * 
     * 'await' the next event. Can be used in async loop without missing events.
     * 
     * matcher - Match and cast the event to be returned.
     * 
     * timeout - Throw Error (promise is rejected) after X ms. ( never if not set )
     * 
     * Return - The matched event.
     * 
     */
    public waitFor(
        timeout?: number
    ): Promise<T>;

    public waitFor(...inputs: any[]) {

        let params = this.getDefaultParams();

        let n = inputs.length;

        if (n === 2) {

            let [p1, p2] = inputs;

            params.matcher = p1;
            params.timeout = p2;

        } else {

            let [p] = inputs;

            if( isCallable(p) ){
                params.matcher= p;
            }else{
                params.timeout= p;
            }

        }

        return super.__waitFor(params);

    }

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attach(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event..
     */
    public attach(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attach(
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attach(
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attach(
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attach(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attach(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attach(
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a permanent handler.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attach(
        evt: Postable<T>
    ): Promise<T>;

    public attach(...inputs: any[]) {
        return this.__attach(this.readParams(inputs));
    }










    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnce(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event..
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnce(
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnce(
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnce(
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnce(
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnce(
        evt: Postable<T>
    ): Promise<T>;

    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(this.readParams(inputs));
    }










    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;


    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event..
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attachExtract(
        evt: Postable<T>
    ): Promise<T>;

    public attachExtract(...inputs: any[]) {
        return this.__attachExtract(this.readParams(inputs));
    }












    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attachPrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on first matched event..
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attachPrepend(
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attachPrepend(
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attachPrepend(
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on first event or reject on timeout.
     */
    public attachPrepend(
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on first event.
     */
    public attachPrepend(
        evt: Postable<T>
    ): Promise<T>;

    public attachPrepend(...inputs: any[]) {
        return this.__attachPrepend(this.readParams(inputs));
    }




    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOncePrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event..
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOncePrepend(
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOncePrepend(
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOncePrepend(
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOncePrepend(
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOncePrepend(
        evt: Postable<T>
    ): Promise<T>;

    public attachOncePrepend(...inputs: any[]) {
        return this.__attachOncePrepend(this.readParams(inputs));
    }





    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnceExtract(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => any
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * callback - Receive the matched events.
     * 
     * Return - Promise that resolve on matched event..
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnceExtract(
        boundTo: Bindable,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnceExtract(
        timeout: number,
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * callback - Receive events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnceExtract(
        callback: (data: T) => any
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        evt: Postable<Q>
    ): Promise<Q>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * matcher - Filter events that should be passed to the callback.
     * 
     * evt - Will post the matched events.
     * 
     * Return - Promise that resolve on matched event.
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * timeout - ms after with the returned promise will reject if no event matched.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event or reject on timeout.
     */
    public attachOnceExtract(
        timeout: number,
        evt: Postable<T>
    ): Promise<T>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * evt - Will post events.
     * 
     * Return - Promise that resolve on event.
     */
    public attachOnceExtract(
        evt: Postable<T>
    ): Promise<T>;

    public attachOnceExtract(...inputs: any[]) {
        return this.__attachOnceExtract(this.readParams(inputs));
    }


}
