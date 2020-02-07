

import { Polyfill as Map, LightMap } from "minimal-polyfills/dist/lib/Map";
import "minimal-polyfills/dist/lib/Array.prototype.find";

import * as runExclusive from "run-exclusive";
import {
    UserProvidedParams,
    ImplicitParams,
    Bindable,
    Handler,
    EvtError
} from "./defs";

/** Evt without evtAttach property and without overload */
export class EvtBaseProtected<T> {

    private defaultFormatter(...inputs: any[]): T {
        return inputs[0];
    }

    public postCount = 0;

    private traceId: string | null = null;
    private traceFormatter!: (data: T) => string;
    private log!: typeof console.log;

    public enableTrace(
        id: string,
        formatter?: (data: T) => string,
        log?: (message?: any, ...optionalParams: any[]) => void //NOTE: we don't want to expose types from node
    ) {
        this.traceId = id;
        if (!!formatter) {

            this.traceFormatter = formatter;

        } else {
            this.traceFormatter = data => {
                try {
                    return JSON.stringify(data, null, 2);
                } catch{
                    return `${data}`;
                }
            }
        }

        if (!!log) {
            this.log = log;
        } else {
            this.log = (...inputs) => console.log(...inputs);
        }

    }
    public disableTrace() {
        this.traceId = null;
    }


    private readonly handlers: Handler<T>[] = [];

    private readonly handlerTriggers: LightMap<Handler<T>, (data: T) => void> = new Map();

    //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
    //occurred after the handler was set. We don't want to waitFor event from the past.
    //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
    private readonly asyncHandlerChronologyMark: WeakMap<ImplicitParams.Async, number> =
        typeof WeakMap !== "undefined" ?
            new WeakMap() :
            new Map()
        ;

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    private readonly asyncHandlerChronologyExceptionRange: WeakMap<
        ImplicitParams.Async,
        {
            lowerMark: number;
            upperMark: number;
        }
    > = typeof WeakMap !== "undefined" ?
            new WeakMap() :
            new Map()
        ;

    /*
    NOTE: Used as Date.now() would be used to compare if an event is anterior 
    or posterior to an other. We don't use Date.now() because two call within
    less than a ms will return the same value unlike this function.
    */
    private readonly getChronologyMark = (() => {

        let currentChronologyMark = 0;

        return () => currentChronologyMark++;

    })();


    protected addHandler(
        attachParams: UserProvidedParams<T>,
        implicitAttachParams: ImplicitParams
    ): Handler<T> {

        const handler: Handler<T> = {
            ...attachParams,
            ...implicitAttachParams,
            "detach": null as any,
            "promise": null as any
        };

        if (handler.async) {

            this.asyncHandlerChronologyMark.set(
                handler,
                this.getChronologyMark()
            );

        }

        handler.promise = new Promise<T>(
            (resolve, reject) => {

                let timer: NodeJS.Timer | undefined = undefined;

                if (typeof handler.timeout === "number") {

                    timer = setTimeout(() => {

                        timer = undefined;

                        handler.detach();

                        reject(new EvtError.Timeout(handler.timeout!));

                    }, handler.timeout);

                }

                handler.detach = () => {

                    let index = this.handlers.indexOf(handler);

                    if (index < 0) return false;

                    this.handlers.splice(index, 1);

                    this.handlerTriggers.delete(handler);

                    if (timer) {

                        clearTimeout(timer);

                        reject(new EvtError.Detached());

                    }

                    return true;

                };

                this.handlerTriggers.set(
                    handler,
                    (data: T) => {

                        let { callback, once } = handler;

                        if (timer) {
                            clearTimeout(timer);
                            timer = undefined;
                        }

                        if (once) handler.detach();

                        callback?.call(handler.boundTo, data);

                        resolve(data);

                    }
                );

            }
        );

        if (handler.prepend) {

            let i: number;

            for (i = 0; i < this.handlers.length; i++) {

                if (this.handlers[i].extract) {
                    continue;
                }

                break;

            }

            this.handlers.splice(i, 0, handler);

        } else {

            this.handlers.push(handler);

        }

        return handler;

    }

    private trace(data: T) {

        if (this.traceId === null) {
            return;
        }

        let message = `(${this.traceId}) `;

        let isExtracted = !!this.handlers.find(
            ({ extract, matcher }) => extract && matcher(data)
        );

        if (isExtracted) {

            message += "extracted ";

        } else {

            let handlerCount = this.handlers
                .filter(({ extract, matcher }) => !extract && matcher(data))
                .length;

            message += `${handlerCount} handler${(handlerCount > 1) ? "s" : ""} => `;

        }

        this.log(message + this.traceFormatter(data));

    }


