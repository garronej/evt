import { Evt } from "../Evt";
import { NonPostable } from "../types/helper/NonPostable";
import { UnpackEvt } from "../types/helper/UnpackEvt";
declare type CtxLike<Result> = import("../Ctx").CtxLike<Result>;
declare type EvtLike<T> = import("../EvtCore").EvtLike<T> & {
    attach<T>(callback: (data: T) => void): void;
    attach<T>(ctx: CtxLike<any>, callback: (data: T) => void): void;
};
export declare function mergeImpl<EvtUnion extends EvtLike<any>>(ctx: CtxLike<any> | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<Evt<any>>>(ctx: CtxLike<any>, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends NonPostable<Evt<any>>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export {};
