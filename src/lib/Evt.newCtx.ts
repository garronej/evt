import { importProxy } from "./importProxy";

type Ctx<Result = any> = import("./Ctx").Ctx<Result>;
type VoidCtx = import("./Ctx").VoidCtx;

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