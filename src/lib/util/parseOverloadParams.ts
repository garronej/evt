
import { Handler } from "../types/Handler"
import { Operator } from "../types/Operator"
import { isCallableFunction } from "../../tools/isCallableFunction";
import { id } from "../../tools/typeSafety";
import { compose } from "./compose";

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
                            { "op": ops.length === 1 ? ops[0]: compose(...ops) }
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