import { RefCore } from "./RefCore";
import { OneShot } from "./types/helper/OneShot";
import { Handler } from "./types/Handler";
import { UnpackEvt } from "./types/helper/UnpackEvt";
import { Evt } from "./Evt";

export class Ref extends RefCore {

    public readonly evtDetached: OneShot<Evt<Handler<any, any>[]>>;

    constructor() {
        super();
        const evtDetached = new Evt<UnpackEvt<typeof Ref.prototype.evtDetached>>();
        this.onDetach = handlers => evtDetached.post(handlers);
        this.evtDetached = evtDetached;
    }

}