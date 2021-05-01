import { importProxy } from "./importProxy";
import type { Ctx } from "./Ctx";

/** 
 * https://docs.evt.land/api/evt/newctx
 * 
 * return a new Ctx instance
 * */
export function newCtx<T = void>(): Ctx<T>{
    return new importProxy.Ctx();
}