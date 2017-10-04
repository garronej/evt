import { EventEmitter as NodeJS_EventEmitter } from "events";
import * as runExclusive from "run-exclusive";
import { 
    UserProvidedParams, 
    ImplicitParams, 
    Bindable, 
    Handler, 
    EvtError
} from "./defs";

const MapLike= require("es6-map");

/** SyncEvent without evtAttach property and without overload */
export class SyncEventBaseProtected<T> {

    private tick= 0;

    private defaultFormatter(...inputs: any[]): T{
        return inputs[0];
    }

    public postCount = 0;

    private traceId: string | null = null;
    private traceFormatter: (data: T) => string = data => JSON.stringify(data, null, 2);

    public enableTrace(
        id: string,
        formatter?: (data: T) => string
    ) {
        this.traceId = id;
        if (formatter) {
            this.traceFormatter = formatter;
        }
    }
    public disableTrace() {
        this.traceId = null;
    }

    private readonly handlers: Handler<T>[] = [];

    private readonly handlerTriggers: Map<Handler<T>,{ handlerTick: number; trigger: (data: T)=> void }> = new Map();

    protected addHandler(
        attachParams: UserProvidedParams<T>,
        implicitAttachParams: ImplicitParams
    ): Handler<T> {

        let handler: Handler<T> = {
            ...attachParams,
            ...implicitAttachParams,
            "detach": null as any,
            "promise": null as any
        };

        handler.promise = new Promise<T>(
            (resolve, reject) => {

                let timer: NodeJS.Timer | undefined = undefined;

                if (typeof handler.timeout === "number") {

                    timer = setTimeout(() => {

                        timer= undefined;

                        handler.detach();

                        reject(new EvtError.Timeout(handler.timeout!));

                    }, handler.timeout);

                }

                handler.detach= () => {

                    let index = this.handlers.indexOf(handler);

                    if (index < 0) return false;

                    this.handlers.splice(index, 1);

                    this.handlerTriggers.delete(handler);

                    if( timer ){ 

                        clearTimeout(timer);

                        reject( new EvtError.Detached() );

                    }

                    return true;

                };

                let handlerTick = this.tick++;

                let trigger = (data: T) => {

                    let { callback, once } = handler;

                    if (timer) {
                        clearTimeout(timer);
                        timer= undefined;
                    }

                    if (once) handler.detach();

                    if (callback) callback.call(handler.boundTo, data);

                    resolve(data);

                };

                this.handlerTriggers.set(handler, { handlerTick, trigger });

            }
        );

        if (handler.prepend) {

            let i;

            for (i = 0; i < this.handlers.length; i++) {

                if (this.handlers[i].extract) continue;
                else break;

            }

            this.handlers.splice(i, 0, handler);

        } else {

            this.handlers.push(handler);

        }

        return handler;

    }

    private trace(data: T) {

        if (typeof this.traceId !== "string") return;

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

        try {

            console.log(message + this.traceFormatter(data));

        } catch (error) {

            console.log(message, data);

        }

    }

    public post(data: T): number {

        this.trace(data);

        this.postCount++;

        let postTick = this.tick++;

        let isExtracted = this.postSync(data);

        if (!isExtracted) {
            this.postAsync(data, postTick);
        }

        return this.postCount;

    }

    private postSync(data: T): boolean {

        for (let handler of [...this.handlers]) {

            let { async, matcher, extract } = handler;

            if (async || !matcher(data)) continue;

            let handlerTrigger = this.handlerTriggers.get(handler);

            if( !handlerTrigger ) continue;

            handlerTrigger.trigger(data);

            if (extract) return true;

        }

        return false;

    }


    private readonly postAsync = runExclusive.buildCb(
        (data: T, postTick: number, releaseLock?) => {

            let isHandled = false;

            for (let handler of [...this.handlers]) {

                let { async, matcher } = handler;

                if (!async || !matcher(data)) continue;

                let handlerTrigger = this.handlerTriggers.get(handler);

                if (!handlerTrigger) continue;

                if (handlerTrigger.handlerTick > postTick) continue;

                isHandled = true;

                handlerTrigger.trigger(data);

            }

            if (!isHandled) {

                releaseLock();

            } else {

                let handlersDump = [...this.handlers];

                setTimeout(() => {

                    for (let handler of this.handlers) {

                        let { async } = handler;

                        if (!async) continue;

                        if (handlersDump.indexOf(handler) >= 0) continue;

                        this.handlerTriggers.get(handler)!.handlerTick = postTick;

                    }

                    releaseLock();

                }, 0);

            }

        }
    );

    constructor();
    constructor(
        eventEmitter: NodeJS_EventEmitter,
        eventName: string,
        formatter?: (...inputs) => T);
    constructor(...inputs: any[]) {

        if (!inputs.length) return;

        let [eventEmitter, eventName] = inputs;

        let formatter: (...inputs: any[])=> T = inputs[2] || this.defaultFormatter;

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

        for (let handler of [ ...this.handlers ]) {

            if ( boundTo === undefined || handler.boundTo === boundTo) {
                handler.detach();
                detachedHandlers.push(handler);
            }

        }

        return detachedHandlers;

    }


}

