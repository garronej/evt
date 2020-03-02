import { HandlerGroupCore } from "./HandlerGroupCore";
import { OneShot } from "./types/helper/OneShot";
import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
export declare class HandlerGroup extends HandlerGroupCore {
    readonly evtDetached: OneShot<Evt<Handler<any, any>[]>>;
    constructor();
}
