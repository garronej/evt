import "minimal-polyfills/Array.prototype.find";
import { create } from "./Evt.create";
import { getCtxFactory } from "./Evt.getCtx";
import { factorize } from "./Evt.factorize";
import { merge } from "./Evt.merge";
import { from } from "./Evt.from";
import { useEffect } from "./Evt.useEffect";
import { asPostable } from "./Evt.asPostable";
import { asyncPipe } from "./Evt.asyncPipe";
import { asNonPostable } from "./Evt.asNonPostable";
import { newCtx } from "./Evt.newCtx";
import { loosenType } from "./Evt.loosenType";
import type { Handler } from "./types/Handler";
import * as _1 from "./types/Operator";
/** https://docs.evt.land/api/evt */
export declare type Evt<T> = import("./types/interfaces").Evt<T>;
export declare function doDetachIfNeeded<U = any>(handler: Handler<any, U>, opResult: _1.Operator.fλ.Result.Matched<U, any>, once: boolean): void;
export declare function doDetachIfNeeded(handler: Handler<any, any>, opResult: _1.Operator.fλ.Result.NotMatched<any>): void;
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
    readonly factorize: typeof factorize;
    readonly asPostable: typeof asPostable;
    readonly asyncPipe: typeof asyncPipe;
    readonly asNonPostable: typeof asNonPostable;
    /** https://docs.evt.land/api/evt/setdefaultmaxhandlers */
    setDefaultMaxHandlers(n: number): void;
};
