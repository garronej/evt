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
var composeOperators_1 = require("../composeOperators");
function scan(accumulator, seed) {
    return composeOperators_1.composeOperators([
        function (data, _a) {
            var _b = __read(_a, 3), acc = _b[1], index = _b[2];
            return [[data, accumulator(acc, data, index), index + 1]];
        },
        [null, seed, 0]
    ], function (_a) {
        var _b = __read(_a, 2), acc = _b[1];
        return [acc];
    });
}
exports.scan = scan;
//# sourceMappingURL=scan.js.map