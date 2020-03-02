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
var assert_1 = require("../tools/typeSafety/assert");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var Set_1 = require("minimal-polyfills/dist/lib/Set");
var HandlerGroupCore = /** @class */ (function () {
    function HandlerGroupCore() {
        this.isHandlerGroup = true;
        this.handlers = new Set_1.Polyfill();
    }
    HandlerGroupCore.prototype.detach = function () {
        var e_1, _a;
        var _b;
        var detachedHandlers = [];
        try {
            for (var _c = __values(this.handlers.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var handler = _d.value;
                var wasStillAttached = handler.detach();
                if (!wasStillAttached) {
                    continue;
                }
                detachedHandlers.push(handler);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        (_b = this.onDetach) === null || _b === void 0 ? void 0 : _b.call(this, detachedHandlers);
        return detachedHandlers;
    };
    HandlerGroupCore.prototype.addHandler = function (handler) {
        this.handlers.add(handler);
    };
    HandlerGroupCore.prototype.removeHandler = function (handler) {
        this.handlers["delete"](handler);
    };
    HandlerGroupCore.match = function (boundTo) {
        assert_1.assert(typeGuard_1.typeGuard.dry(boundTo));
        return !!boundTo.isHandlerGroup;
    };
    return HandlerGroupCore;
}());
exports.HandlerGroupCore = HandlerGroupCore;
//# sourceMappingURL=HandlerGroupCore.js.map