import { EventEmitter as NodeJS_EventEmitter } from "events";
import { execQueue } from "ts-exec-queue";

export interface Postable<T> {
    post(data: T): void;
}

export type AttachParams<T>= {
        matcher(data: T): boolean;
        boundTo: Object;
        handler(data: T):void
}

export type HandlerType= "attach" | "attachOnce";

export class SyncEvent<T> {

    private static readonly defaultEvtMatcher= ()=> true;

    public postCount= 0;

    public readonly evtAttach: SyncEvent<HandlerType | "waitFor">;

    private readonly handlers: (AttachParams<T> & { type: HandlerType })[] = [];

    private readonly promiseHandlers: { 
        matcher: AttachParams<T>['matcher']; 
        timer: NodeJS.Timer | undefined; 
        resolve: AttachParams<T>['handler'] 
    }[]= [];

    public stopWaiting(): void {

        for( let { timer } of this.promiseHandlers )
            if( timer ) clearTimeout(timer);

        this.promiseHandlers.splice(0, this.promiseHandlers.length)


    }


    public get handlerCount(): number { 
        return this.handlers.length + this.promiseHandlers.length; 
    }

    public get waiterCount(): number {
        return this.promiseHandlers.length;
    }

    public get permanentHandlerCount(): number {

        let out= 0;

        for( let {type} of this.handlers )
            if( type === "attach" ) out++;

        return out;

    }

    public get onceHandlerCount(): number {

        return this.handlers.length - this.permanentHandlerCount;

    }



    public createProxy<Q extends T>(matcher: (data: T) => data is Q ): SyncEvent<Q>;
    public createProxy(matcher?: (data: T) => boolean ): SyncEvent<T>;
    public createProxy(matcher?: (data: T) => boolean): SyncEvent<any> {

        matcher= matcher || SyncEvent.defaultEvtMatcher;

        let evt= new SyncEvent<any>();

        this.attach(matcher, evt);

        return evt;

    }


    constructor() {

        if (arguments.length === 0)
            this.evtAttach = new (SyncEvent as any)("no recursion");

    }

    private readWaitForParams(inputs: any[]): { matcher: AttachParams<T>['matcher']; timeout: number | undefined } {

        if (inputs.length === 0)
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": undefined }
        else if (inputs.length === 1 && typeof inputs[0] === "number")
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": inputs[0] }
        else if (inputs.length === 1)
            return { "matcher": inputs[0], "timeout": undefined }
        else
            return { "matcher": inputs[0], "timeout": inputs[1] };

    }

    public waitFor<Q extends T>(matcher: (data: T) => data is Q): Promise<Q>;
    public waitFor<Q extends T>(matcher: (data: T) => data is Q, timeout: number): Promise<Q>;

    public waitFor(): Promise<T>; //0
    public waitFor(timeout: number): Promise<T>; //1 number

    public waitFor(matcher: (data: T) => boolean): Promise<T>; //1 function
    public waitFor(matcher: (data: T) => boolean, timeout: number): Promise<T>; //2 function number

    public waitFor(...inputs: any[]): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            let { matcher, timeout } = this.readWaitForParams(inputs);

            let timer: NodeJS.Timer | undefined= undefined;

            if( timeout ){

                timer= setTimeout(()=> {

                    let index= this.promiseHandlers.indexOf(promiseHandler);

                    this.promiseHandlers.splice(index, 1);

                    reject( new Error( `waitFor() timeout after ${timeout} ms`));


                }, timeout);


            }

            let promiseHandler= { matcher, timer, resolve };

            this.promiseHandlers.push(promiseHandler);

            if( !this.evtAttach ) return;

