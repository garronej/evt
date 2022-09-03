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
exports.allEqualsToFactory = exports.allEqualsTo = exports.arrAllEqualsTo = void 0;
var reduceify_1 = require("./reduceify");
var every_1 = require("./every");
function arrAllEqualsTo(arr, to, areEquals) {
    if (areEquals === void 0) { areEquals = function (e, to) { return e === to; }; }
    return arr.reduce.apply(arr, __spreadArray([], __read((0, every_1.every)(function (e) { return areEquals(e, to); })), false));
}
exports.arrAllEqualsTo = arrAllEqualsTo;
;
function allEqualsTo(to, areEquals) {
    return (0, reduceify_1.toReduceArguments)(arrAllEqualsTo, to, areEquals);
}
exports.allEqualsTo = allEqualsTo;
function allEqualsToFactory(_a) {
    var areEquals = _a.areEquals;
    return { "allEqualsTo": function (to) { return allEqualsTo(to, areEquals); } };
}
exports.allEqualsToFactory = allEqualsToFactory;
//# sourceMappingURL=allEqualsTo.js.map