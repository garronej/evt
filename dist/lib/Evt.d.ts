import "minimal-polyfills/dist/lib/Array.prototype.find";
import { getCtxFactory } from "./Evt.getCtx";
import { merge } from "./Evt.merge";
import { from } from "./Evt.from";
import { useEffect } from "./Evt.useEffect";
import { loosenType } from "./Evt.loosenType";
declare type Ctx<Result = any> = import("./Ctx").Ctx<Result>;
declare type VoidCtx = import("./Ctx").VoidCtx;
export declare type Evt<T> = import("./types/interfaces").Evt<T>;
export declare const Evt: {
    new <T>(): Evt<T>;
    readonly prototype: Evt<any>;
    /**
     * https://docs.evt.land/api/evt/newctx
     *
     * return a new Ctx instance
     * */
    newCtx(): VoidCtx;
    newCtx<T>(): Ctx<T>;
    readonly merge: typeof merge;
    readonly from: typeof from;
    readonly useEffect: typeof useEffect;
    readonly getCtx: ReturnType<typeof getCtxFactory>;
    readonly loosenType: typeof loosenType;
    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    setDefaultMaxHandlers(n: number): void;
};
/** https://docs.evt.land/api/voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
export {};
