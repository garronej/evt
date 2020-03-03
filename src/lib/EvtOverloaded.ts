import { EvtCore } from "./EvtCore";
import { Bindable, Handler, Operator } from "./types"
import { isCallableFunction } from "../tools/isCallableFunction";
import { id } from "../tools/typeSafety";
import { composeOperators } from "./util/composeOperators";


export const parseOverloadParamsFactory = (() => {

    function matchAll() { return true; }

    return function parseOverloadParamsFactory<T>(
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
            "op": matchAll,
            "boundTo": defaultBoundTo,
            "timeout": undefined,
            "callback": undefined
        })

        return function parseOverloadParams(
            inputs: readonly any[],
            methodName: "waitFor" | "attach*" | "createDelegate" | "pipe"
        ): Handler.PropsFromArgs<T, any> {

            type Out = Handler.PropsFromArgs<T, any>;

            switch (methodName) {
                case "pipe": {

                    //[]
                    //[ boundTo, ...op[] ]
                    //[ ...op[] ]

                    const getOpWrap = (ops: [Operator<T, any>, ...Operator<any, any>[]])  =>
                        ops.length === 0 ?
                            {} 
                            : 
                            { "op": ops.length === 1 ? ops[0]: composeOperators(...ops) }
                        ;

                    if (canBeMatcher(inputs[0])) {

                        //[ ...op[] ]

                        return id<Out>({
                            ...defaultParams,
                            ...getOpWrap(inputs as any)
                        });

                    } else {

                        //[]
                        //[ boundTo, ...Operator.fλ[] ]

                        const [boundTo, ...rest] = inputs;

                        return id<Out>({
                            ...defaultParams,
                            ...(boundTo !== undefined ? { boundTo } : {}),
                            ...getOpWrap(rest as any)
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
                            //[ op ]
                            //[ boundTo ]
                            const [p] = inputs;
                            return canBeMatcher(p) ? id<Out>({
                                ...defaultParams,
                                "op": p
                            }) : id<Out>({
                                ...defaultParams,
                                "boundTo": p
                            });
                        case 2:
                            //[ op, boundTo ]
                            const [p1, p2] = inputs;
                            return id<Out>({
                                ...defaultParams,
                                "op": p1,
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
                            "op": p1,
                            "timeout": p2
                        });

                    } else {

                        const [p] = inputs;

                        return id<Out>(
                            canBeMatcher(p) ? ({
                                ...defaultParams,
                                "op": p
                            }) : ({
                                ...defaultParams,
                                "timeout": p
                            })
                        );

                    }


                } break;
                case "attach*": {

                    //[ op, boundTo, timeout, callback ]
                    //[ op, boundTo, callback ]
                    //[ op, timeout, callback ]
                    //[ boundTo, timeout, callback ]
                    //[ op, callback ]
                    //[ boundTo, callback ]
                    //[ timeout, callback ]
                    //[ callback ]

                    const n = inputs.length as 4 | 3 | 2 | 1 | 0;

                    switch (n) {
                        case 4: {

                            //[ op, boundTo, timeout, callback ]
                            const [p1, p2, p3, p4] = inputs;

                            return id<Out>({
                                ...defaultParams,
                                "op": p1,
                                "boundTo": p2,
                                "timeout": p3,
                                "callback": p4
                            });

                        }
                        case 3: {

                            //[ op, boundTo, callback ]
                            //[ op, timeout, callback ]
                            //[ boundTo, timeout, callback ]
                            const [p1, p2, p3] = inputs;
                            if (typeof p2 === "number") {
                                //[ op, timeout, callback ]
                                //[ boundTo, timeout, callback ]

                                const timeout: Out["timeout"] = p2;
                                const callback: Out["callback"] = p3;

                                if (canBeMatcher(p1)) {
                                    //[ op, timeout, callback ]
                                    return id<Out>({
                                        ...defaultParams,
                                        timeout,
                                        callback,
                                        "op": p1
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
                                //[ op, boundTo, callback ]
                                return id<Out>({
                                    ...defaultParams,
                                    "op": p1,
                                    "boundTo": p2,
                                    "callback": p3
                                });

                            }

                        }
                        case 2: {

                            //[ op, callback ]
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
                                //[ op, callback ]
                                //[ boundTo, callback ]
                                const callback: Out["callback"] = p2;
                                if (canBeMatcher(p1)) {

                                    return id<Out>({
                                        ...defaultParams,
                                        callback,
                                        "op": p1
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

})();

/** Evt without evtAttach property, attachOnceMatched and createDelegate */
export class EvtOverloaded<T> extends EvtCore<T> {

    protected parseOverloadParams = parseOverloadParamsFactory<T>({ "defaultBoundTo": this });

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * op - fλ
     * 
     * timeout?
     */
    public waitFor<U>(
        op: Operator.fλ.Once<T, U>,
        timeout?: number
    ): Promise<U>;

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * op - Type guard
     * 
     * timeout?
     */
    public waitFor<Q extends T>(
        op: (data: T) => data is Q,
        timeout?: number
    ): Promise<Q>;

    /**
     * https://garronej.github.io/ts-evt/#evtwaitfor
     * 
     * op - Filter
     * 
     * timeout?
     */
    public waitFor(
        op: (data: T) => boolean,
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
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attach<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
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
     * op - Type guard
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
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
        return this.__attach(this.parseOverloadParams(inputs, "attach*"));
    }




    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ 
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnce<U>(
        op: Operator.fλ.Once<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }






    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
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
     * op - Type guard
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpostdata
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
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
        return this.__attachOnce(this.parseOverloadParams(inputs, "attach*"));
    }





    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachExtract<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }








    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        callback: (data: T) => void
    ): Promise<T>;
    public attachExtract(...inputs: any[]) {
        return this.__attachExtract(this.parseOverloadParams(inputs, "attach*"));
    }











    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachPrepend<U>(
        op: Operator.fλ<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
    }









    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;

    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
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
     * op - Type guard
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and-evtattachonceprepend
     * 
     * op - Filter
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
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
        return this.__attachPrepend(this.parseOverloadParams(inputs, "attach*"));
    }







    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOncePrepend<U>(
        op: Operator.fλ.Once<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
    }









    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
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
     * op - Type guard
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachprepend-and--evtattachonceprepend
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
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
        return this.__attachOncePrepend(this.parseOverloadParams(inputs, "attach*"));
    }








    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * boundTo
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Once<T, U>,
        boundTo: Bindable,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Once<T, U>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://garronej.github.io/ts-evt/#op---fλ
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnceExtract<U>(
        op: Operator.fλ.Once<T, U>,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }







    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        boundTo: Bindable,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        boundTo: Bindable,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * boundTo
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        boundTo: Bindable,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Type guard
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
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
     * op - Type guard
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://garronej.github.io/ts-evt/#evtattachextract-and-evtattachonceextract
     * 
     * op - Filter
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
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
        return this.__attachOnceExtract(this.parseOverloadParams(inputs, "attach*"));
    }


}



