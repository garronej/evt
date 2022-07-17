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
exports.allUniqFactory = exports.allUniq = exports.arrAllUniq = void 0;
var removeDuplicates_1 = require("./removeDuplicates");
var allEquals_1 = require("./allEquals");
var reduceify_1 = require("./reduceify");
function arrAllUniq(arr, areEquals) {
    var _a;
    if (areEquals === void 0) { areEquals = function (e1, e2) { return e1 === e2; }; }
    return (_a = [
        arr.reduce.apply(arr, __spreadArray([], __read((0, removeDuplicates_1.removeDuplicates)(areEquals)), false)),
        arr
    ]
        .map(function (arr) { return arr.length; }))
        .reduce.apply(_a, __spreadArray([], __read((0, allEquals_1.allEquals)(function (x1, x2) { return x1 === x2; })), false));
}
exports.arrAllUniq = arrAllUniq;
function allUniq(areEquals) {
    return (0, reduceify_1.toReduceArguments)(arrAllUniq, areEquals);
}
exports.allUniq = allUniq;
function allUniqFactory(_a) {
    var areEquals = _a.areEquals;
    return { "allUniq": function () { return allUniq(areEquals); } };
}
exports.allUniqFactory = allUniqFactory;
//# sourceMappingURL=allUniq.js.map