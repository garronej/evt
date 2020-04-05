import "minimal-polyfills/dist/lib/Array.prototype.find";
import { Polyfill as Map, LightMap } from "minimal-polyfills/dist/lib/Map";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import * as runExclusive from "run-exclusive";
import { EvtError } from "./types/EvtError";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import { encapsulateOpState } from "./util/encapsulateOpState";
import { typeGuard } from "../tools/typeSafety/typeGuard";
import { Operator } from "./types/Operator";
import { invokeOperator } from "./util/invokeOperator";
import { merge } from "./Evt.merge";
import { from } from "./Evt.from";
import { getCtxFactory } from "./Evt.getCtx";
import { useEffect } from "./Evt.useEffect";
import { parseOverloadsArgs, matchAll } from "./Evt.parseOverloadsArgs";
import { LazyEvtFactory } from "./util/LazyEvtFactory";
import { importProxy } from "./importProxy";
import /*type*/ { Handler } from "./types/Handler";
import { defineAccessors } from "../tools/defineAccessors";
import { id } from "../tools/typeSafety/id";
import { Deferred } from "../tools/Deferred";

type Ctx<Result> = import("./Ctx").Ctx<Result>;
type VoidCtx = import("./Ctx").VoidCtx;
type CtxLike<Result> = import("./Ctx").CtxLike<Result>;

export interface EvtLike<T> {
    isHandled(data?: T): void;
}

/** https://docs.evt.land/api/evt */
export class Evt<T> implements EvtLike<any/*We can't use T, TypeScript bug ?*/>{

    /** 
     * https://docs.evt.land/api/evt/newctx
     * 
     * return a new Ctx instance
     * */
    public static newCtx(): VoidCtx;
    public static newCtx<T>(): Ctx<T>;
    public static newCtx(): Ctx<any> { return new importProxy.Ctx(); }

    /** 
     * https://docs.evt.land/api/evt/getctx
     * 
     * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
     * No strong reference to the object is created
     * when the object is no longer referenced it's associated Ctx will be freed from memory.
     */
    public static readonly getCtx = getCtxFactory();

    /** https://docs.evt.land/api/evt/merge */
    public static readonly merge = merge;

    /** https://docs.evt.land/api/evt/from */
    public static readonly from = from;

    /** https://docs.evt.land/api/evt/use-effect */
    public static readonly useEffect = useEffect;

    private static readonly parseOverloadsArgs = parseOverloadsArgs;

    /** https://docs.evt.land/api/evt/evtattachdetach */
    declare public readonly evtAttach: Evt<Handler<T, any>>;

    /** https://docs.evt.land/api/evt/evtattachdetach */
    declare public readonly evtDetach: Evt<Handler<T, any>>;

    private onHandler(isAttach: boolean, handler: Handler<T, any>): void {
        isAttach ?
            this.lazyEvtAttachFactory.post(handler) :
            this.lazyEvtDetachFactory.post(handler)
            ;
    }

    private readonly lazyEvtAttachFactory = new LazyEvtFactory<Handler<T, any>>();
    private readonly lazyEvtDetachFactory = new LazyEvtFactory<Handler<T, any>>();

    private static __1: void = (() => {

        if (false) { Evt.__1 }

        defineAccessors(
            Evt.prototype,
            "evtAttach",
            {
                "get": function () {
                    return id<Evt<any>>(this).lazyEvtAttachFactory.getEvt();
                }
            }
        );

        defineAccessors(
            Evt.prototype,
            "evtDetach",
            {
                "get": function () {
                    return id<Evt<any>>(this).lazyEvtDetachFactory.getEvt();
                }
            }
        );

    })();


