"use strict";
exports.__esModule = true;
var Operator_1 = require("../types/Operator");
function invokeOperator(op, data, cbInvokedIfMatched) {
    var result = op(data, undefined, cbInvokedIfMatched);
    return Operator_1.Operator.fλ.Result.match(result) ?
        result :
        !!result ? [data] : null;
}
exports.invokeOperator = invokeOperator;
//# sourceMappingURL=invokeOperator.js.map