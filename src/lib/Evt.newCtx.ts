import { importProxy } from "./importProxy";
import type { Ctx } from "./Ctx";
import type { VoidCtx } from "./types";

/** 
 * https://docs.evt.land/api/evt/newctx
 * 
 * return a new Ctx instance
 * */
export function newCtx(): VoidCtx;
export function newCtx<T>(): Ctx<T>;
export function newCtx(): Ctx<any> {
    return new importProxy.Ctx();
}