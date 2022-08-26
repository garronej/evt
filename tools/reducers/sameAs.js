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
exports.sameAsFactory = exports.sameAs = exports.arrSameAs = void 0;
var allEquals_1 = require("./allEquals");
var reduceify_1 = require("./reduceify");
function arrSameAs(arr, otherArr, areSame) {
    var _a;
    if (areSame === void 0) { areSame = function (e1, e2) { return e1 === e2; }; }
    if (!(_a = [arr, otherArr]
        .map(function (_a) {
        var length = _a.length;
        return length;
    }))
        .reduce.apply(_a, __spreadArray([], __read((0, allEquals_1.allEquals)()), false))) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (!areSame(arr[i], otherArr[i])) {
            return false;
        }
    }
    return true;
}
exports.arrSameAs = arrSameAs;
function sameAs(otherArr, areSame) {
    return (0, reduceify_1.toReduceArguments)(arrSameAs, otherArr, areSame);
}
exports.sameAs = sameAs;
function sameAsFactory(_a) {
    var areEquals = _a.areEquals;
    return { "sameAs": function (otherArr) { return sameAs(otherArr, areEquals); } };
}
exports.sameAsFactory = sameAsFactory;
//# sourceMappingURL=sameAs.js.map