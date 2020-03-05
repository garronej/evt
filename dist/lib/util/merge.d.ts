import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";
declare type EvtOverloaded<T> = import("../EvtOverloaded").EvtOverloaded<T>;
declare type Ctx = import("../Ctx").Ctx;
export declare function mergeImpl<EvtUnion extends NonPostable<EvtOverloaded<any>>>(ctx: Ctx | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(ctx: Ctx, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export {};
