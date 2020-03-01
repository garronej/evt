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
var defs_1 = require("../defs");
function compose(tm1, tm2) {
    var bPrev = typeof tm1 === "function" ? undefined : tm1[1];
    var f = function (a, cPrev, cbInvokedIfMatched) {
        //console.log({ a, cPrev, cbInvokedIfMatched });
        var bWrap = typeof tm1 === "function" ?
            tm1(a, undefined, cbInvokedIfMatched) :
            tm1[0](a, bPrev, cbInvokedIfMatched);
        if (defs_1.TransformativeMatcher.Returns.NotMatched.match(bWrap)) {
            return null;
        }
        var _a = __read(bWrap, 1), b = _a[0];
        var cWrap = typeof tm2 === "function" ?
            tm2(b, undefined, cbInvokedIfMatched) :
            tm2[0](b, cPrev, cbInvokedIfMatched);
        if (!!cbInvokedIfMatched &&
            typeof tm1 !== "function" &&
            !defs_1.TransformativeMatcher.Returns.NotMatched.match(cWrap)) {
            bPrev = b;
        }
        return cWrap;
    };
    return typeof tm2 === "function" ? f : [f, tm2[1]];
}
exports.compose = compose;
/** assert args length !== 0 */
function composeMany(args) {
    if (args.length === 0) {
        throw new Error();
    }
    if (args.length === 1) {
        return args[0];
    }
    var _a = __read(args), tm1 = _a[0], tm2 = _a[1], rest = _a.slice(2);
    return composeMany(__spread([
        compose(tm1, tm2)
    ], rest));
}
exports.composeMany = composeMany;
function scan(accumulator, seed) {
    return [
        function (data, _a) {
            var _b = __read(_a, 3), acc = _b[1], index = _b[2];
            return [[data, accumulator(acc, data, index), index + 1]];
        },
        [null, seed, 0]
    ];
}
exports.scan = scan;
function throttleTime(duration) {
    return compose([
        function (data, _a) {
            var lastClick = _a.lastClick;
            var now = Date.now();
            return now - lastClick < duration ?
                null :
                [{ data: data, "lastClick": now }];
        },
        { "lastClick": 0, "data": null }
    ], function (_a) {
        var data = _a.data;
        return [data];
    });
}
exports.throttleTime = throttleTime;
//# sourceMappingURL=composeMatcher.js.map