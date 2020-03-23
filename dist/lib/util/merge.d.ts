import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";
declare type Ctx<Result> = import("../Ctx").Ctx<Result>;
export declare function mergeImpl<EvtUnion extends NonPostable<Evt<any>>>(ctx: Ctx<any> | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<Evt<any>>>(ctx: Ctx<any>, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<Evt<any>>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export {};
