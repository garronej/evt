"use strict";
exports.__esModule = true;
var Ctx_1 = require("../Ctx");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
function getCtxFactory() {
    var ctxByObj = new WeakMap_1.Polyfill();
    function getCtx(obj) {
        var ctx = ctxByObj.get(obj);
        if (ctx === undefined) {
            ctx = new Ctx_1.VoidCtx();
            ctxByObj.set(obj, ctx);
        }
        return ctx;
    }
    return getCtx;
}
exports.getCtxFactory = getCtxFactory;
//# sourceMappingURL=getCtxFactory.js.map