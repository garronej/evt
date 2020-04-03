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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
function getPrototypeChain(obj, callback) {
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return [];
    }
    var doContinue = callback === null || callback === void 0 ? void 0 : callback(proto);
    if (!doContinue) {
        return [proto];
    }
    return __spread([proto], getPrototypeChain(proto));
}
exports.getPrototypeChain = getPrototypeChain;
(function (getPrototypeChain) {
    function isMatched(obj, regExp) {
        var out = false;
        getPrototypeChain(obj, function (_a) {
            var constructor = _a.constructor;
            out = regExp.test(constructor.name);
            return !out;
        });
        return out;
    }
    getPrototypeChain.isMatched = isMatched;
})(getPrototypeChain = exports.getPrototypeChain || (exports.getPrototypeChain = {}));
//# sourceMappingURL=getPrototypeChain.js.map