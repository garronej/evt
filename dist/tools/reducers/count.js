"use strict";
exports.__esModule = true;
var reduceify_1 = require("./reduceify");
function arrCount(arr, matcher) {
    return arr
        .map(function (e) { return matcher(e) ? 1 : 0; })
        .reduce(function (prev, curr) { return prev + curr; }, 0);
}
exports.arrCount = arrCount;
function count(matcher) {
    return reduceify_1.toReduceArguments(arrCount, matcher);
}
exports.count = count;
//# sourceMappingURL=count.js.map