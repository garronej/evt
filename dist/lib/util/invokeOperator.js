"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operator_1 = require("../types/Operator");
function invokeOperator(op, data, isPost) {
    var result = op(data, undefined, isPost);
    return Operator_1.Operator.fλ.Result.match(result) ?
        result :
        !!result ? [data] : null;
}
exports.invokeOperator = invokeOperator;
//# sourceMappingURL=invokeOperator.js.map