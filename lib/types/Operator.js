"use strict";
exports.__esModule = true;
exports.Operator = exports.z_f1 = void 0;
var typeSafety_1 = require("../../tools/typeSafety");
exports.z_f1 = {
    "fλ_Stateful_match": function match(op) {
        return typeof op !== "function";
    },
    "fλ_Result_match": function match(result) {
        return exports.z_f1.fλ_Result_Matched_match(result) || exports.z_f1.fλ_Result_NotMatched_match(result);
    },
    "fλ_Result_getDetachArg": function getDetachArg(result) {
        var detach = exports.z_f1.fλ_Result_Matched_match(result) ? result[1] : result;
        if (exports.z_f1.fλ_Result_Detach_FromEvt_match(detach)) {
            return true;
        }
        if (exports.z_f1.fλ_Result_Detach_WithCtxArg_match(detach)) {
            return [
                detach.DETACH,
                detach.err,
                detach.res
            ];
        }
        return false;
    },
    "fλ_Result_NotMatched_match": function match(result) {
        return (result === null ||
            exports.z_f1.fλ_Result_Detach_match(result));
    },
    "fλ_Result_Matched_match": function match(result) {
        return (typeSafety_1.typeGuard(result) &&
            result instanceof Object &&
            !("input" in result) && //exclude String.prototype.match
            (result.length === 1 ||
                (result.length === 2 &&
                    (result[1] === null ||
                        exports.z_f1.fλ_Result_Detach_match(result[1])))));
    },
    "fλ_Result_Detach_FromEvt_match": function match(detach) {
        return detach === "DETACH";
    },
    "fλ_Result_Detach_WithCtxArg_match": function match(detach) {
        return (typeSafety_1.typeGuard(detach) &&
            detach instanceof Object &&
            detach.DETACH instanceof Object);
    },
    "fλ_Result_Detach_match": function match(detach) {
        return exports.z_f1.fλ_Result_Detach_FromEvt_match(detach) || exports.z_f1.fλ_Result_Detach_WithCtxArg_match(detach);
    }
};
var Operator;
(function (Operator) {
    var fλ;
    (function (fλ) {
        var Stateful;
        (function (Stateful) {
            Stateful.match = exports.z_f1.fλ_Stateful_match;
        })(Stateful = fλ.Stateful || (fλ.Stateful = {}));
        var Result;
        (function (Result) {
            Result.match = exports.z_f1.fλ_Result_match;
            Result.getDetachArg = exports.z_f1.fλ_Result_getDetachArg;
            var NotMatched;
            (function (NotMatched) {
                NotMatched.match = exports.z_f1.fλ_Result_NotMatched_match;
            })(NotMatched = Result.NotMatched || (Result.NotMatched = {}));
            var Matched;
            (function (Matched) {
                Matched.match = exports.z_f1.fλ_Result_Matched_match;
            })(Matched = Result.Matched || (Result.Matched = {}));
            var Detach;
            (function (Detach) {
                var FromEvt;
                (function (FromEvt) {
                    FromEvt.match = exports.z_f1.fλ_Result_Detach_FromEvt_match;
                })(FromEvt = Detach.FromEvt || (Detach.FromEvt = {}));
                var WithCtxArg;
                (function (WithCtxArg) {
                    WithCtxArg.match = exports.z_f1.fλ_Result_Detach_WithCtxArg_match;
                })(WithCtxArg = Detach.WithCtxArg || (Detach.WithCtxArg = {}));
                Detach.match = exports.z_f1.fλ_Result_Detach_match;
            })(Detach = Result.Detach || (Result.Detach = {}));
        })(Result = fλ.Result || (fλ.Result = {}));
    })(fλ = Operator.fλ || (Operator.fλ = {}));
})(Operator = exports.Operator || (exports.Operator = {}));
//# sourceMappingURL=Operator.js.map