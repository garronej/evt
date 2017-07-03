import { EventEmitter as NodeJS_EventEmitter } from "events";
import { execQueue } from "ts-exec-queue";

export interface Postable<T> {
    post(data: T): void;
}

export type AttachParams<T>= {
        matcher(data: T): boolean;
        boundTo: Object;
        handler(data: T):void;
}


export class SyncEvent<T> {

    private static readonly defaultEvtMatcher = () => true;

    public postCount = 0;

    public readonly evtAttach: SyncEvent<
    "attach" | "attachPrepend" | "attachOnce" | "attachOncePrepend" | "waitFor" | "attachExtract" | "attachOnceExtract" | "waitForExtract"
    >;

    private readonly callbackHandlers: (AttachParams<T> & { once: boolean; extract: boolean; })[] = [];

    private readonly promiseHandlers: {
        matcher: AttachParams<T>['matcher'];
        timer: NodeJS.Timer | undefined;
        resolve: AttachParams<T>['handler'];
        extract: boolean;
    }[] = [];

    public stopWaiting(): void {

        for (let { timer } of this.promiseHandlers)
            if (timer) clearTimeout(timer);

        this.promiseHandlers.splice(0, this.promiseHandlers.length)

    }


    public get handlerCount(): number {
        return this.callbackHandlers.length + this.promiseHandlers.length;
    }

    public get waiterCount(): number {
        return this.promiseHandlers.length;
    }

    public get permanentHandlerCount(): number {

        return this.callbackHandlers.filter( ({ once }) => !once ).length;

    }

    public get onceHandlerCount(): number {

        return this.callbackHandlers.length - this.permanentHandlerCount;

    }

