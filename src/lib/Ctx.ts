import { CtxCore } from "./CtxCore";
import { Handler } from "./types/Handler";
import { UnpackEvt } from "./types/helper/UnpackEvt";
import { Evt } from "./Evt";

export class Ctx extends CtxCore {

    public readonly evtDetached: Evt<Handler.WithEvt<any>[]>;

    constructor() {
        super();
        const evtDetached = new Evt<UnpackEvt<typeof Ctx.prototype.evtDetached>>();
        this.onDetach = handlers => evtDetached.post(handlers);
        this.evtDetached = evtDetached;
    }

    public static __CtxForEvtBrand = true;

}