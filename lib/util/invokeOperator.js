"use strict";
exports.__esModule = true;
exports.invokeOperator = void 0;
var _1 = require("../types/Operator");
function invokeOperator(op, data, isPost) {
    var result = op(data, undefined, isPost);
    return _1.z_f1.fλ_Result_match(result) ?
        result :
        !!result ? [data] : null;
}
exports.invokeOperator = invokeOperator;
//# sourceMappingURL=invokeOperator.js.map