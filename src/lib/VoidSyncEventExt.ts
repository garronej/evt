import { VoidSyncEvent } from "ts-events";

export class VoidSyncEventExt extends VoidSyncEvent {

    public postCount: number= 0;

    constructor(){
        super();
    }

    public attachOnce( handlerOnce: ()=>void): void;
    public attachOnce(boundTo: Object, handlerOnce: ()=> void): void;
    public attachOnce( ...inputs: any[]): void {

        let handlerOnce: ()=> void;
        let boundTo: Object;

        switch( inputs.length){
            case 1: 
                boundTo= this;
                handlerOnce= inputs[0];
                break;
            case 2:
                boundTo= inputs[0];
                handlerOnce= inputs[1];
                break;
        }

        let handler: typeof handlerOnce= () =>{
            
            handlerOnce.call(boundTo);

            this.detach(handler);

        };

        super.attach(boundTo, handler);

    }

    public post(): void{

        this.postCount++;

        super.post();

    }
}