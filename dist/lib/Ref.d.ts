import { RefCore } from "./RefCore";
import { OneShot } from "./types/helper/OneShot";
import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
export declare class Ref extends RefCore {
    readonly evtDetached: OneShot<Evt<Handler<any, any>[]>>;
    constructor();
}
