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
exports.__esModule = true;
exports.encapsulateOpState = void 0;
var id_1 = require("../../tools/typeSafety/id");
var _1 = require("../types/Operator");
function encapsulateOpState(statefulFλOp) {
    var state = statefulFλOp[1];
    return id_1.id(function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 3), data = _b[0], cbInvokedIfMatched = _b[2];
        var opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);
        if (!!cbInvokedIfMatched &&
            _1.z_f1.fλ_Result_Matched_match(opResult)) {
            state = opResult[0];
        }
        return opResult;
    });
}
exports.encapsulateOpState = encapsulateOpState;
//# sourceMappingURL=encapsulateOpState.js.map