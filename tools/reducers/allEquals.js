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
exports.allEqualsFactory = exports.allEquals = exports.arrAllEquals = void 0;
var allEqualsTo_1 = require("./allEqualsTo");
var reduceify_1 = require("./reduceify");
function arrAllEquals(arr, areEquals) {
    if (areEquals === void 0) { areEquals = function (e1, e2) { return e1 === e2; }; }
    if (arr.length === 0) {
        return true;
    }
    return arr.reduce.apply(arr, __spreadArray([], __read((0, allEqualsTo_1.allEqualsTo)(arr[0], areEquals)), false));
}
exports.arrAllEquals = arrAllEquals;
;
function allEquals(areEquals) {
    return (0, reduceify_1.toReduceArguments)(arrAllEquals, areEquals);
}
exports.allEquals = allEquals;
function allEqualsFactory(_a) {
    var areEquals = _a.areEquals;
    return { "allEquals": function () { return allEquals(areEquals); } };
}
exports.allEqualsFactory = allEqualsFactory;
//# sourceMappingURL=allEquals.js.map