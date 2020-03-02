import { EvtCore } from "./EvtCore";
import { Bindable, Handler, $Matcher } from "./types"
import { isCallableFunction } from "../tools/isCallableFunction";
import { id } from "../tools/typeSafety";
import { composeMatcher } from "./util/composeMatcher";

export function parseOverloadParamsFactory<T>(
    { defaultBoundTo }: { defaultBoundTo: Object; }
) {

    const canBeMatcher = (p: any): boolean => {
        return isCallableFunction(p) || (
            typeof p === "object" &&
            p.length === 2 &&
            isCallableFunction(p[0])
        );
    };

    const defaultParams = id<Handler.PropsFromArgs<T, any>>({
        "matcher": function matchAll() { return true; },
        "boundTo": defaultBoundTo,
        "timeout": undefined,
        "callback": undefined
    })

    return function parseOverloadParams(
        inputs: readonly any[],
        methodName: "waitFor" | "attach-ish" | "createDelegate" | "pipe"
    ): Handler.PropsFromArgs<T, any> {

        type Out = Handler.PropsFromArgs<T, any>;

        switch (methodName) {
            case "pipe": {

                //[]
                //[ boundTo, ...matcher[] ]
                //[ ...matcher[] ]
                //NOTE: In matcher the first element if any can be a filter.

                const getMatcherWrap = (args: readonly any[]) =>
                    args.length === 0 ? {} :
                        { "matcher": args.length === 1 ? args[0] : composeMatcher.many<T>(args as any) }
                    ;

                if (canBeMatcher(inputs[0])) {

                    //[ ...$Matcher[] ]

                    return id<Out>({
                        ...defaultParams,
                        ...getMatcherWrap(inputs)
                    });

                } else {

                    //[]
                    //[ boundTo, ...$Matcher[] ]

                    const [boundTo, ...rest] = inputs;

                    return id<Out>({
                        ...defaultParams,
                        ...(boundTo !== undefined ? {boundTo}:{}),
                        ...getMatcherWrap(rest)
                    });

                }


            } break;
            case "createDelegate": {

                const n =
                    inputs.length
                    -
                    (
                        inputs.length !== 0 &&
                            inputs[inputs.length - 1] === undefined ?
                            1 : 0
                    ) as 0 | 1 | 2;

                switch (n) {
                    case 0:
                        return id<Out>({
                            ...defaultParams
                        });
                    case 1:
                        //[ matcher ]
                        //[ boundTo ]
                        const [p] = inputs;
                        return canBeMatcher(p) ? id<Out>({
                            ...defaultParams,
                            "matcher": p
                        }) : id<Out>({
                            ...defaultParams,
                            "boundTo": p
                        });
                    case 2:
                        //[ matcher, boundTo ]
                        const [p1, p2] = inputs;
                        return id<Out>({
                            ...defaultParams,
                            "matcher": p1,
                            "boundTo": p2
                        });
                }

            } break;

            case "waitFor": {

                const n = inputs.length;

                if (n === 2) {

                    const [p1, p2] = inputs;

                    return id<Out>({
                        ...defaultParams,
                        "matcher": p1,
                        "timeout": p2
                    });

                } else {

                    const [p] = inputs;

                    return id<Out>(
                        canBeMatcher(p) ? ({
                            ...defaultParams,
                            "matcher": p
                        }) : ({
                            ...defaultParams,
                            "timeout": p
                        })
                    );

                }


            } break;
            case "attach-ish": {

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
                            ...defaultParams,
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

                            if (canBeMatcher(p1)) {
                                //[ matcher, timeout, callback ]
                                return id<Out>({
                                    ...defaultParams,
                                    timeout,
                                    callback,
                                    "matcher": p1
                                });

                            } else {
                                //[ boundTo, timeout, callback ]

                                return id<Out>({
                                    ...defaultParams,
                                    timeout,
                                    callback,
                                    "boundTo": p1
                                });

                            }
                        } else {
                            //[ matcher, boundTo, callback ]
                            return id<Out>({
                                ...defaultParams,
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
                                ...defaultParams,
                                "timeout": p1,
                                "callback": p2
                            });
                        } else {
                            //[ matcher, callback ]
                            //[ boundTo, callback ]
                            const callback: Out["callback"] = p2;
                            if (canBeMatcher(p1)) {

                                return id<Out>({
                                    ...defaultParams,
                                    callback,
                                    "matcher": p1
                                });

                            } else {

                                return id<Out>({
                                    ...defaultParams,
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
                            ...defaultParams,
                            "callback": p
                        });

                    }
                    case 0: {
                        return id<Out>({ ...defaultParams });
                    }

                }


            } break;




        }

    };



}

/** Evt without evtAttach property, attachOnceMatched and createDelegate */
export class EvtOverloaded<T> extends EvtCore<T> {

    protected parseOverloadParams = parseOverloadParamsFactory<T>({ "defaultBoundTo": this });

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * $matcher
     * 
     * timeout?
     */
    public waitFor<U>(
        matcher: $Matcher.Once<T, U>,
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
        return super.__waitFor(this.parseOverloadParams(inputs, "waitFor"));
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
        matcher: $Matcher<T, U>,
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
        matcher: $Matcher<T, U>,
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
        matcher: $Matcher<T, U>,
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
        matcher: $Matcher<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * callback 
     */
    public attach(
        callback: (data: T) => void
    ): Promise<T>;
    public attach(...inputs: any[]) {
        return this.__attach(this.parseOverloadParams(inputs, "attach-ish"));
    }




    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative 
     * 
     * $matcher
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: $Matcher.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * callback
     */
    public $attachOnce<U>(
        matcher: $Matcher.Once<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }






    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
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
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * callback
     */
    public attachOnce(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(this.parseOverloadParams(inputs, "attach-ish"));
    }





    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: $Matcher<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: $Matcher<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: $Matcher<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * callback
     */
    public $attachExtract<U>(
        matcher: $Matcher<T, U>,
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
     * $matcher
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
        return this.__attachExtract(this.parseOverloadParams(inputs, "attach-ish"));
    }











    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: $Matcher<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: $Matcher<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: $Matcher<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * callback
     */
    public $attachPrepend<U>(
        matcher: $Matcher<T, U>,
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
        return this.__attachPrepend(this.parseOverloadParams(inputs, "attach-ish"));
    }







    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: $Matcher.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        matcher: $Matcher.Once<T, U>,
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
        return this.__attachOncePrepend(this.parseOverloadParams(inputs, "attach-ish"));
    }








    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: $Matcher.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: $Matcher.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#matcher---transformative
     * 
     * $matcher
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        matcher: $Matcher.Once<T, U>,
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
        return this.__attachOnceExtract(this.parseOverloadParams(inputs, "attach-ish"));
    }


}



