import { Ctx } from "../Ctx";
import { Polyfill as WeakMap } from "minimal-polyfills/dist/lib/WeakMap";
type VoidCtx = import("../Ctx").VoidCtx;

export function getCtxFactory() {

    const ctxByObj = new WeakMap<object, Ctx>();

    function getCtx(obj: object): VoidCtx;
    //function getCtx<T>(obj: object): Ctx<T>;
    function getCtx(obj: object): Ctx {

        let ctx = ctxByObj.get(obj);

        if (ctx === undefined) {

            ctx = new Ctx();

            ctxByObj.set(obj, ctx);

        }

        return ctx;

    }

    return getCtx;

}