    constructor() {

        if (arguments.length === 0)
            this.evtAttach = new (SyncEvent as any)("no recursion");

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
        matcher: ((data: T) => boolean )| undefined,
        extract: boolean
    ): SyncEvent<any> {

        matcher = matcher || SyncEvent.defaultEvtMatcher;

        let evt = new SyncEvent<any>();

        if( extract ) this.attachExtract(matcher, evt);
        else this.attach(matcher, evt);

        return evt;


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


    private readWaitForParams(inputs: any[]): { matcher: AttachParams<T>['matcher']; timeout: number | undefined } {

        inputs = inputs.filter(v => v);

        if (inputs.length === 0)
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": undefined }
        else if (inputs.length === 1 && typeof inputs[0] === "number")
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": inputs[0] }
        else if (inputs.length === 1)
            return { "matcher": inputs[0], "timeout": undefined }
        else
            return { "matcher": inputs[0], "timeout": inputs[1] };

    }

    private __waitFor__(inputs: any[], extract: boolean): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            let { matcher, timeout } = this.readWaitForParams(inputs);

            let timer: NodeJS.Timer | undefined = undefined;

            if (timeout) {

                timer = setTimeout(() => {

                    let index = this.promiseHandlers.indexOf(promiseHandler);

                    this.promiseHandlers.splice(index, 1);

                    reject(new Error(`waitFor() timeout after ${timeout} ms`));

                }, timeout);

            }

            let promiseHandler = { matcher, timer, resolve, extract };

            this.promiseHandlers.push(promiseHandler);

            if (this.evtAttach)
                this.evtAttach.post(`waitFor${extract?"Extract":""}` as any);

        });


    }









    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attachOnce(event: Postable<T>): this; //1 Post
    public attachOnce(handler: (data: T) => void): this; //1 Function

    public attachOnce(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attachOnce(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attachOnce(boundTo: Object, handler: (data: T) => void): this; //2 any Function

    public attachOnce(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attachOnce(...inputs: any[]): this {

        return this.__attach__(inputs, true, false, false);

    }

    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attachOncePrepend<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attachOncePrepend(event: Postable<T>): this; //1 Post
    public attachOncePrepend(handler: (data: T) => void): this; //1 Function

    public attachOncePrepend(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attachOncePrepend(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attachOncePrepend(boundTo: Object, handler: (data: T) => void): this; //2 any Function

    public attachOncePrepend(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attachOncePrepend(...inputs: any[]): this {

        return this.__attach__(inputs, true, false, true);

    }



    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attachOnceExtract<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attachOnceExtract(event: Postable<T>): this; //1 Post
    public attachOnceExtract(handler: (data: T) => void): this; //1 Function

    public attachOnceExtract(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attachOnceExtract(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attachOnceExtract(boundTo: Object, handler: (data: T) => void): this; //2 any Function

    public attachOnceExtract(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attachOnceExtract(...inputs: any[]): this {

        return this.__attach__(inputs, true, true, false);

    }



    public attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attach<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attach(event: Postable<T>): this; //1 Post
    public attach(handler: (data: T) => void): this; //1 Function

    public attach(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attach(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attach(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attach(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attach(...inputs: any[]): this {

        return this.__attach__(inputs, false, false, false);

    }


    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attachPrepend<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attachPrepend(event: Postable<T>): this; //1 Post
    public attachPrepend(handler: (data: T) => void): this; //1 Function

    public attachPrepend(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attachPrepend(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attachPrepend(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attachPrepend(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attachPrepend(...inputs: any[]): this {

        return this.__attach__(inputs, false, false, true);

    }


    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): this;
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): this;
    public attachExtract<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): this;

    public attachExtract(event: Postable<T>): this; //1 Post
    public attachExtract(handler: (data: T) => void): this; //1 Function

    public attachExtract(matcher: (data: T) => boolean, event: Postable<T>): this; //2 Function Post
    public attachExtract(matcher: (data: T) => boolean, handler: (data: T) => void): this; //2 Function Function
    public attachExtract(boundTo: Object, handler: (data: T) => void): this; //2 any Function

    public attachExtract(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): this; //3


    public attachExtract(...inputs: any[]): this {

        return this.__attach__(inputs, false, true, false);

    }

    private readAttachParams(inputs: any[]): AttachParams<T> {


        let outAsArray: [
            AttachParams<T>['matcher'],
            AttachParams<T>['boundTo'],
            AttachParams<T>['handler']
        ] | undefined = undefined;


        if (
            inputs.length === 1 &&
            (
                inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"
            )
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            inputs[0],
            inputs[0].post
        ]
        else if (
            inputs.length === 1
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            this,
            inputs[0]
        ]
        else if (
            inputs.length === 2 &&
            (
                inputs[1] instanceof Object &&
                typeof inputs[1].post === "function"
            )
        ) outAsArray = [
            inputs[0],
            inputs[1],
            inputs[1].post
        ]
        else if (
            inputs.length === 2 &&
            typeof inputs[0] === "function"
        ) outAsArray = [
            inputs[0],
            this,
            inputs[1]
        ]
        else if (
            inputs.length === 2
        ) outAsArray = [
            SyncEvent.defaultEvtMatcher,
            inputs[0],
            inputs[1]
        ]
        else if (
            inputs.length === 3
        ) outAsArray = [
            inputs[0],
            inputs[1],
            inputs[2]
        ];

        let [matcher, boundTo, handler] = outAsArray!;

        return { matcher, boundTo, handler };

    }

    private __attach__(
        inputs: any[],
        once: boolean,
        extract: boolean,
        prepend: boolean
    ): this {

        let { matcher, boundTo, handler } = this.readAttachParams(inputs);

        if( prepend )
            this.callbackHandlers.unshift({ matcher, boundTo, handler, once, extract });
        else
            this.callbackHandlers.push({ matcher, boundTo, handler, once, extract });

        if( this.evtAttach)
            this.evtAttach.post(`attach${once ? "Once" : ""}${extract ? "Extract" : ""}${prepend ? "Prepend" : ""}` as any);

        return this;

    }



    private readDetachParams(inputs: any[]): Partial<AttachParams<T>> {

        if (
            inputs.length === 0
        ) return {};
        else if (
            inputs.length === 1 &&
            (
                inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"
            )
        ) return { "boundTo": inputs[0], "handler": inputs[0].post }
        else if (
            inputs.length === 1 &&
            (
                inputs[0].hasOwnProperty("matcher") ||
                inputs[0].hasOwnProperty("boundTo") ||
                inputs[0].hasOwnProperty("handler")
            )
        ) {

            let out: Partial<AttachParams<T>> = {};

            if (inputs[0].hasOwnProperty("matcher"))
                out.matcher = inputs[0].matcher;

            if (inputs[0].hasOwnProperty("boundTo"))
                out.boundTo = inputs[0].boundTo;

            if (inputs[0].hasOwnProperty("handler"))
                out.handler = inputs[0].handler;

            return out;

        } else if (
            inputs.length === 1 &&
            typeof inputs[0] !== "function"
        ) return { "boundTo": inputs[0] }
        else if (
            inputs.length === 1
        ) return { "handler": inputs[0] }
        else if (
            inputs.length === 2
        ) return { "boundTo": inputs[0], "handler": inputs[1] };


        return null as any;

    }




    public detach(): this; //0

    public detach(event: Postable<T>): this; //1
    public detach(by: Partial<AttachParams<T>>): this; //1
    public detach(boundTo: Object): this; //1
    public detach(handler: (data: T) => void): this; //1

    public detach(boundTo: Object, handler: (data: T) => void): this; //2
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

    public post(data: T): this {

        this.postCount++;

        this.postPromise(data);

        return this;


    }


    private postPromise = execQueue(
        (data: T, callback?: () => void) => {

            let match_run_detach = (index: number, promiseHandler: typeof SyncEvent.prototype.promiseHandlers[number]) => {

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

            if (matched) setImmediate(() => callback!());
            else callback!();

        }
    );


    private postCallback(data: T) {

        let match_run_detach = (index: number, callbackHandler: typeof SyncEvent.prototype.callbackHandlers[number]): boolean => {

            let { matcher, boundTo, handler, once } = callbackHandler;

            if (!matcher(data)) return false;

            if (once) this.callbackHandlers.splice(index, 1);

            handler.call(boundTo, data);

            return true;

        }


        let extracted = false;

        [...this.callbackHandlers].forEach((callbackHandler, index) => {

            if (!callbackHandler.extract) return;

            extracted = match_run_detach(index, callbackHandler);

        });

        if (extracted) return;

        [...this.callbackHandlers].forEach((callbackHandler, index) => {

            if (callbackHandler.extract) return;

            match_run_detach(index, callbackHandler);

        });

    }


}

export class VoidSyncEvent extends SyncEvent<void> {
    public post(): this {
        return super.post(undefined);
    }
}