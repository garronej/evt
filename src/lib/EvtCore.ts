import { Polyfill as Map, LightMap } from "minimal-polyfills/dist/lib/Map";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import "minimal-polyfills/dist/lib/Array.prototype.find";
import * as runExclusive from "run-exclusive";
import { Bindable } from "./types/Bindable";
import { Handler } from "./types/Handler";
import { EvtError } from "./types/EvtError";
import { Operator } from "./types/Operator";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import { invokeOperator } from "./util/invokeOperator";
import { encapsulateOpState } from "./util/encapsulateOpState";
import { CtxCore } from "./CtxCore";

/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export class EvtCore<T> {

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
        (opResult: Operator.fλ.Result.Matched<any>) => void
    > = new Map();

    //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
    //occurred after the handler was set. We don't want to waitFor event from the past.
    //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
    private readonly asyncHandlerChronologyMark = new WeakMap<Handler.PropsFromMethodName.Async, number>();

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    private readonly asyncHandlerChronologyExceptionRange = new WeakMap<
        Handler.PropsFromMethodName.Async,
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

    private readonly statelessByStatefulOp = new WeakMap<
        Operator.fλ.Stateful<T, any>,
        Operator.fλ.Stateless<T, any>
    >();

    protected onHandlerAdded(...[]: [Handler<T, any>]): void {
        //NOTE: Overwritten by Evt for post detach.
    }

    private addHandler<U>(
        propsFromArgs: Handler.PropsFromArgs<T, U>,
        propsFromMethodName: Handler.PropsFromMethodName
    ): Handler<T, U> {

        if (Operator.fλ.Stateful.match<T, any>(propsFromArgs.op)) {

            this.statelessByStatefulOp.set(
                propsFromArgs.op,
                encapsulateOpState(propsFromArgs.op)
            );

        }

        const handler: Handler<T, U> = {
            ...propsFromArgs,
            ...propsFromMethodName,
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

                    if (CtxCore.matchHandler(handler)) {
                        CtxCore.__removeHandlerFromCtxCore(handler);
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
                    (opResult: Operator.fλ.Result.Matched<any>) => {

                        const { callback, once } = handler;

                        if (timer !== undefined) {
                            clearTimeout(timer);
                            timer = undefined;
                        }

                        {
                            const detach = Operator.fλ.Result.getDetachArg(opResult);

                            if( typeof detach !== "boolean" ){
                                detach.detach();
                            }else if( detach || once ){
                                handler.detach();
                            }

                        }

                        const [transformedData] = opResult;

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

        if (CtxCore.matchHandler(handler)) {
            CtxCore.__addHandlerToCtxCore(handler, this);
        }

        this.onHandlerAdded(handler);

        return handler;

    }

    public getStatelessOp(op: Operator<T, any>): Operator.Stateless<T, any> {
        return Operator.fλ.Stateful.match(op) ?
            this.statelessByStatefulOp.get(op)! :
            op
    }

    private trace(data: T) {

        if (this.traceId === null) {
            return;
        }

        let message = `(${this.traceId}) `;

        const isExtracted = !!this.handlers.find(
            ({ extract, op }) => (
                extract &&
                !!invokeOperator(this.getStatelessOp(op), data)
            )
        );

        if (isExtracted) {

            message += "extracted ";

        } else {

            const handlerCount = this.handlers
                .filter(
                    ({ extract, op }) => !extract && !!invokeOperator(
                        this.getStatelessOp(op),
                        data
                    )
                )
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



    /** Return isExtracted */
    private postSync(data: T): boolean {

        for (const handler of [...this.handlers]) {

            const { async, op, extract } = handler;

            if (async) {
                continue;
            }

            const opResult = invokeOperator(
                this.getStatelessOp(op),
                data,
                true
            );

            if (Operator.fλ.Result.NotMatched.match(opResult)) {

                const detach = Operator.fλ.Result.getDetachArg(opResult);

                if( typeof detach !== "boolean" ){
                    detach.detach();
                }else if( detach ){
                    handler.detach();
                }

                continue;

            }

            const handlerTrigger = this.handlerTriggers.get(handler);

            //NOTE: Possible if detached while in the loop.
            if (!handlerTrigger) {
                continue;
            }

            handlerTrigger(opResult);

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

                const opResult = invokeOperator(this.getStatelessOp(handler.op), data);

                if (Operator.fλ.Result.NotMatched.match(opResult)) {

                    const detach = Operator.fλ.Result.getDetachArg(opResult);

                    if (typeof detach !== "boolean") {
                        detach.detach();
                    } else if (detach) {
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

                handlerTrigger(opResult);

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

    protected __waitFor<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U> {

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
        attachParams: Handler.PropsFromArgs<T, U>
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
        attachParams: Handler.PropsFromArgs<T, U>
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
        attachParams: Handler.PropsFromArgs<T, U>
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
        attachParams: Handler.PropsFromArgs<T, U>
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
        attachParams: Handler.PropsFromArgs<T, U>
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
        attachParams: Handler.PropsFromArgs<T, U>
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
            .find(({ op }) => !!invokeOperator(
                this.getStatelessOp(op),
                data
            ))
            ;
    }

    /** https://garronej.github.io/ts-evt/#evtgethandlers */
    public getHandlers(): Handler<T, any>[] {
        return [...this.handlers];
    }

    protected onHandlerDetached(handler: Handler<T, any>): void {
        //NOTE: Overwritten by Evt for post detach.
    }

    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    public detach(boundTo?: Bindable): Handler<T, any>[] {

        const detachedHandlers: Handler<T, any>[] = [];

        for (const handler of this.getHandlers()) {

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