    /** Returns post count */
    public post(data: T): number {

        this.trace(data);

        this.postCount++;

        //NOTE: Must be before postSync.
        const postChronologyMark = this.getChronologyMark();

        const isExtracted = this.postSync(data);

        if (!isExtracted) {
            this.postAsync(
                data,
                postChronologyMark
            );
        }

        return this.postCount;

    }

    /** Return isExtracted */
    private postSync(data: T): boolean {

        for (let handler of [...this.handlers]) {

            let { async, matcher, extract } = handler;

            if (async) {
                continue;
            }

            if (!matcher(data)) {
                continue;
            }

            const handlerTrigger = this.handlerTriggers.get(handler);

            //NOTE: Possible if detached while in the loop.
            if (!handlerTrigger) {
                continue;
            }

            handlerTrigger(data);

            if (extract) {
                return true;
            }

        }

        return false;

    }


    private readonly postAsync = runExclusive.buildCb(
        (data: T, postChronologyMark: number, releaseLock?) => {

            const promises: Promise<T>[] = [];

            let chronologyMarkStartResolveTick: number;

            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(
                () => chronologyMarkStartResolveTick = this.getChronologyMark()
            );

            for (const handler of [...this.handlers]) {

                if (!handler.async) {
                    continue;
                }

                if (!handler.matcher(data)) {
                    continue;
                }

                const handlerTrigger = this.handlerTriggers.get(handler);

                if (!handlerTrigger) {
                    continue;
                }

                const shouldCallHandlerTrigger = (() => {

                    const handlerMark = this.asyncHandlerChronologyMark.get(handler)!;

                    if (postChronologyMark > handlerMark) {
                        return true;
                    }

                    const exceptionRange = this.asyncHandlerChronologyExceptionRange.get(handler);

                    if (exceptionRange === undefined) {
                        return false;
                    }

                    if (
                        exceptionRange.lowerMark < postChronologyMark &&
                        postChronologyMark < exceptionRange.upperMark
                    ) {
                        return true;
                    }

                    return false;

                })();

                if (!shouldCallHandlerTrigger) {
                    continue;
                }

                promises.push(handler.promise);

                handlerTrigger(data);

            }

            if (promises.length !== 0) {

                const handlersDump = [...this.handlers];

                Promise.all(promises).then(() => {

                    for (let handler of this.handlers) {


                        if (!handler.async) {
                            continue;
                        }

                        if (handlersDump.indexOf(handler) >= 0) {
                            continue;
                        }

                        this.asyncHandlerChronologyExceptionRange.set(
                            handler,
                            {
                                "lowerMark": postChronologyMark,
                                "upperMark": chronologyMarkStartResolveTick
                            }
                        );

                    }

                    releaseLock();

                });


            } else {
                releaseLock();
            }


        }
    );

    constructor();
    constructor(
        eventEmitter: { on(eventName: string, listener: Function): any; },
        eventName: string,
        formatter?: (...inputs) => T);
    constructor(...inputs: any[]) {

        if (!inputs.length) return;

        let [eventEmitter, eventName] = inputs;

        let formatter: (...inputs: any[]) => T = inputs[2] || this.defaultFormatter;

        eventEmitter.on(eventName,
            (...inputs) => this.post(formatter.apply(null, inputs))
        );

    }

    protected __waitFor(attachParams: UserProvidedParams<T>): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": true,
                "extract": false,
                "once": true,
                "prepend": false
            }
        ).promise;

    }

    protected __attach(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": false,
                "once": false,
                "prepend": false
            }
        ).promise;

    }

    protected __attachExtract(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": true,
                "once": false,
                "prepend": true
            }
        ).promise;

    }

    protected __attachPrepend(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": false,
                "once": false,
                "prepend": true
            }
        ).promise;

    }

    protected __attachOnce(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": false,
                "once": true,
                "prepend": false
            }
        ).promise;

    }

    protected __attachOncePrepend(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": false,
                "once": true,
                "prepend": true
            }
        ).promise;

    }

    protected __attachOnceExtract(
        attachParams: UserProvidedParams<T>
    ): Promise<T> {

        return this.addHandler(
            attachParams,
            {
                "async": false,
                "extract": true,
                "once": true,
                "prepend": true
            }
        ).promise;

    }

    public getHandlers(): Handler<T>[] { return [...this.handlers]; }

    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    public detach(boundTo?: Bindable): Handler<T>[] {

        let detachedHandlers: Handler<T>[] = [];

        for (let handler of [...this.handlers]) {

            if (boundTo === undefined || handler.boundTo === boundTo) {
                handler.detach();
                detachedHandlers.push(handler);
            }

        }

        return detachedHandlers;

    }


}

