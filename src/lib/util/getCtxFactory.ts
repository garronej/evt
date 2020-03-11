import { Ctx } from "../Ctx";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";

export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, Ctx>();

    return function getCtx(obj: object): Ctx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = new Ctx();

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

}
