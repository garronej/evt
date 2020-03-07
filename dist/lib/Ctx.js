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
var Evt_2 = require("./Evt");
var EvtCore_1 = require("./EvtCore");
var assert_1 = require("../tools/typeSafety/assert");
var Set_1 = require("minimal-polyfills/dist/lib/Set");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var id_1 = require("../tools/typeSafety/id");
var Ctx = /** @class */ (function () {
    function Ctx() {
        var _this_1 = this;
        this.evtDetachedInitialPostCount = 0;
        this.evtDetach = undefined;
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
        this.onDetach = function (handlers) {
            if (_this_1.evtDetach === undefined) {
                _this_1.evtDetachedInitialPostCount++;
                return;
            }
            _this_1.evtDetach.post(handlers);
        };
    }
    Ctx.prototype.getEvtDetach = function () {
        if (this.evtDetach === undefined) {
            this.evtDetach = new Evt_2.Evt();
            EvtCore_1.setPostCount(this.evtDetach, this.evtDetachedInitialPostCount);
        }
        return this.evtDetach;
    };
    Ctx.prototype.detach = function (attachedTo) {
        var e_1, _a;
        var _b;
        var out = [];
        try {
            for (var _c = __values(this.handlers.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var handler = _d.value;
                var evt = this.evtByHandler.get(handler);
                if (attachedTo !== undefined &&
                    evt !== attachedTo) {
                    continue;
                }
                var wasStillAttached = handler.detach();
                if (!wasStillAttached) {
                    continue;
                }
                out.push({ handler: handler, evt: evt });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        (_b = this.onDetach) === null || _b === void 0 ? void 0 : _b.call(this, out);
        return out;
    };
    Ctx.prototype.getHandlers = function () {
        var _this_1 = this;
        return Array.from(this.handlers.values())
            .map(function (handler) { return ({ handler: handler, "evt": _this_1.evtByHandler.get(handler) }); });
    };
    Ctx.__addHandlerToCtxCore = function (handler, evt) {
        var ctx = handler.boundTo;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
    };
    Ctx.__removeHandlerFromCtxCore = function (handler) {
        var ctx = handler.boundTo;
        ctx.handlers["delete"](handler);
    };
    //NOTE: Use this instead of instanceof for interoperability between versions.
    Ctx.match = function (boundTo) {
        if (typeof boundTo !== "object") {
            return false;
        }
        var REF_CORE_VERSION = id_1.id(Object.getPrototypeOf(boundTo).constructor).__EVT_CTX_VERSION;
        if (typeof REF_CORE_VERSION !== "number") {
            return false;
        }
        assert_1.assert(REF_CORE_VERSION === Ctx.__EVT_CTX_VERSION, "Compatibility issues between different version of ts-evt");
        return true;
    };
    Ctx.matchHandler = function (handler) {
        return Ctx.match(handler.boundTo);
    };
    Ctx.__CtxForEvtBrand = true;
    Ctx.__EVT_CTX_VERSION = 1;
    return Ctx;
}());
exports.Ctx = Ctx;
//# sourceMappingURL=Ctx.js.map