import { assert, typeGuard } from "../tools/typeSafety";
import { Polyfill as Map, LightMap } from "minimal-polyfills/dist/lib/Map";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { Polyfill as Set } from "minimal-polyfills/dist/lib/Set";
import "minimal-polyfills/dist/lib/Array.prototype.find";
import * as runExclusive from "run-exclusive";
import {
    UserProvidedParams,
    ImplicitParams,
    Bindable,
    Handler,
    EvtError,
    TransformativeMatcher
} from "./defs";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";


export class HandlerGroupBaseProtected {

    public readonly isHandlerGroupImpl = true;

    public detach() {

        const detachedHandlers: Handler<any, any>[] = [];

        for (const handler of this.handlers.values()) {

            const wasStillAttached = handler.detach();
            if (!wasStillAttached) {
                continue;
            }
            detachedHandlers.push(handler);
        }

        this.onDetach?.(detachedHandlers);

        return detachedHandlers;

    }

    protected onDetach: ((detachedHandlers: Handler<any, any>[]) => void) | undefined;

    private handlers = new Set<Handler<any, any>>();

    public addHandler(handler: Handler<any, any>) {
        this.handlers.add(handler);
    }

    public removeHandler(handler: Handler<any, any>) {
        this.handlers.delete(handler);
    }

    static match(boundTo: Bindable): boundTo is HandlerGroupBaseProtected {
        assert(typeGuard.dry<HandlerGroupBaseProtected>(boundTo));
        return !!boundTo.isHandlerGroupImpl;
    }

}

/** If the matcher is not transformative then the transformedData will be the input data */
export function invokeMatcher<T, U>(
    matcher: TransformativeMatcher<T, U> | ((data: T) => boolean),
    data: T,
    [previousValue]: [U | undefined]
): TransformativeMatcher.Returns<T | U> {

    const matcherResult = (typeof matcher === "function" ? matcher : matcher[0])(
        data,
        previousValue!
    );

    //NOTE: We assume it was a transformative matcher only 
    //if the returned value is a singleton or a couple, otherwise 
    //we assume it was a filtering matcher that should have returned
    //a boolean but returned something else.
    return (
        matcherResult === null ? null :
            matcherResult === "DETACH" ? "DETACH" :
                typeof matcherResult === "object" &&
                    (matcherResult.length === 1 || matcherResult.length === 2) ? matcherResult :
                    !!matcherResult ? [data] : null
    );

}

function matchNotMatched(
    transformativeMatcherResult: TransformativeMatcher.Returns<any>
): transformativeMatcherResult is (null | "DETACH") {
    return (
        transformativeMatcherResult === null ||
        transformativeMatcherResult === "DETACH"
    );
}




