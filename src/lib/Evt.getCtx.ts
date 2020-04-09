import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { importProxy } from "./importProxy";
type VoidCtx = import("./types/interfaces").VoidCtx;

/** 
 * https://docs.evt.land/api/evt/getctx
 * 
 * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, VoidCtx>();

    function getCtx(obj: object): VoidCtx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = (new importProxy.Ctx()) as VoidCtx;

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

    return getCtx;

}
