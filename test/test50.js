"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtAge = new lib_1.Evt();
var p_;
evtAge.$attach([function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 2), prev = _b[1];
        return [prev + 1];
    }, 0], lib_1.Evt.newCtx(), function (p) { return p_ = p; });
evtAge.post(1);
evtAge.post(1);
evtAge.post(1);
typeSafety_1.assert(p_ === 3);
console.log("PASS");
//# sourceMappingURL=test50.js.map