import { Polyfill as Map, LightMap } from "minimal-polyfills/dist/lib/Map";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import "minimal-polyfills/dist/lib/Array.prototype.find";
import * as runExclusive from "run-exclusive";
import { Handler } from "./types/Handler";
import { EvtError } from "./types/EvtError";
import { Operator } from "./types/Operator";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import { invokeOperator } from "./util/invokeOperator";
import { encapsulateOpState } from "./util/encapsulateOpState";
import { Ctx } from "./Ctx";

export const setPostCount = (evt: EvtCore<any>, value: number) =>
    overwriteReadonlyProp(evt, "postCount", value);

/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
export class EvtCore<T> {


    private __maxHandlers = 25;

    /**
     * 
     * By default EventEmitters will print a warning if more than 25 handlers are added for 
     * a particular event. This is a useful default that helps finding memory leaks. 
     * Not all events should be limited to 25 handlers. The evt.setMaxHandlers() method allows the limit to be 
     * modified for this specific EventEmitter instance. 
     * The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.
     * Returns a reference to the EventEmitter, so that calls can be chained.
     * 
     */
    public setMaxHandlers(n: number): this {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    }

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    /** 
     * https://docs.evt.land/api/evt/post
     * 
     * Number of times .post(data) have been called.
     */
    public readonly postCount: number = 0;

    private traceId: string | null = null;
    private traceFormatter!: (data: T) => string;
    private log!: NonNullable<Parameters<typeof EvtCore.prototype.enableTrace>[2]>;

    /** https://docs.evt.land/api/evt/enabletrace */
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
    /** https://docs.evt.land/api/evt/enabletrace */
    public disableTrace() {
        this.traceId = null;
    }


    private readonly handlers: Handler<T, any>[] = [];

    private readonly handlerTriggers: LightMap<
        Handler<T, any>,
        (opResult: Operator.fλ.Result.Matched<any, any>) => void
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
        Operator.fλ.Stateful<T, any, any>,
        Operator.fλ.Stateless<T, any, any>
    >();


    //NOTE: Implemented by Evt
    protected onHandler: ((isAttach: boolean, handler: Handler<T, any>) => void) | undefined = undefined;

    private detachHandler(
        handler: Handler<T, any>,
        wTimer: [NodeJS.Timer | undefined],
        rejectPr: (error: EvtError.Detached) => void
    ) {

        const index = this.handlers.indexOf(handler);

        if (index < 0) {
            return false;
        }

        if (Ctx.__matchHandlerBoundToCtx(handler)) {
            Ctx.__removeHandlerFromCtxCore(handler);
        }


        this.handlers.splice(index, 1);

        this.handlerTriggers.delete(handler);

        if (wTimer[0] !== undefined) {

            clearTimeout(wTimer[0]);

            rejectPr(new EvtError.Detached());

        }

        this.onHandler?.(false, handler);

        return true;

    }

    private static doDetachIfNeeded<U = any>(
        handler: Handler<any, U>,
        opResult: Operator.fλ.Result.Matched<U, any>,
        once: boolean
    ): void;
    private static doDetachIfNeeded(
        handler: Handler<any, any>,
        opResult: Operator.fλ.Result.NotMatched<any>,
    ): void;
    private static doDetachIfNeeded<U = any>(
        handler: Handler<any, U>,
        opResult: Operator.fλ.Result<U, any>,
        once?: boolean
    ): void {

        const detach = Operator.fλ.Result.getDetachArg(opResult);

        if (typeof detach !== "boolean") {
            const [ctx, error, res] = detach;

            if (!!error) {
                ctx.abort(error);
            } else {
                ctx.done(res);
            }
        } else if (detach || !!once) {
            handler.detach();
        }

    }

    private triggerHandler<U>(
        handler: Handler<T, U>,
        wTimer: [NodeJS.Timer | undefined],
        resolvePr: (transformedData: any) => void,
        opResult: Operator.fλ.Result.Matched<any, any>
    ): void {

        const { callback, once } = handler;

        if (wTimer[0] !== undefined) {
            clearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }

        EvtCore.doDetachIfNeeded(handler, opResult, once);

        const [transformedData] = opResult;

        callback?.call(
            this,
            transformedData
        );

        resolvePr(transformedData);

    }