/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export class EvtBaseProtected<T> {

    public static createHandlerGroup(): HandlerGroupBaseProtected {
        return new HandlerGroupBaseProtected();
    }

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    /** https://garronej.github.io/ts-evt/#evtpostcount */
    public readonly postCount!: number;

    private incrementPostCount = (() => {

        const setPostCount = (value: number) => overwriteReadonlyProp(this, "postCount", value);

        setPostCount(0);

        return () => setPostCount(this.postCount + 1);

    })();



    private traceId: string | null = null;
    private traceFormatter!: (data: T) => string;
    private log!: typeof console.log;

    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    public enableTrace(
        id: string,
        formatter?: (data: T) => string,
        log?: (message?: any, ...optionalParams: any[]) => void
        //NOTE: Not typeof console.log as we don't want to expose types from node
    ) {
        this.traceId = id;

        this.traceFormatter = formatter ?? (
            data => {
                try {
                    return JSON.stringify(data, null, 2);
                } catch{
                    return `${data}`;
                }
            }
        );

        this.log = log ?? ((...inputs) => console.log(...inputs));

    }
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    public disableTrace() {
        this.traceId = null;
    }


    private readonly handlers: Handler<T, any>[] = [];

    private readonly handlerTriggers: LightMap<
        Handler<T, any>,
        (transformativeMatcherMatchedResult: readonly [any] | readonly [any, "DETACH" | null]) => void
    > = new Map();

    //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
    //occurred after the handler was set. We don't want to waitFor event from the past.
    //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
    private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    private readonly asyncHandlerChronologyExceptionRange = new WeakMap<
        ImplicitParams.Async,
        {
            lowerMark: number;
            upperMark: number;
        }
    >();

    /*
    NOTE: Used as Date.now() would be used to compare if an event is anterior 
    or posterior to an other. We don't use Date.now() because two call within
    less than a ms will return the same value unlike this function.
    */
    private readonly getChronologyMark = (() => {

        let currentChronologyMark = 0;

        return () => currentChronologyMark++;

    })();


    private readonly stateOfStatefulTransformativeMatchers = new WeakMap<
        TransformativeMatcher.Stateful<T, any>,
        any
    >();


    protected addHandler<U>(
        userProvidedParams: UserProvidedParams<T, U>,
        implicitAttachParams: ImplicitParams
    ): Handler<T, U> {

        if (typeof userProvidedParams.matcher !== "function") {

            this.stateOfStatefulTransformativeMatchers.set(
                userProvidedParams.matcher,
                userProvidedParams.matcher[1]
            );

        }

        const handler: Handler<T, U> = {
            ...userProvidedParams,
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

        (handler.promise as (typeof handler)["promise"]) = new Promise<U>(
            (resolve, reject) => {

                let timer: NodeJS.Timer | undefined = undefined;

                if (typeof handler.timeout === "number") {

                    timer = setTimeout(() => {

                        timer = undefined;

                        handler.detach();

                        reject(new EvtError.Timeout(handler.timeout!));

                    }, handler.timeout);

                }

                (handler.detach as (typeof handler)["detach"]) = () => {

                    const index = this.handlers.indexOf(handler);

                    if (index < 0) {
                        return false;
                    }

                    if (HandlerGroupBaseProtected.match(handler.boundTo)) {
                        handler.boundTo.removeHandler(handler);
                    }


                    this.handlers.splice(index, 1);

                    this.handlerTriggers.delete(handler);

                    if (timer !== undefined) {

                        clearTimeout(timer);

                        reject(new EvtError.Detached());

                    }

                    this.onHandlerDetached(handler);

                    return true;

                };

                this.handlerTriggers.set(
                    handler,
                    (transformativeMatcherMatchedResult: readonly [U] | readonly [U, "DETACH" | null]) => {

                        const { callback, once } = handler;

                        if (timer !== undefined) {
                            clearTimeout(timer);
                            timer = undefined;
                        }

                        if (
                            once || (
                                transformativeMatcherMatchedResult.length === 2 &&
                                transformativeMatcherMatchedResult[1] === "DETACH"
                            )
                        ) {
                            handler.detach();
                        }

                        const transformedData = transformativeMatcherMatchedResult[0];

                        if (typeof userProvidedParams.matcher !== "function") {

                            this.stateOfStatefulTransformativeMatchers.set(
                                userProvidedParams.matcher,
                                transformedData
                            );

                        }


                        callback?.call(
                            handler.boundTo,
                            transformedData
                        );

                        resolve(transformedData);

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

        if (HandlerGroupBaseProtected.match(handler.boundTo)) {
            handler.boundTo.addHandler(handler);
        }

        return handler;

    }

    private trace(data: T) {

        if (this.traceId === null) {
            return;
        }

        let message = `(${this.traceId}) `;

        let isExtracted = !!this.handlers.find(
            ({ extract, matcher }) => extract && !!this.invokeMatcher(matcher, data)
        );

        if (isExtracted) {

            message += "extracted ";

        } else {

            let handlerCount = this.handlers
                .filter(({ extract, matcher }) => !extract && !!this.invokeMatcher(matcher, data))
                .length;

            message += `${handlerCount} handler${(handlerCount > 1) ? "s" : ""} => `;

        }

        this.log(message + this.traceFormatter(data));

    }


    /** 
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * Returns post count 
     * */
    public post(data: T): number {

        this.trace(data);

        this.incrementPostCount();

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


    /** If the matcher is not transformative then the transformedData will be the input data */
    protected invokeMatcher<U>(
        matcher: TransformativeMatcher<T, U> | ((data: T) => boolean),
        data: T
    ): TransformativeMatcher.Returns<T | U> {

        return invokeMatcher<T, U>(
            matcher,
            data,
            [
                typeof matcher === "function" ?
                    undefined :
                    this.stateOfStatefulTransformativeMatchers.get(
                        matcher
                    )
            ]
        );

    }




    /** Return isExtracted */
    private postSync(data: T): boolean {

        for (const handler of [...this.handlers]) {

            const { async, matcher, extract } = handler;

            if (async) {
                continue;
            }
            const transformativeMatcherResult = this.invokeMatcher(matcher, data);

            if (matchNotMatched(transformativeMatcherResult)) {

                if (transformativeMatcherResult === "DETACH") {
                    handler.detach();
                }
                continue;

            }

            const handlerTrigger = this.handlerTriggers.get(handler);

            //NOTE: Possible if detached while in the loop.
            if (!handlerTrigger) {
                continue;
            }

            handlerTrigger(transformativeMatcherResult);

            if (extract) {
                return true;
            }

        }

        return false;

    }

    private readonly postAsync = runExclusive.buildMethodCb(
        (data: T, postChronologyMark: number, releaseLock?) => {

            const promises: Promise<void>[] = [];

            let chronologyMarkStartResolveTick: number;

            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(
                () => chronologyMarkStartResolveTick = this.getChronologyMark()
            );

            for (const handler of [...this.handlers]) {

                if (!handler.async) {
                    continue;
                }

                //const transformativeMatcherResult = invokeMatcher(handler.matcher, data);

                const transformativeMatcherResult = this.invokeMatcher(handler.matcher, data);

                if (matchNotMatched(transformativeMatcherResult)) {

                    if (transformativeMatcherResult === "DETACH") {
                        handler.detach();
                    }
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

                    return (
                        exceptionRange !== undefined &&
                        exceptionRange.lowerMark < postChronologyMark &&
                        postChronologyMark < exceptionRange.upperMark &&
                        handlerMark > exceptionRange.upperMark
                    );

                })();

                if (!shouldCallHandlerTrigger) {
                    continue;
                }

                promises.push(
                    new Promise<void>(
                        resolve => handler.promise
                            .then(() => resolve())
                            .catch(() => resolve())
                    )
                );

                handlerTrigger(transformativeMatcherResult);

            }

            if (promises.length === 0) {
                releaseLock();
                return;
            }

            const handlersDump = [...this.handlers];

            Promise.all(promises).then(() => {

                for (const handler of this.handlers) {

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

        }
    );

    protected __waitFor<U>(attachParams: UserProvidedParams<T, U>): Promise<U> {

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

    protected __attach<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    protected __attachExtract<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    protected __attachPrepend<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    protected __attachOnce<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    protected __attachOncePrepend<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    protected __attachOnceExtract<U>(
        attachParams: UserProvidedParams<T, U>
    ): Promise<U> {

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

    /**
     * https://garronej.github.io/ts-evt/#evtishandleddata 
     * 
     * Test if posting a given event data will have an effect.
     * 
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -There is at least one handler that will be detached
     * if the event data is posted.
     * 
     */
    public isHandled(data: T): boolean {
        return !!this.getHandlers()
            .find(({ matcher }) => !!this.invokeMatcher(matcher, data))
            ;
    }

    /** https://garronej.github.io/ts-evt/#evtgethandlers */
    public getHandlers(): Handler<T, any>[] {
        return [...this.handlers];
    }

    protected onHandlerDetached(handler: Handler<T, any>): void {
        //NOTE: Overwritten by EvtCompat for post detach.
    }

    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    public detach(boundTo?: Bindable): Handler<T, any>[] {

        let detachedHandlers: Handler<T, any>[] = [];

        for (let handler of this.getHandlers()) {

            if (boundTo === undefined || handler.boundTo === boundTo) {
                const wasStillAttached = handler.detach();

                if (!wasStillAttached) {
                    continue;
                }

                detachedHandlers.push(handler);

            }

        }

        return detachedHandlers;

    }

}

