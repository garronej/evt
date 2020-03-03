"use strict";
exports.__esModule = true;
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
            var Detach;
            (function (Detach) {
                function match($result) {
                    return $result === "DETACH";
                }
                Detach.match = match;
            })(Detach = Result.Detach || (Result.Detach = {}));
            var NotMatched;
            (function (NotMatched) {
                function match($result) {
                    return ($result === null ||
                        Detach.match($result));
                }
                NotMatched.match = match;
            })(NotMatched = Result.NotMatched || (Result.NotMatched = {}));
            var Matched;
            (function (Matched) {
                function match($result) {
                    return !NotMatched.match($result);
                }
                Matched.match = match;
            })(Matched = Result.Matched || (Result.Matched = {}));
        })(Result = fλ.Result || (fλ.Result = {}));
        //const o: fλ<any,any> = null as any as Once<any, any>;
    })(fλ = Operator.fλ || (Operator.fλ = {}));
})(Operator = exports.Operator || (exports.Operator = {}));
/*
function f<T,U,V>(m1: Matcher<T,U>, m2: Matcher<U,V>){
}

f(
(data: string) => [data] as const,
data => [data.length] as const
);
*/
//# sourceMappingURL=Operator.js.map