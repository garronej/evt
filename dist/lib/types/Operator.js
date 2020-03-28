"use strict";
exports.__esModule = true;
var typeSafety_1 = require("../../tools/typeSafety");
var Operator;
(function (Operator) {
    var fλ;
    (function (fλ) {
        var Stateful;
        (function (Stateful) {
            function match(op) {
                return typeof op !== "function";
            }
            Stateful.match = match;
        })(Stateful = fλ.Stateful || (fλ.Stateful = {}));
        var Result;
        (function (Result) {
            function match(result) {
                return Matched.match(result) || NotMatched.match(result);
            }
            Result.match = match;
            function getDetachArg(result) {
                var detach = Matched.match(result) ? result[1] : result;
                if (Detach.FromEvt.match(detach)) {
                    return true;
                }
                if (Detach.WithCtxArg.match(detach)) {
                    return [
                        detach.DETACH,
                        detach.err,
                        detach.res
                    ];
                }
                return false;
            }
            Result.getDetachArg = getDetachArg;
            var NotMatched;
            (function (NotMatched) {
                function match(result) {
                    return (result === null ||
                        Detach.match(result));
                }
                NotMatched.match = match;
            })(NotMatched = Result.NotMatched || (Result.NotMatched = {}));
            var Matched;
            (function (Matched) {
                function match(result) {
                    return (typeSafety_1.typeGuard(result) &&
                        result instanceof Object &&
                        !("input" in result) && //exclude String.prototype.match
                        (result.length === 1 ||
                            (result.length === 2 &&
                                (result[1] === null ||
                                    Detach.match(result[1])))));
                }
                Matched.match = match;
            })(Matched = Result.Matched || (Result.Matched = {}));
            var Detach;
            (function (Detach) {
                var FromEvt;
                (function (FromEvt) {
                    function match(detach) {
                        return detach === "DETACH";
                    }
                    FromEvt.match = match;
                })(FromEvt = Detach.FromEvt || (Detach.FromEvt = {}));
                var WithCtxArg;
                (function (WithCtxArg) {
                    function match(detach) {
                        return (typeSafety_1.typeGuard(detach) &&
                            detach instanceof Object &&
                            detach.DETACH instanceof Object);
                    }
                    WithCtxArg.match = match;
                })(WithCtxArg = Detach.WithCtxArg || (Detach.WithCtxArg = {}));
                function match(detach) {
                    return FromEvt.match(detach) || WithCtxArg.match(detach);
                }
                Detach.match = match;
            })(Detach = Result.Detach || (Result.Detach = {}));
        })(Result = fλ.Result || (fλ.Result = {}));
    })(fλ = Operator.fλ || (Operator.fλ = {}));
})(Operator = exports.Operator || (exports.Operator = {}));
//# sourceMappingURL=Operator.js.map