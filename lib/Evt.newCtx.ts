import { importProxy } from "./importProxy.ts";
import type { Ctx as _Ctx } from "./Ctx.ts";


type Ctx<Result = any> = _Ctx<Result>;

import type { VoidCtx } from "./types/interfaces/index.ts";

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