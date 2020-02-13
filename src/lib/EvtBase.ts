import { EvtBaseProtected } from "./EvtBaseProtected";
import { Bindable, UserProvidedParams } from "./defs"

const id = <T>(x: T) => x;

/** NOTE: constructors are of type "function" but are not callable,
 * without the new keyword.
 * This function will return true if and only if the object passed is 
 * a function and it is not a constructor.
 */
function isCallable(o: any): boolean {

    if (typeof o !== "function") {
        return false;
    }

    const prototype = o["prototype"];

    if (!prototype) return true;

    let methods = Object.getOwnPropertyNames(prototype);

    if (methods.length !== 1) return false;

    let name: string = o.name;

    if (!name) return true;

    if (name[0].toUpperCase() === name[0]) return false;

    return true;

}


/** Evt without evtAttach property, attachOnceMatched and createDelegate */
export class EvtBase<T> extends EvtBaseProtected<T> {

    private defaultParams: UserProvidedParams<T, any> = {
        "matcher": function matchAll() { return true; },
        "boundTo": this,
        "timeout": undefined,
        "callback": undefined
    };


    private readParams(inputs: any[]): UserProvidedParams<T, any> {

        type Out = ReturnType<(typeof EvtBase)["prototype"]["readParams"]>;

        //[ matcher, boundTo, timeout, callback ]
        //[ matcher, boundTo, callback ]
        //[ matcher, timeout, callback ]
        //[ boundTo, timeout, callback ]
        //[ matcher, callback ]
        //[ boundTo, callback ]
        //[ timeout, callback ]
        //[ callback ]

        const n = inputs.length as 4 | 3 | 2 | 1 | 0;

        switch (n) {
            case 4: {

                //[ matcher, boundTo, timeout, callback ]
                const [p1, p2, p3, p4] = inputs;

                return id<Out>({
                    ...this.defaultParams,
                    "matcher": p1,
                    "boundTo": p2,
                    "timeout": p3,
                    "callback": p4
                });

            }
            case 3: {


                //[ matcher, boundTo, callback ]
                //[ matcher, timeout, callback ]
                //[ boundTo, timeout, callback ]
                const [p1, p2, p3] = inputs;
                if (typeof p2 === "number") {
                    //[ matcher, timeout, callback ]
                    //[ boundTo, timeout, callback ]

                    const timeout: Out["timeout"] = p2;
                    const callback: Out["callback"] = p3;

                    if (isCallable(p1)) {
                        //[ matcher, timeout, callback ]

                        return id<Out>({
                            ...this.defaultParams,
                            timeout,
                            callback,
                            "matcher": p1
                        });

                    } else {
                        //[ boundTo, timeout, callback ]

                        return id<Out>({
                            ...this.defaultParams,
                            timeout,
                            callback,
                            "boundTo": p1
                        });

                    }
                } else {
                    //[ matcher, boundTo, callback ]
                    return id<Out>({
                        ...this.defaultParams,
                        "matcher": p1,
                        "boundTo": p2,
                        "callback": p3
                    });

                }



            }
            case 2: {


                //[ matcher, callback ]
                //[ boundTo, callback ]
                //[ timeout, callback ]
                const [p1, p2] = inputs;
                if (typeof p1 === "number") {
                    //[ timeout, callback ]
                    return id<Out>({
                        ...this.defaultParams,
                        "timeout": p1,
                        "callback": p2
                    });
                } else {
                    //[ matcher, callback ]
                    //[ boundTo, callback ]
                    const callback: Out["callback"] = p2;
                    if (isCallable(p1)) {

                        return id<Out>({
                            ...this.defaultParams,
                            callback,
                            "matcher": p1
                        });


                    } else {

                        return id<Out>({
                            ...this.defaultParams,
                            callback,
                            "boundTo": p1
                        });


                    }
                }

            }
            case 1: {

                //[ callback ]
                const [p] = inputs;

                return id<Out>({
                    ...this.defaultParams,
                    "callback": p
                });


            }
            case 0: {
                return id<Out>({ ...this.defaultParams });
            }

        }


    }



    public waitFor<U>(
        matcher: (data: T) => [U] | null,
        timeout?: number
    ): Promise<U>;

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


        let params: UserProvidedParams<T, any>;

        const n = inputs.length;

        if (n === 2) {

            const [p1, p2] = inputs;

            params = id<typeof params>({
                ...this.defaultParams,
                "matcher": p1,
                "timeout": p2
            });

        } else {

            const [p] = inputs;

            params = id<typeof params>(
                isCallable(p) ? ({
                    ...this.defaultParams,
                    "matcher": p
                }) : ({
                    ...this.defaultParams,
                    "timeout": p
                })
            );

        }

        return super.__waitFor(params);

    }


    /**
     * 
     * Enqueue a permanent handler.
     * 
     * matcher - 
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * 
     * Enqueue a permanent handler.
     * 
     * boundTo - Call context of callback, used as id to detach.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * 
     * Enqueue a permanent handler.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event or reject on timeout.
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * 
     * Enqueue a permanent handler.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
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
        callback: (data: Q) => void
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
        callback: (data: T) => void
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
        callback: (data: Q) => void
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
        callback: (data: T) => void
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
        callback: (data: Q) => void
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
        callback: (data: T) => void
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
        callback: (data: T) => void
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
        callback: (data: Q) => void
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
        callback: (data: T) => void
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
        callback: (data: T) => void
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
        callback: (data: T) => void
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
        callback: (data: T) => void
    ): Promise<T>;

    public attach(...inputs: any[]) {
        return this.__attach(this.readParams(inputs));
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
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;
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
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => any
    ): Promise<U>;
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
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;
    /**
     * 
     * Enqueue a handler called only one time.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => any
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
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

    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(this.readParams(inputs));
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
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;


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
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => any
    ): Promise<U>;


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
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;



    /**
     * 
     * Unshift a permanent handler that will extract matched events.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => any
    ): Promise<U>;

    public $attachExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
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


    public attachExtract(...inputs: any[]) {
        return this.__attachExtract(this.readParams(inputs));
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
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

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
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => any
    ): Promise<U>;

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
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

    /**
     * 
     * Unshift a permanent handler to the queue..
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on first matched event.
     */
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => any
    ): Promise<U>;

    public $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
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


    public attachPrepend(...inputs: any[]) {
        return this.__attachPrepend(this.readParams(inputs));
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
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

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
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => any
    ): Promise<U>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * timeout - ms after witch the returned promise will reject if no event matched.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event or reject on timeout.
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

    /**
     * 
     * Unshift a handler called only one time.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => any
    ): Promise<U>;
    public $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
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


    public attachOncePrepend(...inputs: any[]) {
        return this.__attachOncePrepend(this.readParams(inputs));
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
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

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
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => any
    ): Promise<U>;

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
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => any
    ): Promise<U>;

    /**
     * 
     * Unshift a handler called only one time that will extract the event.
     * 
     * callback - Receive the matched events casted by the matcher.
     * 
     * Return - Promise that resolve on matched event.
     */
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => any
    ): Promise<U>;

    public $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
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

    public attachOnceExtract(...inputs: any[]) {
        return this.__attachOnceExtract(this.readParams(inputs));
    }


}
