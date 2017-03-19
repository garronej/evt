import { SyncEvent, Postable } from "ts-events";


export class SyncEventExt<T> extends SyncEvent<T> {

    public postCount= 0;
    public readonly evtAttach: SyncEventExt<"attachOnce"|"attach">;

    constructor(){
        super();

        if (arguments.length === 0)
            this.evtAttach = new (SyncEventExt as any)("no recursion");

    }

    public waitFor(timeout?: number): Promise<T | null> {

        timeout = timeout || 60000;

        return new Promise<T | null>(resolve => {

            let timer = setTimeout(() => {

                this.detach(callback);

                resolve(null);

            }, timeout);

            let callback = (data: T) => {

                clearTimeout(timer);

                resolve(data);

            };

            this.attachOnce(callback);

        });

    }

    public attachOnce(): Promise<T>;
    public attachOnce(handler: (data: T) => void): void;
    public attachOnce(boundTo: Object, handler: (data: T) => void): void;
    public attachOnce(event: Postable<T>): void;
    public attachOnce(...inputs: any[]): any {

        let handlerOnce: ((data: T) => void) | Postable<T> | undefined = undefined;
        let boundTo: Object;

        switch (inputs.length) {
            case 0:
                return new Promise<T>(resolve => this.attachOnce(resolve));
            case 1:
                boundTo = this;
                handlerOnce = inputs[0];
                break;
            case 2:
                boundTo = inputs[0];
                handlerOnce = inputs[1];
                break;
        }

        let handler: (data: T) => void;

        if (typeof (handlerOnce as any).post === "function") {

            handler = data => {
                this.detach(handler);
                (handlerOnce as Postable<T>).post(data);
            };

        } else {

            handler = data => {
                this.detach(handler);
                (handlerOnce as (data: T) => void).call(boundTo, data);
            };

        }

        super.attach(handler);

        if (!this.evtAttach) return;

        this.evtAttach.post("attachOnce");

    }

    public attach(handler: (data: T) => void): void;
    public attach(boundTo: Object, handler: (data: T) => void): void;
    public attach(event: Postable<T>): void;
    public attach(...inputs: any[]): void {

        super.attach.apply(this, inputs);

        if (!this.evtAttach) return;

        this.evtAttach.post("attach");


    }

    public post(data: T): void {

        this.postCount++;

        super.post(data);

    }
}