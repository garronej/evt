"use strict";
exports.__esModule = true;
var typeSafety_1 = require("../typeSafety");
var reduceify_1 = require("./reduceify");
function arrSplitImpl(arr, matcher) {
    return arr.reduce(function (previousValue, currentValue) {
        if (matcher(currentValue)) {
            previousValue[0].push(currentValue);
        }
        else {
            //NOTE: Should be deduced by the compiler
            typeSafety_1.assert(typeSafety_1.typeGuard.dry(currentValue));
            previousValue[1].push(currentValue);
        }
        return previousValue;
    }, [[], []]);
}
function arrSplit(arr, matcher) {
    return arrSplitImpl(arr, function (entry) { return matcher(entry); });
}
exports.arrSplit = arrSplit;
function split(matcher) {
    return reduceify_1.toReduceArguments(arrSplit, matcher);
}
exports.split = split;
//# sourceMappingURL=split.js.map