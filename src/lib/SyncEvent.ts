import { EventEmitter as NodeJS_EventEmitter } from "events";
import * as runExclusive from "run-exclusive";

export interface Postable<T> {
    post(data: T): void;
}

function matchPostable(o: any): o is Postable<any> {
    return o instanceof Object && typeof o.post === "function";
}

export function isCallable(o: any): boolean {

    if( typeof o !== "function" ) return false;

    let prototype = o["prototype"];

    if( !prototype ) return true;

    let methods= Object.getOwnPropertyNames(prototype);

    if( methods.length !== 1 ) return false;

    let name: string = o.name;

    if( !name ) return true;

    if( name[0].toUpperCase() === name[0] ) return false;

    return true;

}

/** Way of defining Object so it does not match number and string */
export type Object_ = { [k: string]: any };

/** Anything but a number, a callable function (i.e. not a constructor), undefined  or null */
export type Bindable = Object_ | string;

export type AttachParams<T> = {
    matcher(data: T): boolean;
    boundTo: Bindable;
    handler(data: T): any;
}

const matchAll = () => true;

export class SyncEvent<T> {

    public static readonly stopPropagation = [];

    public postCount = 0;

    /** Posted when an handler is attached to the event handler */
    public readonly evtAttach: SyncEvent<
    "attach" | "attachPrepend" | "attachOnce" | "attachOncePrepend" | "waitFor" | "attachExtract" | "attachOnceExtract" | "waitForExtract"
    >;

    private readonly callbackHandlers: {
        matcher: (data: T) => boolean;
        boundTo: Bindable;
        timer: NodeJS.Timer | undefined;
        handler: (data: T) => any;
        once: boolean;
        extract: boolean;
    }[] = [];

    private readonly promiseHandlers: {
        matcher: (data: T) => boolean;
        timer: NodeJS.Timer | undefined;
        resolve: (data: T) => any;
        extract: boolean;
    }[] = [];

    constructor() {

        if (arguments.length === 0) {
            this.evtAttach = new (SyncEvent as any)("no recursion");
        }

    }

    public stopWaiting(): void {

        for (let { timer } of this.promiseHandlers)
            if (timer) clearTimeout(timer);

        this.promiseHandlers.splice(0, this.promiseHandlers.length)

    }

    public getHandlerCount(): number {
        return this.callbackHandlers.length + this.promiseHandlers.length;
    }

    public getWaiterCount(): number {
        return this.promiseHandlers.length;
    }

    public getPermanentHandlerCount(): number {
        return this.callbackHandlers.filter(({ once }) => !once).length;
    }

    public getOnceHandlerCount(): number {
        return this.callbackHandlers.length - this.getPermanentHandlerCount();
    }


    public createProxy<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    public createProxy(matcher?: (data: T) => boolean): SyncEvent<T>;
    public createProxy(matcher?: (data: T) => boolean): SyncEvent<any> {

        return this.__createProxy__(matcher, false);

    }

    public createProxyExtract<Q extends T>(matcher: (data: T) => data is Q): SyncEvent<Q>;
    public createProxyExtract(matcher?: (data: T) => boolean): SyncEvent<T>;
    public createProxyExtract(matcher?: (data: T) => boolean): SyncEvent<any> {

        return this.__createProxy__(matcher, true);

    }

    private __createProxy__(
        matcher: ((data: T) => boolean) | undefined,
        extract: boolean
    ): SyncEvent<any> {

        matcher = matcher || matchAll;

        let evt = new SyncEvent<any>();

        if (extract) this.attachExtract(matcher, evt);
        else this.attach(matcher, evt);

        return evt;

    }

    private readWaitForParams(inputs: any[]) {

        inputs = inputs.filter(v => v);

        let matcher: (data: T) => boolean = matchAll;
        let timeout: number | undefined = undefined;

        let n = inputs.length;

        if (n === 1) {

            if (typeof inputs[0] === "number") {
                timeout = inputs[0];
            } else {
                matcher = inputs[0];
            }

        } else if (n === 2) {

            matcher = inputs[0];
            timeout = inputs[1];

        }

        return { matcher, timeout };

    }

