import { UnpackEvt } from "./types/helper/UnpackEvt";
declare type Evt<T> = import("./Evt").Evt<T>;
declare type CtxLike<Result> = import("./Ctx").CtxLike<Result>;
declare type EvtLike<T> = import("./Evt").EvtLike<T> & {
    attach(ctx: CtxLike<any>, callback: (data: T) => void): void;
    attach(callback: (data: T) => void): void;
};
export declare function mergeImpl<EvtUnion extends EvtLike<any>>(ctx: CtxLike<any> | undefined, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends EvtLike<any>>(ctx: CtxLike<any>, evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export declare function merge<EvtUnion extends EvtLike<any>>(evts: readonly EvtUnion[]): Evt<UnpackEvt<EvtUnion>>;
export {};
