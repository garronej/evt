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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var _Matcher_1 = require("../types/$Matcher");
function composeMatcher(tm1, tm2) {
    var bPrev = typeof tm1 === "function" ? undefined : tm1[1];
    var f = function (a, cPrev, cbInvokedIfMatched) {
        //console.log({ a, cPrev, cbInvokedIfMatched });
        var bWrap = typeof tm1 === "function" ?
            tm1(a, undefined, cbInvokedIfMatched) :
            tm1[0](a, bPrev, cbInvokedIfMatched);
        if (_Matcher_1.$Matcher.Result.NotMatched.match(bWrap)) {
            return bWrap;
        }
        var _a = __read(bWrap, 1), b = _a[0];
        var cWrap = typeof tm2 === "function" ?
            tm2(b, undefined, cbInvokedIfMatched) :
            tm2[0](b, cPrev, cbInvokedIfMatched);
        if (!!cbInvokedIfMatched &&
            typeof tm1 !== "function" &&
            _Matcher_1.$Matcher.Result.Matched.match(cWrap)) {
            bPrev = b;
        }
        return cWrap;
    };
    return typeof tm2 === "function" ? f : [f, tm2[1]];
}
exports.composeMatcher = composeMatcher;
(function (composeMatcher) {
    function many(args) {
        if (args.length === 1) {
            return args[0];
        }
        var _a = __read(args), tm1 = _a[0], tm2 = _a[1], rest = _a.slice(2);
        return many(__spread([
            composeMatcher(tm1, tm2)
        ], rest));
    }
    composeMatcher.many = many;
})(composeMatcher = exports.composeMatcher || (exports.composeMatcher = {}));
//# sourceMappingURL=composeMatcher.js.map