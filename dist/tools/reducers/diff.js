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
var reduceify_1 = require("./reduceify");
var contains_1 = require("./contains");
var removeDuplicates_1 = require("./removeDuplicates");
function arrDiff(arr, newArr, areEquals) {
    if (areEquals === void 0) { areEquals = function (e1, e2) { return e1 === e2; }; }
    return {
        "added": newArr
            .reduce.apply(newArr, __spread(removeDuplicates_1.removeDuplicates(areEquals))).filter(function (newEntry) { return !arr.reduce.apply(arr, __spread(contains_1.contains(function (entry) { return areEquals(entry, newEntry); }))); }),
        "removed": arr
            .reduce.apply(arr, __spread(removeDuplicates_1.removeDuplicates(areEquals))).filter(function (entry) { return !newArr.reduce.apply(newArr, __spread(contains_1.contains(function (newEntry) { return areEquals(newEntry, entry); }))); })
    };
}
exports.arrDiff = arrDiff;
function diff(newArr, areEquals) {
    return reduceify_1.toReduceArguments(arrDiff, newArr, areEquals);
}
exports.diff = diff;
function diffFactory(_a) {
    var areEquals = _a.areEquals;
    return { "diff": function (newArr) { return diff(newArr, areEquals); } };
}
exports.diffFactory = diffFactory;
//# sourceMappingURL=diff.js.map