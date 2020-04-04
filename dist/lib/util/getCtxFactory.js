"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var importProxy_1 = require("../importProxy");
function getCtxFactory() {
    var ctxByObj = new WeakMap_1.Polyfill();
    function getCtx(obj) {
        var ctx = ctxByObj.get(obj);
        if (ctx === undefined) {
            ctx = new importProxy_1.importProxy.VoidCtx();
            ctxByObj.set(obj, ctx);
        }
        return ctx;
    }
    return getCtx;
}
exports.getCtxFactory = getCtxFactory;
//# sourceMappingURL=getCtxFactory.js.map