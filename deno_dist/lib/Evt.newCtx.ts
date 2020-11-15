import { importProxy } from "./importProxy.ts";

type Ctx<Result = any> = import("./Ctx.ts").Ctx<Result>;
type VoidCtx = import("./types/interfaces/index.ts").VoidCtx;

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