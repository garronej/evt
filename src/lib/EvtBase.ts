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



    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * matcher - Transformative
     * 
     * timeout?
     */
    public waitFor<U>(
        matcher: (data: T) => [U] | null,
        timeout?: number
    ): Promise<U>;

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * matcher - Type guard
     * 
     * timeout?
     */
    public waitFor<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout?: number
    ): Promise<Q>;

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * matcher - Filter only
     * 
     * timeout?
     */
    public waitFor(
        matcher: (data: T) => boolean,
        timeout?: number
    ): Promise<T>;

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * timeout?
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
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - transformative
     * 
     * callback
     */
    public $attach<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attach(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attach<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attach(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * boundTo
     * 
     * callback
     */
    public attach(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * callback 
     */
    public attach(
        callback: (data: T) => void
    ): Promise<T>;
    public attach(...inputs: any[]) {
        return this.__attach(this.readParams(inputs));
    }




    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative 
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }






    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attachOnce(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * callback
     */
    public attachOnce(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(this.readParams(inputs));
    }





    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }








    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attachExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachExtract(...inputs: any[]) {
        return this.__attachExtract(this.readParams(inputs));
    }











    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
    }









    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;

    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attachPrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * callback
     */
    public attachPrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(...inputs: any[]) {
        return this.__attachPrepend(this.readParams(inputs));
    }







    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
    }









    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attachOncePrepend(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * callback
     */
    public attachOncePrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(...inputs: any[]) {
        return this.__attachOncePrepend(this.readParams(inputs));
    }








    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * matcher - Transformative
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: (data: T) => [U] | null,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * boundTo
     * 
     * timeout
     */
    public attachOnceExtract(
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Type guard
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        matcher: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * matcher - Filter only
     * 
     * callback
     */
    public attachOnceExtract(
        matcher: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract(
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * callback
     */
    public attachOnceExtract(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(...inputs: any[]) {
        return this.__attachOnceExtract(this.readParams(inputs));
    }


}
