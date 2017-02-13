import { SyncEvent } from "ts-events";

export class SyncEventExt<T> extends SyncEvent<T> {

    public postCount: number= 0;

    constructor(){
        super();
    }

    public attachOnce( handlerOnce: (data: T)=>void): void;
    public attachOnce(boundTo: Object, handlerOnce: (data: T)=> void): void;
    public attachOnce( ...inputs: any[]): void {

        let handlerOnce: (data: T)=> void;
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

        let handler: typeof handlerOnce= data =>{
            
            handlerOnce.call(boundTo, data);

            this.detach(handler);

        };

        super.attach(boundTo, handler);

    }

    public post(data: T): void{

        this.postCount++;

        super.post(data);

    }
}