"use strict";
exports.__esModule = true;
function invokeOperator(op, data, cbInvokedIfMatched) {
    var result = op(data, undefined, cbInvokedIfMatched);
    //NOTE: We assume it was a $matcher only 
    //if the returned value is a singleton or a couple, otherwise 
    //we assume it was a filtering matcher that should have returned
    //a boolean but returned something else.
    return (result === null ? null :
        result === "DETACH" ? "DETACH" :
            typeof result === "object" &&
                (result.length === 1 || result.length === 2) ? result :
                !!result ? [data] : null);
}
exports.invokeOperator = invokeOperator;
//# sourceMappingURL=invokeOperator.js.map