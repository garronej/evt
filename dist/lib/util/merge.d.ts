import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";
declare type EvtOverloaded<T> = import("../EvtOverloaded").EvtOverloaded<T>;
declare type Ref = import("../Ref").Ref;
export declare function mergeImpl<EvtUnion extends NonPostable<EvtOverloaded<any>>>(ref: Ref | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(ref: Ref, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<EvtOverloaded<any>>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export {};