    public waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    public waitFor(timeout?: number): Promise<T>;
    public waitFor(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    public waitFor(...inputs: any[]): Promise<any> {

        return this.__waitFor__(inputs, false);

    }

    public waitForExtract<Q extends T>(matcher: (data: T) => data is Q, timeout?: number): Promise<Q>;
    public waitForExtract(timeout?: number): Promise<T>;
    public waitForExtract(matcher: (data: T) => boolean, timeout?: number): Promise<T>;
    public waitForExtract(...inputs: any[]): Promise<any> {

        return this.__waitFor__(inputs, true);

    }

    private __waitFor__(
        inputs: any[],
        extract: boolean
    ): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            let { matcher, timeout } = this.readWaitForParams(inputs);

            let timer: NodeJS.Timer | undefined = undefined;

            if (typeof timeout === "number") {

                timer = setTimeout(() => {

                    let index = this.promiseHandlers.indexOf(promiseHandler);

                    this.promiseHandlers.splice(index, 1);

                    reject(new Error(`SyncEvent waitFor timeout, ${timeout}ms elapsed`));

                }, timeout);

            }

            let promiseHandler = { matcher, timer, resolve, extract };

            this.promiseHandlers.push(promiseHandler);

            if (this.evtAttach)
                this.evtAttach.post(`waitFor${extract ? "Extract" : ""}` as any);

        });


    }


    //matcher, boundTo, timeout, handler
    private readAttachParams(inputs: any[]) {

        let matcher: (data: T) => boolean = matchAll;
        let boundTo: Bindable = this;
        let timeout: number | undefined = undefined;
        let handler: (data: T) => any = (() => {
            let h = inputs.pop();
            if (matchPostable(h)) {
                boundTo = h;
                return h.post;
            }
            return h;
        })();

        let r = inputs.length;

        if (r === 3) {

            matcher = inputs[0];
            boundTo = inputs[1];
            timeout = inputs[2];

        } else if (r === 2) {
            //matcher, timeout
            //boundTo, timeout
            //matcher, boundTo
            let [p1, p2] = inputs;
            if (typeof p2 === "number") {
                //matcher, timeout
                //boundTo, timeout
                timeout = p2;
                if (isCallable(p1)) {
                    //matcher, timeout
                    matcher = p1;
                } else {
                    //boundTo, timeout
                    boundTo = p1;
                }
            } else {
                //matcher, boundTo
                matcher = p1;
                boundTo = p2;
            }
        } else if (r === 1){
            //matcher
            //boundTo
            //timeout
            let [p] = inputs;
            if (typeof p === "number") {
                //timeout
                timeout = p;
            } else if (isCallable(p)) {
                //matcher
                matcher = p;
            } else {
                //boundTo
                boundTo = p;
            }
        }

        return { matcher, boundTo, timeout, handler };

    }

    /** handler */
    public attach(handler: (data: T) => any): this;
    /** matcher, handler */
    public attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attach(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attach(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attach(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attach(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attach(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attach(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attach(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attach(evt: Postable<T>): this;
    /** matcher, evt */
    public attach<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attach(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attach(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attach<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attach(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attach(...inputs: any[]) {

        return this.__attach__(inputs, false, false, false);

    }


    /** handler */
    public attachOnce(handler: (data: T) => any): this;
    /** matcher, handler */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attachOnce(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attachOnce(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attachOnce(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnce(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attachOnce(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnce(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attachOnce(evt: Postable<T>): this;
    /** matcher, evt */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attachOnce(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attachOnce(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOnce(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attachOnce(...inputs: any[]) {

        return this.__attach__(inputs, true, false, false);

    }

    /** handler */
    public attachPrepend(handler: (data: T) => any): this;
    /** matcher, handler */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attachPrepend(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attachPrepend(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attachPrepend(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachPrepend(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attachPrepend(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachPrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attachPrepend(evt: Postable<T>): this;
    /** matcher, evt */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attachPrepend(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attachPrepend(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachPrepend(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attachPrepend(...inputs: any[]) {

        return this.__attach__(inputs, false, false, true);

    }

    /** handler */
    public attachOncePrepend(handler: (data: T) => any): this;
    /** matcher, handler */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attachOncePrepend(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attachOncePrepend(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attachOncePrepend(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOncePrepend(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attachOncePrepend(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOncePrepend(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attachOncePrepend(evt: Postable<T>): this;
    /** matcher, evt */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attachOncePrepend(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attachOncePrepend(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOncePrepend(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attachOncePrepend(...inputs: any[]) {

        return this.__attach__(inputs, true, false, true);

    }

    /** handler */
    public attachExtract(handler: (data: T) => any): this;
    /** matcher, handler */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attachExtract(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attachExtract(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attachExtract(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachExtract(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attachExtract(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attachExtract(evt: Postable<T>): this;
    /** matcher, evt */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attachExtract(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attachExtract(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachExtract(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attachExtract(...inputs: any[]) {

        return this.__attach__(inputs, false, true, false);

    }

    /** handler */
    public attachOnceExtract(handler: (data: T) => any): this;
    /** matcher, handler */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => any): this;
    /** matcher, handler */
    public attachOnceExtract(matcher: (data: T) => boolean, handler: (data: T) => any): this;
    /** timeout, handler => Promise that resolve is no post after timeout ms */
    public attachOnceExtract(timeout: number, handler: (data: T) => any): Promise<void>;
    /** boundTo, handler */
    public attachOnceExtract(boundTo: Bindable, handler: (data: T) => any): this;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnceExtract(matcher: (data: T) => boolean, timeout: number, handler: (data: T) => any): Promise<void>;
    /** matcher, boundTo, handler */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, handler: (data: Q) => any): this;
    /** matcher, boundTo, handler */
    public attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, handler: (data: T) => any): this;
    /** boundTo, timeout, handler */
    public attachOnceExtract(boundTo: Bindable, timeout: number, handler: (data: T) => any): this;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Bindable, timeout: number, handler: (data: Q) => any): Promise<void>;
    /** matcher, boundTo, timeout, handler => Promise that resolve if no post after timeout ms */
    public attachOnceExtract(matcher: (data: T) => boolean, boundTo: Bindable, timeout: number, handler: (data: T) => any): Promise<void>;
    /** evt */
    public attachOnceExtract(evt: Postable<T>): this;
    /** matcher, evt */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, evt: Postable<Q>): this;
    /** matcher, evt */
    public attachOnceExtract(matcher: (data: T) => boolean, evt: Postable<T>): this;
    /** timeout, evt => Promise that resolve is no post after timeout ms */
    public attachOnceExtract(timeout: number, evt: Postable<T>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, timeout: number, evt: Postable<Q>): Promise<void>;
    /** matcher, timeout, evt => Promise that resolve if no post after timeout ms */
    public attachOnceExtract(matcher: (data: T) => boolean, timeout: number, evt: Postable<T>): Promise<void>;

    public attachOnceExtract(...inputs: any[]) {

        return this.__attach__(inputs, true, true, false);

    }


    private __attach__(
        inputs: any[],
        once: boolean,
        extract: boolean,
        prepend: boolean
    ) {

        let out: this | Promise<void> = this;

        let { matcher, boundTo, timeout, handler } = this.readAttachParams(inputs);

        let timer: NodeJS.Timer | undefined = undefined;

        if (typeof timeout === "number") {
            out = new Promise<void>(resolve => {
                timer = setTimeout(() => {

                    let index = this.callbackHandlers.indexOf(callbackHandler);

                    this.callbackHandlers.splice(index, 1);

                    resolve();

                }, timeout!);
            });
        }

        let callbackHandler = { matcher, boundTo, timer, handler, once, extract };

        if (prepend) {
            this.callbackHandlers.unshift(callbackHandler);
        } else {
            this.callbackHandlers.push(callbackHandler);
        }

        if (this.evtAttach) {
            this.evtAttach.post(`attach${once ? "Once" : ""}${extract ? "Extract" : ""}${prepend ? "Prepend" : ""}` as any);
        }

        return out;

    }


    public post(data: T): this {

        this.postCount++;

        this.postPromisesThenCallbacks(data);

        return this;

    }

    private postPromisesThenCallbacks = runExclusive.buildMethodCb(
        (data: T, releaseLock?) => {

            let match_run_detach = (
                index: number,
                promiseHandler: typeof SyncEvent.prototype.promiseHandlers[number]
            ) => {

                let { matcher, timer, resolve } = promiseHandler;

                if (!matcher(data)) return false;

                if (timer) clearTimeout(timer);

                this.promiseHandlers.splice(index, 1);

                resolve(data);

                return true;

            };

            let extracted = false;

            [...this.promiseHandlers].forEach((promiseHandler, index) => {

                if (!promiseHandler.extract) return;

                if (match_run_detach(index, promiseHandler))
                    extracted = true;

            });

            let matched = extracted;

            if (!extracted) {

                [...this.promiseHandlers].forEach((promiseHandler, index) => {

                    if (promiseHandler.extract) return;

                    if (match_run_detach(index, promiseHandler))
                        matched = true;

                });

                this.postCallback(data);

            }

            if (matched) setTimeout(() => releaseLock(), 0);
            else releaseLock();

        }
    );


    private postCallback(data: T) {

        let match_run_detach = (
            index: number,
            callbackHandler: typeof SyncEvent.prototype.callbackHandlers[number]
        ): { matched: boolean, stopPropagation: boolean } => {

            let { matcher, boundTo, timer, handler, once } = callbackHandler;

            if (!matcher(data)) return { "matched": false, "stopPropagation": false };

            if (timer) clearTimeout(timer);

            if (once) this.callbackHandlers.splice(index, 1);

            if (SyncEvent.stopPropagation === handler.call(boundTo, data))
                return { "matched": true, "stopPropagation": true };
            else
                return { "matched": true, "stopPropagation": false };

        }

        let extracted = false;


        [...this.callbackHandlers].forEach((callbackHandler, index) => {

            if (!callbackHandler.extract) return;

            extracted = match_run_detach(index, callbackHandler).matched;

        });

        if (extracted) return;

        let breakForEach = {};

        try {

            [...this.callbackHandlers].forEach((callbackHandler, index) => {

                if (callbackHandler.extract) return;

                let { stopPropagation } = match_run_detach(index, callbackHandler);

                if (stopPropagation) throw breakForEach;

            });

        } catch (error) {

            if (error !== breakForEach) throw error;

        }

    }

    private readDetachParams(inputs: any[]): Partial<AttachParams<T>> {

        let n = inputs.length;

        if (n === 0) {
            return {};
        } else if (n === 2) {
            return { "boundTo": inputs[0], "handler": inputs[1] };
        } else {

            let [p] = inputs;

            if (matchPostable(p)) {

                return { "boundTo": p, "handler": p.post };

            } else if (
                p.hasOwnProperty("matcher") ||
                p.hasOwnProperty("boundTo") ||
                p.hasOwnProperty("handler")
            ) {

                let out: Partial<AttachParams<T>> = {};

                if (p.hasOwnProperty("matcher"))
                    out.matcher = p.matcher;

                if (p.hasOwnProperty("boundTo"))
                    out.boundTo = p.boundTo;

                if (p.hasOwnProperty("handler"))
                    out.handler = p.handler;

                return out;

            } else if (isCallable(p)) {
                return { "handler": p };
            } else {
                return { "boundTo": p };
            }

        }

    }


    /** Detach every handlers and waiters of event emitter */
    public detach(): this;
    /** Detach specific postable attached to event emitter */
    public detach(evt: Postable<T>): this;
    /** Detach every handler boundTo Object */
    public detach(boundTo: Bindable): this;
    /** Detach specific handler */
    public detach(handler: (data: T) => void): this;
    /** Detach specific handler bound bound to Object */
    public detach(boundTo: Bindable, handler: (data: T) => void): this;
    /** Explicitly tell what you want to detach  matcher and/or boundTo and/or handler */
    public detach(by: Partial<AttachParams<T>>): this;

    public detach(...inputs: any[]): this {

        let by = this.readDetachParams(inputs);

        [...this.callbackHandlers].forEach(({ matcher, boundTo, handler }, index) => {

            if (
                (by.hasOwnProperty("matcher") ? (by.matcher === matcher) : true) &&
                (by.hasOwnProperty("boundTo") ? (by.boundTo === boundTo) : true) &&
                (by.hasOwnProperty("handler") ? (by.handler === handler) : true)
            ) this.callbackHandlers.splice(index, 1);


        });

        if (!Object.keys(by).length) this.stopWaiting();

        return this;

    }

}

export class VoidSyncEvent extends SyncEvent<void> {
    public post(): this {
        return super.post(undefined);
    }
}