    private addHandler<U>(
        propsFromArgs: Handler.PropsFromArgs<T, U>,
        propsFromMethodName: Handler.PropsFromMethodName
    ): Handler<T, U> {

        if (Operator.fλ.Stateful.match<T, any, any>(propsFromArgs.op)) {

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

                const wTimer: [NodeJS.Timer | undefined] = [undefined];

                if (typeof handler.timeout === "number") {

                    wTimer[0] = setTimeout(() => {

                        wTimer[0] = undefined;

                        handler.detach();

                        reject(new EvtError.Timeout(handler.timeout!));

                    }, handler.timeout);

                }

                (handler.detach as (typeof handler)["detach"]) =
                    () => this.detachHandler(handler, wTimer, reject)
                    ;

                this.handlerTriggers.set(
                    handler,
                    opResult => this.triggerHandler(
                        handler,
                        wTimer,
                        resolve,
                        opResult
                    )
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

        if (
            this.__maxHandlers !== 0 &&
            this.handlers.length % (this.__maxHandlers + 1) === 0
        ) {
            const message = [
                `MaxHandlersExceededWarning: Possible Evt memory leak detected.`,
                `${this.handlers.length} handlers attached${this.traceId ? ` to ${this.traceId}` : ""}.`,
                `Use evt.setMaxHandlers() to increase limit.`
            ].join(" ");

            try {
                console.warn(message);
            } catch{
            }

        }

        if (Ctx.__matchHandlerBoundToCtx(handler)) {
            Ctx.__addHandlerToCtxCore(handler, this);
        }

        this.onHandler?.(true, handler);

        return handler;

    }

    /** https://docs.evt.land/api/evt/getstatelessop */
    public getStatelessOp<U,CtxResult>(op: Operator<T, U, CtxResult>): Operator.Stateless<T, U, CtxResult> {
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
                !!this.getStatelessOp(op)(data)
            )
        );

        if (isExtracted) {

            message += "extracted ";

        } else {

            const handlerCount = this.handlers
                .filter(
                    ({ extract, op }) => !extract &&
                        !!this.getStatelessOp(op)(data)
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

        setPostCount(this, this.postCount + 1);

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

                EvtCore.doDetachIfNeeded(handler, opResult);

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

                const opResult = invokeOperator(
                    this.getStatelessOp(handler.op),
                    data,
                    true
                );

                if (Operator.fλ.Result.NotMatched.match(opResult)) {

                    EvtCore.doDetachIfNeeded(handler, opResult);

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
     * https://docs.evt.land/api/evt/ishandled
     * 
     * Test if posting a given event data will have an effect.
     * 
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -Handlers could be will be detached
     * if the event data is posted.
     * 
     */
    public isHandled(data: T): boolean {
        return !!this.getHandlers()
            .find(
                ({ op }) => !!this.getStatelessOp(op)(data)
            )
            ;
    }

    /** https://docs.evt.land/api/evt/gethandler */
    public getHandlers(): Handler<T, any>[] {
        return [...this.handlers];
    }

    /** 
     * https://docs.evt.land/api/evt/detach
     * 
     * Detach every handlers of the Evt that are bound to the provided context 
     * */
    public detach<CtxResult>(ctx: Ctx<CtxResult>): Handler<T, any, Ctx<CtxResult>>[];
    /** 
     * https://docs.evt.land/api/evt/detach
     * 
     * (unsafe) Detach every handlers from the Evt 
     * */
    public detach(): Handler<T, any>[];
    public detach(ctx?: Ctx<any>): Handler<T, any>[] {

        const detachedHandlers: Handler<T, any>[] = [];

        for (const handler of this.getHandlers()) {

            if (ctx !== undefined && handler.ctx !== ctx) {
                continue;
            }

            const wasStillAttached = handler.detach();

            //NOTE: It should not be possible.
            if (!wasStillAttached) {
                continue;
            }

            detachedHandlers.push(handler);

        }

        return detachedHandlers;

    }

}

