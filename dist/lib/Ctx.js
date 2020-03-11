"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var Set_1 = require("minimal-polyfills/dist/lib/Set");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var getLazyEvtFactory_1 = require("./util/getLazyEvtFactory");
var Ctx = /** @class */ (function () {
    function Ctx() {
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
        {
            var _a = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _a.getEvt, post = _a.post;
            this.onDone = post;
            this.getEvtDone = getEvt;
        }
        {
            var _b = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _b.getEvt, post = _b.post;
            this.getEvtAttach = getEvt;
            this.onAttach = post;
        }
        {
            var _c = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _c.getEvt, post = _c.post;
            this.getEvtDetach = getEvt;
            this.onDetach = post;
        }
    }
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    Ctx.prototype.done = function () {
        var e_1, _a;
        var handlers = [];
        try {
            for (var _b = __values(this.handlers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var evt = this.evtByHandler.get(handler);
                var wasStillAttached = handler.detach();
                //NOTE: It should not be possible
                if (!wasStillAttached) {
                    continue;
                }
                handlers.push({ handler: handler, evt: evt });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.onDone(handlers);
        return handlers;
    };
    Ctx.prototype.getHandlers = function () {
        var _this_1 = this;
        return Array.from(this.handlers.values())
            .map(function (handler) { return ({ handler: handler, "evt": _this_1.evtByHandler.get(handler) }); });
    };
    Ctx.__addHandlerToCtxCore = function (handler, evt) {
        var ctx = handler.ctx;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
        ctx.onAttach({ handler: handler, evt: evt });
    };
    Ctx.__removeHandlerFromCtxCore = function (handler) {
        var ctx = handler.ctx;
        ctx.onDetach({ handler: handler, "evt": ctx.evtByHandler.get(handler) });
        ctx.handlers["delete"](handler);
    };
    Ctx.__matchHandlerBoundToCtx = function (handler) {
        return handler.ctx !== undefined;
    };
    return Ctx;
}());
exports.Ctx = Ctx;
//# sourceMappingURL=Ctx.js.map