            this.evtAttach.post("waitFor");

        });


    }


    private readAttachParams(inputs: any[]): AttachParams<T> {

        let outAsArray: [
            (data: T) => boolean,
            Object,
            (data: T) => void
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




    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attachOnce<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attachOnce(event: Postable<T>): void; //1 Post
    public attachOnce(handler: (data: T) => void): void; //1 Function

    public attachOnce(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attachOnce(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attachOnce(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attachOnce(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attachOnce(...inputs: any[]): any {

        let { matcher, boundTo, handler } = this.readAttachParams(inputs);



        this.__attach__("attachOnce", matcher, boundTo, handler);

    }


    public attach<Q extends T>(matcher: (data: T) => data is Q, handler: (data: Q) => void): void;
    public attach<Q extends T>(matcher: (data: T) => data is Q, boundTo: Object, handler: (data: Q) => void): void;
    public attach<Q extends T>(matcher: (data: T) => data is Q, event: Postable<Q>): void;

    public attach(event: Postable<T>): void; //1 Post
    public attach(handler: (data: T) => void): void; //1 Function

    public attach(matcher: (data: T) => boolean, event: Postable<T>): void; //2 Function Post
    public attach(matcher: (data: T) => boolean, handler: (data: T) => void): void; //2 Function Function
    public attach(boundTo: Object, handler: (data: T) => void): void; //2 any Function

    public attach(matcher: (data: T) => boolean, boundTo: Object, handler: (data: T) => void): void; //3


    public attach(...inputs: any[]): any {

        let { matcher, boundTo, handler } = this.readAttachParams(inputs);

        this.__attach__("attach", matcher, boundTo, handler);


    }

    private __attach__(
        type: HandlerType,
        matcher: AttachParams<T>['matcher'],
        boundTo: AttachParams<T>['boundTo'],
        handler: AttachParams<T>['handler']
    ): void {

        this.handlers.push({ matcher, boundTo, handler, type });

        if (!this.evtAttach) return;

        this.evtAttach.post(type);

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




    public detach(): void; //0

    public detach(event: Postable<T>): void; //1
    public detach(by: Partial<AttachParams<T>>): void; //1
    public detach(boundTo: Object): void; //1
    public detach(handler: (data: T) => void): void; //1

    public detach(boundTo: Object, handler: (data: T) => void): void; //2
    public detach(...inputs: any[]): void {

        let by = this.readDetachParams(inputs);

        let handlers = [...this.handlers];

        for (let index = 0; index < handlers.length; index++) {

            let { matcher, boundTo, handler } = handlers[index];

            if (
                (by.hasOwnProperty("matcher") ? (by.matcher === matcher) : true) &&
                (by.hasOwnProperty("boundTo") ? (by.boundTo === boundTo) : true) &&
                (by.hasOwnProperty("handler") ? (by.handler === handler) : true)
            ) this.handlers.splice(index, 1);


        }

        if (!Object.keys(by).length) this.stopWaiting();



    }

    public post(data: T): void {

        this.postCount++;

        //if( (data as any) !== "attach" && (data as any) !== "attachOnce")
        //console.log(this.handlers);

        this.postPromise(data);

        let handlers = [...this.handlers];

        for( let index=0; index < handlers.length; index++ ){

            let { matcher, boundTo, handler, type } = handlers[index];

            if( !matcher(data)) continue;

            if( type === "attachOnce")
                this.handlers.splice(index, 1);
            
            handler.call(boundTo,data);

        }


    }

    private postPromise = execQueue(
        (data: T, callback?: () => void) => {

            let promiseHandlers = [...this.promiseHandlers];

            let run = false;

            for (let index = 0; index < promiseHandlers.length; index++) {

                let { matcher, timer, resolve } = promiseHandlers[index];

                if (!matcher(data)) continue;

                if (!run) run = true;

                if (timer) clearTimeout(timer);

                this.promiseHandlers.splice(index, 1);

                resolve(data);

            }

            if (run) setImmediate(callback!);
            else callback!();

        }
    );


}

export class VoidSyncEvent extends SyncEvent<void> {
    public post(): void {
        super.post(undefined);
    }
}