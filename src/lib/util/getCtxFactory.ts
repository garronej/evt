import { VoidCtx } from "../Ctx";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";

export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, VoidCtx>();

    function getCtx(obj: object): VoidCtx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = new VoidCtx();

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

    return getCtx;

}
