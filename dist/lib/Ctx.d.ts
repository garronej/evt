import { CtxCore } from "./CtxCore";
import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
export declare class Ctx extends CtxCore {
    readonly evtDetached: Evt<Handler.WithEvt<any>[]>;
    constructor();
    static __CtxForEvtBrand: boolean;
}
