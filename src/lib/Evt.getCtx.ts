import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
import { importProxy } from "./importProxy";
type VoidCtx= import("./Ctx").VoidCtx;

export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, VoidCtx>();

    function getCtx(obj: object): VoidCtx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = new importProxy.VoidCtx();

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

    return getCtx;

}
