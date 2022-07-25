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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrototypeChain = void 0;
function getPrototypeChain(obj, callback) {
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return [];
    }
    var doContinue = callback === null || callback === void 0 ? void 0 : callback(proto);
    if (!doContinue) {
        return [proto];
    }
    return __spreadArray([proto], __read(getPrototypeChain(proto)), false);
}
exports.getPrototypeChain = getPrototypeChain;
getPrototypeChain.isMatched = function (obj, regExp) {
    var out = false;
    getPrototypeChain(obj, function (_a) {
        var constructor = _a.constructor;
        out = regExp.test(constructor.name);
        return !out;
    });
    return out;
};
//# sourceMappingURL=getPrototypeChain.js.map