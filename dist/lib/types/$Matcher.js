"use strict";
exports.__esModule = true;
var $Matcher;
(function ($Matcher) {
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
    })(Result = $Matcher.Result || ($Matcher.Result = {}));
})($Matcher = exports.$Matcher || (exports.$Matcher = {}));
//# sourceMappingURL=$Matcher.js.map