    /** https://docs.evt.land/api/evt/post */
    public postAsyncOnceHandled(data: T): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }

        let resolvePr: (postCount: number) => void;
        const pr = new Promise<number>(resolve => resolvePr = resolve);

        this.evtAttach.attachOnce(
            ({ op }) => !!invokeOperator(this.getStatelessOp(op), data),
            () => Promise.resolve().then(() => resolvePr(this.post(data)))
        );

        return pr;

    }

    private static __defaultMaxHandlers = 25;


    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    public static setDefaultMaxHandlers(n: number) {
        this.__defaultMaxHandlers = isFinite(n) ? n : 0;
    }

    private __maxHandlers: undefined | number = undefined;

    /** https://docs.evt.land/api/evt/setmaxhandlers */
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
    private log!: Exclude<Parameters<typeof Evt.prototype.enableTrace>[0]["log"], false>;

    /** https://docs.evt.land/api/evt/enabletrace */
    public enableTrace(
        params: {
            id: string,
            formatter?: (data: T) => string,
            log?: ((message?: any, ...optionalParams: any[]) => void) | false
        }
        //NOTE: Not typeof console.log as we don't want to expose types from node
    ) {

        const { id, formatter, log } = params;

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

        this.log =
            log === undefined ?
                ((...inputs) => console.log(...inputs)) :
                log === false ? undefined : log
            ;

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
    declare private readonly asyncHandlerChronologyMark: WeakMap<Handler.PropsFromMethodName.Async, number>;
    declare private __asyncHandlerChronologyMark: (typeof Evt.prototype.asyncHandlerChronologyMark) | undefined;

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    declare private readonly asyncHandlerChronologyExceptionRange: WeakMap<
        Handler.PropsFromMethodName.Async,
        { lowerMark: number; upperMark: number; }
    >;
    declare private __asyncHandlerChronologyExceptionRange: (typeof Evt.prototype.asyncHandlerChronologyExceptionRange) | undefined;

    declare private readonly statelessByStatefulOp: WeakMap<
        Operator.fλ.Stateful<T, any, any>,
        Operator.fλ.Stateless<T, any, any>
    >;
    declare private __statelessByStatefulOp: (typeof Evt.prototype.statelessByStatefulOp) | undefined;

    private static __2: void = (() => {

        if (false) { Evt.__2; }

        Object.defineProperties(Evt.prototype,
            ([
                "__asyncHandlerChronologyMark",
                "__asyncHandlerChronologyExceptionRange",
                "__statelessByStatefulOp"
            ] as const).map(key => [
                key.substr(2),
                {
                    "get": function () {

                        const self: Evt<any> = this;

                        if (self[key] === undefined) {
                            self[key] = new WeakMap<any, any>();
                        }

                        return self[key];

                    }
                }
            ] as const).reduce<any>((prev, [key, obj]) => ({ ...prev, [key]: obj }), {})
        );


    })();





    /*
    NOTE: Used as Date.now() would be used to compare if an event is anterior 
    or posterior to an other. We don't use Date.now() because two call within
    less than a ms will return the same value unlike this function.
    */
    private __currentChronologyMark = 0;
    private getChronologyMark() {
        return this.__currentChronologyMark++;
    }


    private asyncHandlerCount: number = 0;


    private detachHandler(
        handler: Handler<T, any>,
        wTimer: [NodeJS.Timer | undefined],
        rejectPr: (error: EvtError.Detached) => void
    ) {

        const index = this.handlers.indexOf(handler);

        if (index < 0) {
            return false;
        }

        if (typeGuard<Handler<T, any, CtxLike<any>>>(handler, !!handler.ctx)) {
            handler.ctx.zz__removeHandler(handler);
        }


        this.handlers.splice(index, 1);

        if (handler.async) {
            this.asyncHandlerCount--;
        }

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
        resolvePr: ((transformedData: any) => void) | undefined,
        opResult: Operator.fλ.Result.Matched<any, any>
    ): void {

        const { callback, once } = handler;

        if (wTimer[0] !== undefined) {
            clearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }

        Evt.doDetachIfNeeded(handler, opResult, once);

        const [transformedData] = opResult;

        callback?.call(
            this,
            transformedData
        );

        resolvePr?.(transformedData);

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

        const d = new Deferred<U>();

        const wTimer: [NodeJS.Timer | undefined] = [undefined];

        const handler: Handler<T, U> = {
            ...propsFromArgs,
            ...propsFromMethodName,
            "detach": () => this.detachHandler(handler, wTimer, d.reject),
            "promise": d.pr
        };

        if (typeof handler.timeout === "number") {

            wTimer[0] = setTimeout(() => {

                wTimer[0] = undefined;

                handler.detach();

                d.reject(new EvtError.Timeout(handler.timeout!));

            }, handler.timeout);

        }

        this.handlerTriggers.set(
            handler,
            opResult => this.triggerHandler(
                handler,
                wTimer,
                d.isPending ? d.resolve : undefined,
                opResult
            )
        );

        if (handler.async) {

            this.asyncHandlerChronologyMark.set(
                handler,
                this.getChronologyMark()
            );

        }

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

        if (handler.async) {
            this.asyncHandlerCount++;
        }

        this.checkForPotentialMemoryLeak();

        if (typeGuard<Handler<T, U, CtxLike<any>>>(handler, !!handler.ctx)) {
            handler.ctx.zz__addHandler(handler, this);
        }

        this.onHandler(true, handler);

        return handler;

    }

    private checkForPotentialMemoryLeak(): void {

        const maxHandlers = this.__maxHandlers ?? Evt.__defaultMaxHandlers;

        if (
            maxHandlers === 0 ||
            this.handlers.length % (maxHandlers + 1) !== 0) {
            return;
        }

        let message = [
            `MaxHandlersExceededWarning: Possible Evt memory leak detected.`,
            `${this.handlers.length} handlers attached${this.traceId ? ` to "${this.traceId}"` : ""}.\n`,
            `Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\n`,
            `Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to ${Evt.__defaultMaxHandlers}.\n`,
        ].join("");

        const map = new Map<string, number>();

        this.getHandlers()
            .map(({ ctx, async, once, prepend, extract, op, callback }) => ({
                "hasCtx": !!ctx,
                once,
                prepend,
                extract,
                "isWaitFor": async,
                ...(op === matchAll ? {} : { "op": op.toString() }),
                ...(!callback ? {} : { "callback": callback.toString() })
            }))
            .map(obj =>
                "{\n" + Object.keys(obj)
                    .map(key => `  ${key}: ${(obj as any)[key]}`)
                    .join(",\n") + "\n}"
            )
            .forEach(str => map.set(str, (map.get(str) ?? 0) + 1))
            ;

        message += "\n" + Array.from(map.keys())
            .map(str => `${map.get(str)} handler${map.get(str) === 1 ? "" : "s"} like:\n${str}`)
            .join("\n") + "\n";

        if (this.traceId === null) {

            message += "\n" + [
                `To validate the identify of the Evt instance that is triggering this warning you can call`,
                `Evt.prototype.enableTrace({ "id": "My evt id", "log": false }) on the Evt that you suspect.\n`
            ].join(" ");

        }

        try {
            console.warn(message);
        } catch{
        }

    }

    /** https://docs.evt.land/api/evt/getstatelessop */
    public getStatelessOp<U, CtxResult>(op: Operator<T, U, CtxResult>): Operator.Stateless<T, U, CtxResult> {
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

            message += `${handlerCount} handler${(handlerCount > 1) ? "s" : ""}, `;

        }

        this.log?.(message + this.traceFormatter(data));

    }

    //private test_pr: Promise<void> | undefined = undefined;


    /** 
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     * 
     * Returns post count 
     * */
    public post(data: T): number {

        this.trace(data);

        overwriteReadonlyProp(this, "postCount", this.postCount + 1);

        //NOTE: Must be before postSync.
        const postChronologyMark = this.getChronologyMark();

        const isExtracted = this.postSync(data);

        if (!isExtracted && (!!this.__postAsync || this.asyncHandlerCount !== 0)) {

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

                Evt.doDetachIfNeeded(handler, opResult);

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

    private __postAsyncFactory() {
        return runExclusive.buildMethodCb(
            (data: T, postChronologyMark: number, releaseLock?) => {

                if (this.asyncHandlerCount === 0) {
                    releaseLock();
                    return;
                }

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

                        Evt.doDetachIfNeeded(handler, opResult);

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
    }

    declare private readonly postAsync: (data: T, postChronologyMark: number) => void;
    declare private __postAsync: typeof Evt.prototype.postAsync | undefined;

    private static __3: void = (() => {

        if (false) { Evt.__3; }

        Object.defineProperty(Evt.prototype, "postAsync", {
            "get": function () {
                const self: Evt<any> = this;
                if (self.__postAsync === undefined) {
                    self.__postAsync = self.__postAsyncFactory();
                }

                return self.__postAsync;
            }
        });


    })();



    private __waitFor<U>(attachParams: Handler.PropsFromArgs<T, U>): Promise<U> {

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

    private __attach<U>(
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

    private __attachExtract<U>(
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

    private __attachPrepend<U>(
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

    private __attachOnce<U>(
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

    private __attachOncePrepend<U>(
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

    private __attachOnceExtract<U>(
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
    public detach<CtxResult>(ctx: CtxLike<CtxResult>): Handler<T, any, CtxLike<CtxResult>>[];
    /** 
     * https://docs.evt.land/api/evt/detach
     * 
     * (unsafe) Detach every handlers from the Evt 
     * */
    public detach(): Handler<T, any>[];
    public detach(ctx?: CtxLike<any>): Handler<T, any>[] {

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













    /** https://docs.evt.land/api/evt/pipe */
    public pipe(): Evt<T>;

    public pipe<U, CtxResult>(
        op: Operator.fλ<T, U, CtxResult>
    ): Evt<U>;
    public pipe<U extends T>(
        op: (data: T) => data is U
    ): Evt<U>;
    public pipe(
        op: (data: T) => boolean
    ): Evt<T>;

    public pipe(ctx: CtxLike<any>): Evt<T>;

    public pipe<U, CtxResult>(
        ctx: CtxLike<any>,
        op: Operator.fλ<T, U, CtxResult>
    ): Evt<U>;
    public pipe<U extends T>(
        ctx: CtxLike<any>,
        op: (data: T) => data is U
    ): Evt<U>;
    public pipe(
        ctx: CtxLike<any>,
        op: (data: T) => boolean
    ): Evt<T>;

    public pipe<B, C, CtxResultOp1, CtxResultOp2>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>
    ): Evt<C>;
    public pipe<B, C extends B, CtxResult>(
        op1: Operator.fλ<T, B, CtxResult>,
        op2: (data: B) => data is C
    ): Evt<C>;
    public pipe<B, CtxResult>(
        op1: Operator.fλ<T, B, CtxResult>,
        op2: (data: B) => boolean
    ): Evt<B>;
    public pipe<B extends T, C, CtxResult>(
        op1: (data: T) => data is B,
        op2: Operator.fλ<B, C, CtxResult>
    ): Evt<B>;
    public pipe<B, CtxResult>(
        op1: (data: T) => boolean,
        op2: Operator.fλ<T, B, CtxResult>
    ): Evt<B>;
    public pipe<B extends T, C extends B>(
        op1: (data: T) => data is B,
        op2: (data: B) => data is C
    ): Evt<C>;
    public pipe<B extends T>(
        op1: (data: T) => data is B,
        op2: (data: B) => boolean
    ): Evt<B>;
    public pipe<B extends T>(
        op1: (data: T) => boolean,
        op2: (data: T) => data is B
    ): Evt<B>;
    public pipe<T>(
        op1: (data: T) => boolean,
        op2: (data: T) => boolean
    ): Evt<T>;


    public pipe<B, C, D, CtxResultOp1, CtxResultOp2, CtxResultOp3>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>
    ): Evt<D>;

    public pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>
    ): Evt<E>;

    public pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>
    ): Evt<E>;

    public pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>,
        op5: Operator.fλ<E, F, CtxResultOp5>
    ): Evt<F>;


    public pipe<B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
        op1: Operator<T, B, CtxResultOp2>,
        op2: Operator<B, C, CtxResultOp2>
    ): Evt<C>;

    public pipe<B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>
    ): Evt<D>;

    public pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>,
        op4: Operator<D, E, CtxResultOp4>
    ): Evt<E>;

    public pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>,
        op4: Operator<D, E, CtxResultOp4>,
        op5: Operator<E, F, CtxResultOp5>
    ): Evt<F>;

    public pipe(
        ...ops: [
            Operator<T, any, any>,
            ...Operator<any, any, any>[]
        ]
    ): Evt<any>;

    public pipe<T>(
        ...ops: [
            Operator<T, any, any>,
            ...Operator<any, any, any>[]
        ]
    ): Evt<any>;

    public pipe(...inputs: any[]): Evt<any> {

        const evtDelegate = new Evt<any>();

        this.__attach(
            {
                ...Evt.parseOverloadsArgs<T>(inputs, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            }
        );

        return evtDelegate;

    }


    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor<U, CtxResult>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout?: number
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * op - fλ
     * 
     * timeout?
     */
    public waitFor<U, CtxResult>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        timeout?: number
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
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
     * https://docs.evt.land/api/evt/waitfor
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
     * https://docs.evt.land/api/evt/waitfor
     * 
     * ctx
     * 
     * timeout?
     */
    public waitFor(
        ctx: CtxLike<any>,
        timeout?: number
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     * 
     * timeout?
     */
    public waitFor(
        timeout?: number
    ): Promise<T>;
    public waitFor(...inputs: any[]) {
        return this.__waitFor(Evt.parseOverloadsArgs<T>(inputs, "waitFor"));
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attach<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attach<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attach<U, R>(
        op: Operator.fλ<T, U, R>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attach<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attach(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attach(
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attach(
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * callback 
     */
    public attach(
        callback: (data: T) => void
    ): Promise<T>;
    public attach(...inputs: any[]) {
        return this.__attach(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }




    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOnce<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnce<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnce<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }






    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnce(
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOnce(
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOnce(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnce(...inputs: any[]) {
        return this.__attachOnce(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }





    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U, CtxResult>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachExtract<U, CtxResult>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<any>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachExtract<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachExtract<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachExtract(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
        return this.__attachExtract(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }











    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachPrepend<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        ctx: CtxLike<any>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachPrepend<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachPrepend<U, CtxResult = any>(
        op: Operator.fλ<T, U, CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
    }









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;

    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachPrepend(
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachPrepend(
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachPrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachPrepend(...inputs: any[]) {
        return this.__attachPrepend(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOncePrepend<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOncePrepend<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOncePrepend<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    public $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
    }









    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOncePrepend(
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOncePrepend(
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOncePrepend(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOncePrepend(...inputs: any[]) {
        return this.__attachOncePrepend(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }








    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * ctx
     * 
     * callback
     */
    public $attachOnceExtract<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        ctx: CtxLike<any>,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * timeout
     * 
     * callback
     */
    public $attachOnceExtract<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        timeout: number,
        callback: (transformedData: U) => void
    ): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - fλ
     * 
     * callback
     */
    public $attachOnceExtract<U, CtxResult = any>(
        op: Operator.fλ.Stateless<T, U, CtxResult>,
        callback: (transformedData: U) => void
    ): Promise<U>;

    public $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }







    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * timeout
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Type guard
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract<Q extends T>(
        op: (data: T) => data is Q,
        ctx: CtxLike<any>,
        callback: (data: Q) => void
    ): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     * 
     * op - Filter
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract(
        op: (data: T) => boolean,
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * timeout
     */
    public attachOnceExtract(
        ctx: CtxLike<any>,
        timeout: number,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * ctx
     * 
     * callback
     */
    public attachOnceExtract(
        ctx: CtxLike<any>,
        callback: (data: T) => void
    ): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
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
     * https://docs.evt.land/api/evt/attach
     * 
     * callback
     */
    public attachOnceExtract(
        callback: (data: T) => void
    ): Promise<T>;
    public attachOnceExtract(...inputs: any[]) {
        return this.__attachOnceExtract(Evt.parseOverloadsArgs<T>(inputs, "attach*"));
    }


}

importProxy.Evt = Evt;


/** https://docs.evt.land/api/voidevt */
export class VoidEvt extends Evt<void> {

    public post(): number {
        return super.post(undefined);
    }

    public async postAsyncOnceHandled() {
        return super.postAsyncOnceHandled(undefined);
    }

}
