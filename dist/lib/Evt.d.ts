import "minimal-polyfills/dist/lib/Array.prototype.find";
import { create } from "./Evt.create";
import { getCtxFactory } from "./Evt.getCtx";
import { merge } from "./Evt.merge";
import { from } from "./Evt.from";
import { useEffect } from "./Evt.useEffect";
import { newCtx } from "./Evt.newCtx";
import { loosenType } from "./Evt.loosenType";
export declare type Evt<T> = import("./types/interfaces").Evt<T>;
export declare type VoidEvt = import("./types/interfaces").VoidEvt;
export declare const Evt: {
    new <T>(): Evt<T>;
    readonly prototype: Evt<any>;
    readonly create: typeof create;
    readonly newCtx: typeof newCtx;
    readonly merge: typeof merge;
    readonly from: typeof from;
    readonly useEffect: typeof useEffect;
    readonly getCtx: ReturnType<typeof getCtxFactory>;
    readonly loosenType: typeof loosenType;
    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    setDefaultMaxHandlers(n: number): void;
};
/** https://docs.evt.land/api/evt */
export declare const VoidEvt: {
    new (): VoidEvt;
    readonly prototype: VoidEvt;
};
