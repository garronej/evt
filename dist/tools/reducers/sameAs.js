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
var allEquals_1 = require("./allEquals");
var reduceify_1 = require("./reduceify");
function arrSameAs(arr, otherArr, areSame) {
    var _a;
    if (areSame === void 0) { areSame = function (e1, e2) { return e1 === e2; }; }
    if (!(_a = [arr, otherArr]
        .map(function (_a) {
        var length = _a.length;
        return length;
    })).reduce.apply(_a, __spread(allEquals_1.allEquals()))) {
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
    return reduceify_1.toReduceArguments(arrSameAs, otherArr, areSame);
}
exports.sameAs = sameAs;
function sameAsFactory(_a) {
    var areEquals = _a.areEquals;
    return { "sameAs": function (otherArr) { return sameAs(otherArr, areEquals); } };
}
exports.sameAsFactory = sameAsFactory;
//# sourceMappingURL=sameAs.js.map