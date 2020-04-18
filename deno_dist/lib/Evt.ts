import "https://raw.githubusercontent.com/garronej/minimal_polyfills/v1.0.8/deno_dist/lib/Array.prototype.find.ts";
import { importProxy } from "./importProxy.ts";
import { create } from "./Evt.create.ts";
import { getCtxFactory } from "./Evt.getCtx.ts";
import { factorize } from "./Evt.factorize.ts";
import { merge } from "./Evt.merge.ts";
import { from } from "./Evt.from.ts";
import { useEffect } from "./Evt.useEffect.ts";
import { asPostable } from "./Evt.asPostable.ts";
import { asNonPostable } from "./Evt.asNonPostable.ts";
import { parsePropsFromArgs, matchAll } from "./Evt.parsePropsFromArgs.ts";
import { newCtx } from "./Evt.newCtx.ts";
import { LazyEvt } from "./LazyEvt.ts";
import { defineAccessors } from "../tools/typeSafety/defineAccessors.ts";
import { invokeOperator } from "./util/invokeOperator.ts";
import { Polyfill as Map, LightMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v1.0.8/deno_dist/lib/Map.ts";
import { Polyfill as WeakMap } from "https://raw.githubusercontent.com/garronej/minimal_polyfills/v1.0.8/deno_dist/lib/WeakMap.ts";
import * as runExclusive from "https://raw.githubusercontent.com/garronej/run_exclusive/v2.1.12/mod.ts";
import { EvtError } from "./types/EvtError.ts";
import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp.ts";
import { typeGuard } from "../tools/typeSafety/typeGuard.ts";
import { encapsulateOpState } from "./util/encapsulateOpState.ts";
import { Deferred } from "../tools/Deferred.ts";
import { loosenType } from "./Evt.loosenType.ts";
import { CtxLike } from "./types/interfaces/CtxLike.ts";

import { Handler } from "./types/Handler.ts";
import { Operator } from "./types/Operator.ts";
type NonPostableEvt<T> = import("./types/interfaces/index.ts").NonPostableEvt<T>;
type StatefulEvt<T> = import("./types/interfaces/index.ts").StatefulEvt<T>;

//NOTE: Deno can't use NodeJS type def ( obviously )
type Timer= { _timerBrand: any; };
const safeSetTimeout = (callback: () => void, ms: number): Timer => setTimeout(callback, ms) as any;
const safeClearTimeout = (timer: Timer): void => clearTimeout(timer as any);

/** https://docs.evt.land/api/evt */
export type Evt<T> = import("./types/interfaces/index.ts").Evt<T>;

class EvtImpl<T> implements Evt<T> {

    static readonly create = create;

    static readonly newCtx = newCtx;

    static readonly merge = merge;

    static readonly from = from;

    static readonly useEffect = useEffect;

    static readonly getCtx = getCtxFactory();

    static readonly loosenType = loosenType;

    static readonly factorize = factorize;

    static readonly asPostable = asPostable;

    static readonly asNonPostable= asNonPostable;

    private static __defaultMaxHandlers = 25;

    static setDefaultMaxHandlers(n: number): void {
        this.__defaultMaxHandlers = isFinite(n) ? n : 0;
    }

    toStateful(p1: any,p2?: CtxLike): StatefulEvt<any> {

        const isP1Ctx= CtxLike.match(p1);

        const initialValue: any = isP1Ctx ? undefined : p1;
        const ctx= p2 ?? ( isP1Ctx ? p1 : undefined );

        const out = new importProxy.StatefulEvt<any>(initialValue);

        const callback = (data: T) => out.post(data);

        if (!!ctx) {
            this.attach(ctx, callback);
        } else {
            this.attach(callback);
        }

        return out;

    }

    declare readonly evtAttach: Evt<Handler<T, any>>;
    declare readonly evtDetach: Evt<Handler<T, any>>;

    private readonly lazyEvtAttach = new LazyEvt<Handler<T, any>>();
    private readonly lazyEvtDetach = new LazyEvt<Handler<T, any>>();

    private static __1: void = (() => {

        if (false) { EvtImpl.__1 }

        defineAccessors(
            EvtImpl.prototype,
            "evtAttach",
            {
                "get": function (this: EvtImpl<any>) {
                    return this.lazyEvtAttach.evt;
                }
            }
        );

        defineAccessors(
            EvtImpl.prototype,
            "evtDetach",
            {
                "get": function (this: EvtImpl<any>) {
                    return this.lazyEvtDetach.evt;
                }
            }
        );

    })();

    private __maxHandlers: undefined | number = undefined;

    setMaxHandlers(n: number): this {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    }

    readonly postCount: number = 0;

    private traceId: string | null = null;
    private traceFormatter!: (data: T) => string;
    private log!: Exclude<Parameters<NonPostableEvt<any>["enableTrace"]>[0]["log"], false>;

    enableTrace(
        params: {
            id: string,
            formatter?: (data: T) => string,
            log?: ((message?: any, ...optionalParams: any[]) => void) | false
        }
        //NOTE: Not typeof console.log as we don't want to expose types from node
    ): void {

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

    disableTrace(): this {
        this.traceId = null;
        return this;
    }

    private readonly handlers: Handler<T, any>[] = [];

    private readonly handlerTriggers: LightMap<
        Handler<T, any>,
        (opResult: Operator.fλ.Result.Matched<any, any>) => void
    > = new Map();

    //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
    //occurred after the handler was set. We don't want to waitFor event from the past.
    //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
    declare private readonly asyncHandlerChronologyMark: WeakMap<
        Handler.PropsFromMethodName.Async,
        number
    >;
    declare private __asyncHandlerChronologyMark:
        (typeof EvtImpl.prototype.asyncHandlerChronologyMark) | undefined;

    //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
    //do so we have to handle the case where multiple event would be posted synchronously.
    declare private readonly asyncHandlerChronologyExceptionRange: WeakMap<
        Handler.PropsFromMethodName.Async,
        { lowerMark: number; upperMark: number; }
    >;
    declare private __asyncHandlerChronologyExceptionRange:
        (typeof EvtImpl.prototype.asyncHandlerChronologyExceptionRange) | undefined;

    declare private readonly statelessByStatefulOp: WeakMap<
        Operator.fλ.Stateful<T, any, any>,
        Operator.fλ.Stateless<T, any, any>
    >;
    declare private __statelessByStatefulOp:
        (typeof EvtImpl.prototype.statelessByStatefulOp) | undefined;

    private static __2: void = (() => {

        if (false) { EvtImpl.__2; }

        Object.defineProperties(EvtImpl.prototype,
            ([
                "__asyncHandlerChronologyMark",
                "__asyncHandlerChronologyExceptionRange",
                "__statelessByStatefulOp"
            ] as const).map(key => [
                key.substr(2),
                {
                    "get": function (this: EvtImpl<any>) {

                        if (this[key] === undefined) {
                            this[key] = new WeakMap<any, any>();
                        }

                        return this[key];

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
        wTimer: [Timer | undefined],
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

            safeClearTimeout(wTimer[0]);

            rejectPr(new EvtError.Detached());

        }

        this.lazyEvtDetach.post(handler);

        return true;

    }


    private triggerHandler<U>(
        handler: Handler<T, U>,
        wTimer: [Timer | undefined],
        resolvePr: ((transformedData: any) => void) | undefined,
        opResult: Operator.fλ.Result.Matched<any, any>
    ): void {

        const { callback, once } = handler;

        if (wTimer[0] !== undefined) {
            safeClearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }

        EvtImpl.doDetachIfNeeded(handler, opResult, once);

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

        const wTimer: [Timer | undefined] = [undefined];

        const handler: Handler<T, U> = {
            ...propsFromArgs,
            ...propsFromMethodName,
            "detach": () => this.detachHandler(handler, wTimer, d.reject),
            "promise": d.pr
        };

        if (typeof handler.timeout === "number") {

            wTimer[0] = safeSetTimeout(() => {

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

        this.lazyEvtAttach.post(handler);

        return handler;

    }



    private checkForPotentialMemoryLeak(): void {

        const maxHandlers = this.__maxHandlers ?? EvtImpl.__defaultMaxHandlers;

        if (
            maxHandlers === 0 ||
            this.handlers.length % (maxHandlers + 1) !== 0) {
            return;
        }

        let message = [
            `MaxHandlersExceededWarning: Possible Evt memory leak detected.`,
            `${this.handlers.length} handlers attached${this.traceId ? ` to "${this.traceId}"` : ""}.\n`,
            `Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\n`,
            `Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to ${EvtImpl.__defaultMaxHandlers}.\n`,
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

    getStatelessOp<U, CtxResult>(op: Operator<T, U, CtxResult>): Operator.Stateless<T, U, CtxResult> {
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

                EvtImpl.doDetachIfNeeded(handler, opResult);

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

    private postAsyncFactory() {
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

                        EvtImpl.doDetachIfNeeded(handler, opResult);

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

    declare private postAsync: ((data: T, postChronologyMark: number) => void) | undefined;

    private static readonly propsFormMethodNames: Record<
        "waitFor" | "attach" | "attachExtract" | "attachPrepend" | "attachOnce" |
        "attachOncePrepend" | "attachOnceExtract"
        ,
        Handler.PropsFromMethodName
    > = {
            "waitFor": { "async": true, "extract": false, "once": true, "prepend": false },
            "attach": { "async": false, "extract": false, "once": false, "prepend": false },
            "attachExtract": { "async": false, "extract": true, "once": false, "prepend": true },
            "attachPrepend": { "async": false, "extract": false, "once": false, "prepend": true },
            "attachOnce": { "async": false, "extract": false, "once": true, "prepend": false },
            "attachOncePrepend": { "async": false, "extract": false, "once": true, "prepend": true },
            "attachOnceExtract": { "async": false, "extract": true, "once": true, "prepend": true }
        };

    isHandled(data: T): boolean {
        return !!this.getHandlers()
            .find(({ op }) => !!this.getStatelessOp(op)(data))
            ;
    }

    getHandlers(): Handler<T, any>[] {
        return [...this.handlers];
    }

    detach(ctx?: CtxLike<any>): Handler<T, any, any>[] {

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

    pipe(...args: any[]): Evt<any> {

        const evtDelegate = new EvtImpl<any>();

        this.addHandler(
            {
                ...parsePropsFromArgs<T>(args, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            },
            EvtImpl.propsFormMethodNames.attach
        );

        return evtDelegate;

    }

    waitFor(...args: any[]): Promise<any> {
        return this.addHandler(
            parsePropsFromArgs<T>(args, "waitFor"),
            EvtImpl.propsFormMethodNames.waitFor
        ).promise;
    }

    $attach(...inputs: any[]) {
        return (this.attach as any)(...inputs);
    }

    attach(...args: any[]) {
        return this.__attachX(args, "attach");
    }

    $attachOnce(...inputs: any[]) {
        return (this.attachOnce as any)(...inputs);
    }

    attachOnce(...args: any[]) {
        return this.__attachX(args, "attachOnce");
    }

    $attachExtract(...inputs: any[]) {
        return (this.attachExtract as any)(...inputs);
    }

    attachExtract(...args: any[]) {
        return this.__attachX(args, "attachExtract");
    }

    $attachPrepend(...inputs: any[]) {
        return (this.attachPrepend as any)(...inputs);
    }

    attachPrepend(...args: any[]) {
        return this.__attachX(args, "attachPrepend");
    }

    $attachOncePrepend(...inputs: any[]) {
        return (this.attachOncePrepend as any)(...inputs);
    }

    attachOncePrepend(...args: any[]) {
        return this.__attachX(args, "attachOncePrepend");
    }

    $attachOnceExtract(...inputs: any[]) {
        return (this.attachOnceExtract as any)(...inputs);
    }

    attachOnceExtract(...args: any[]) {
        return this.__attachX(args, "attachOnceExtract");
    }

    private __attachX(
        args: any[], 
        methodName: keyof typeof EvtImpl.propsFormMethodNames
    ): any {

        const propsFromArgs = parsePropsFromArgs<T>(args, "attach*");

        const handler = this.addHandler(
            propsFromArgs,
            EvtImpl.propsFormMethodNames[methodName]
        );

        return  propsFromArgs.timeout === undefined ? 
            this : 
            handler.promise
            ;

    }

    postAsyncOnceHandled(data: T): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }

        const d = new Deferred<number>();

        this.evtAttach.attachOnce(
            ({ op }) => !!invokeOperator(this.getStatelessOp(op), data),
            () => Promise.resolve().then(() => d.resolve(this.post(data)))
        );

        return d.pr;

    }

    post(data: T): number {

        this.trace(data);

        overwriteReadonlyProp(this, "postCount", this.postCount + 1);

        //NOTE: Must be before postSync.
        const postChronologyMark = this.getChronologyMark();

        const isExtracted = this.postSync(data);

        if (isExtracted) {
            return this.postCount;
        }

        if (this.postAsync === undefined) {

            if (this.asyncHandlerCount === 0) {
                return this.postCount;
            }

            this.postAsync = this.postAsyncFactory();

        }

        this.postAsync(
            data,
            postChronologyMark
        );

        return this.postCount;

    }

}

namespace EvtImpl {

    //NOTE: For some reason can't set it as static method so we put it here
    export function doDetachIfNeeded<U = any>(
        handler: Handler<any, U>,
        opResult: Operator.fλ.Result.Matched<U, any>,
        once: boolean
    ): void;
    export function doDetachIfNeeded(
        handler: Handler<any, any>,
        opResult: Operator.fλ.Result.NotMatched<any>,
    ): void;
    export function doDetachIfNeeded<U = any>(
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

}

export const Evt: {
    new <T>(): Evt<T>;
    readonly prototype: Evt<any>;

    readonly create: typeof create;

    readonly newCtx: typeof newCtx;

    readonly merge: typeof merge;

    readonly from: typeof from;

    readonly useEffect: typeof useEffect;

    readonly getCtx: ReturnType<typeof getCtxFactory>;

    readonly loosenType: typeof loosenType;

    readonly factorize: typeof factorize;

    readonly asPostable: typeof asPostable;

    readonly asNonPostable: typeof asNonPostable;

    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    setDefaultMaxHandlers(n: number): void;

} = EvtImpl;

try{ overwriteReadonlyProp(Evt as any, "name", "Evt"); }catch{}

importProxy.Evt = Evt;

