"use strict";
exports.__esModule = true;
var typeSafety_1 = require("../typeSafety");
var reduceify_1 = require("./reduceify");
function arrPartitionImpl(arr, matcher) {
    return arr.reduce(function (previousValue, currentValue) {
        if (matcher(currentValue)) {
            previousValue[0].push(currentValue);
        }
        else {
            //NOTE: Should be deduced by the compiler
            typeSafety_1.assert(typeSafety_1.typeGuard(currentValue));
            previousValue[1].push(currentValue);
        }
        return previousValue;
    }, [[], []]);
}
function arrPartition(arr, matcher) {
    return arrPartitionImpl(arr, function (entry) { return matcher(entry); });
}
exports.arrPartition = arrPartition;
function partition(matcher) {
    return reduceify_1.toReduceArguments(arrPartition, matcher);
}
exports.partition = partition;
//# sourceMappingURL=partition.js.map