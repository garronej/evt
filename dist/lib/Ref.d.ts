import { RefCore } from "./RefCore";
import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
export declare class Ref extends RefCore {
    readonly evtDetached: Evt<Handler.WithEvt<any>[]>;
    constructor();
    static __RefForEvtBrand: boolean;
}
