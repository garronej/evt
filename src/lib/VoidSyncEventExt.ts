import { VoidSyncEvent, Postable } from "ts-events";
import { SyncEventExt } from "./SyncEventExt";

export class VoidSyncEventExt extends VoidSyncEvent {

    public postCount= 0;
    public readonly evtAttach: SyncEventExt<"attachOnce"|"attach">;

    constructor(){
        super();

        if( arguments.length === 0 )
            this.evtAttach= new (SyncEventExt as any)("no recursion");
        
    }

    public waitFor(timeout?: number): Promise<boolean> {

        timeout = timeout || 60000;

        return new Promise<boolean>(resolve => {

            let timer = setTimeout(() => {

                this.detach(callback);

                resolve(true);

            }, timeout);

            let callback = () => {

                clearTimeout(timer);

                resolve(false);

            };

            this.attachOnce(callback);

        });

    }

    public attachOnce(): Promise<void>;
    public attachOnce( handler: ()=>void): void;
    public attachOnce(boundTo: Object, handler: ()=>void): void;
    public attachOnce(event: Postable<void>): void;
    public attachOnce( ...inputs: any[]): any {

        let handlerOnce: (()=> void) | Postable<void> | undefined= undefined;
        let boundTo: Object;

        switch( inputs.length){
            case 0:
                return new Promise<void>(resolve => this.attachOnce( resolve ));
            case 1: 
                boundTo= this;
                handlerOnce= inputs[0];
                break;
            case 2:
                boundTo= inputs[0];
                handlerOnce= inputs[1];
                break;
        }

        let handler: ()=> void;

        if( typeof (handlerOnce as any).post === "function" ){

            handler= () => {
                this.detach(handler);
                (handlerOnce as { post: ()=>void }).post();
            };

        }else{

            handler= () => {
                this.detach(handler);
                (handlerOnce as ()=> void).call(boundTo);
            };

        }

        super.attach(handler);

        if( !this.evtAttach ) return;

        this.evtAttach.post("attachOnce");

    }

    public attach(handler: () => void): void;
    public attach(boundTo: Object, handler: () => void): void;
    public attach(event: Postable<void>): void;
    public attach( ...inputs: any[]): void {

        super.attach.apply(this, inputs);

        if( !this.evtAttach ) return;

        this.evtAttach.post("attach");


    }

    public post(): void{

        this.postCount++;

        super.post();

    }
}
