"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var isCallableFunction_1 = require("../../tools/isCallableFunction");
var typeSafety_1 = require("../../tools/typeSafety");
var composeOperators_1 = require("./composeOperators");
exports.parseOverloadParamsFactory = (function () {
    function matchAll() { return true; }
    return function parseOverloadParamsFactory(_a) {
        var defaultBoundTo = _a.defaultBoundTo;
        var canBeMatcher = function (p) {
            return isCallableFunction_1.isCallableFunction(p) || (typeof p === "object" &&
                p.length === 2 &&
                isCallableFunction_1.isCallableFunction(p[0]));
        };
        var defaultParams = typeSafety_1.id({
            "op": matchAll,
            "boundTo": defaultBoundTo,
            "timeout": undefined,
            "callback": undefined
        });
        return function parseOverloadParams(inputs, methodName) {
            switch (methodName) {
                case "pipe":
                    {
                        //[]
                        //[ boundTo, ...op[] ]
                        //[ ...op[] ]
                        var getOpWrap = function (ops) {
                            return ops.length === 0 ?
                                {}
                                :
                                    { "op": ops.length === 1 ? ops[0] : composeOperators_1.composeOperators.apply(void 0, __spread(ops)) };
                        };
                        if (canBeMatcher(inputs[0])) {
                            //[ ...op[] ]
                            return typeSafety_1.id(__assign(__assign({}, defaultParams), getOpWrap(inputs)));
                        }
                        else {
                            //[]
                            //[ boundTo, ...Operator.fλ[] ]
                            var _a = __read(inputs), boundTo = _a[0], rest = _a.slice(1);
                            return typeSafety_1.id(__assign(__assign(__assign({}, defaultParams), (boundTo !== undefined ? { boundTo: boundTo } : {})), getOpWrap(rest)));
                        }
                    }
                    break;
                case "createDelegate":
                    {
                        var n = inputs.length
                            -
                                (inputs.length !== 0 &&
                                    inputs[inputs.length - 1] === undefined ?
                                    1 : 0);
                        switch (n) {
                            case 0:
                                return typeSafety_1.id(__assign({}, defaultParams));
                            case 1:
                                //[ op ]
                                //[ boundTo ]
                                var _b = __read(inputs, 1), p = _b[0];
                                return canBeMatcher(p) ? typeSafety_1.id(__assign(__assign({}, defaultParams), { "op": p })) : typeSafety_1.id(__assign(__assign({}, defaultParams), { "boundTo": p }));
                            case 2:
                                //[ op, boundTo ]
                                var _c = __read(inputs, 2), p1 = _c[0], p2 = _c[1];
                                return typeSafety_1.id(__assign(__assign({}, defaultParams), { "op": p1, "boundTo": p2 }));
                        }
                    }
                    break;
                case "waitFor":
                    {
                        var n = inputs.length;
                        if (n === 2) {
                            var _d = __read(inputs, 2), p1 = _d[0], p2 = _d[1];
                            return typeSafety_1.id(__assign(__assign({}, defaultParams), { "op": p1, "timeout": p2 }));
                        }
                        else {
                            var _e = __read(inputs, 1), p = _e[0];
                            return typeSafety_1.id(canBeMatcher(p) ? (__assign(__assign({}, defaultParams), { "op": p })) : (__assign(__assign({}, defaultParams), { "timeout": p })));
                        }
                    }
                    break;
                case "attach*":
                    {
                        //[ op, boundTo, timeout, callback ]
                        //[ op, boundTo, callback ]
                        //[ op, timeout, callback ]
                        //[ boundTo, timeout, callback ]
                        //[ op, callback ]
                        //[ boundTo, callback ]
                        //[ timeout, callback ]
                        //[ callback ]
                        var n = inputs.length;
                        switch (n) {
                            case 4: {
                                //[ op, boundTo, timeout, callback ]
                                var _f = __read(inputs, 4), p1 = _f[0], p2 = _f[1], p3 = _f[2], p4 = _f[3];
                                return typeSafety_1.id(__assign(__assign({}, defaultParams), { "op": p1, "boundTo": p2, "timeout": p3, "callback": p4 }));
                            }
                            case 3: {
                                //[ op, boundTo, callback ]
                                //[ op, timeout, callback ]
                                //[ boundTo, timeout, callback ]
                                var _g = __read(inputs, 3), p1 = _g[0], p2 = _g[1], p3 = _g[2];
                                if (typeof p2 === "number") {
                                    //[ op, timeout, callback ]
                                    //[ boundTo, timeout, callback ]
                                    var timeout = p2;
                                    var callback = p3;
                                    if (canBeMatcher(p1)) {
                                        //[ op, timeout, callback ]
                                        return typeSafety_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                            callback: callback, "op": p1 }));
                                    }
                                    else {
                                        //[ boundTo, timeout, callback ]
                                        return typeSafety_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                            callback: callback, "boundTo": p1 }));
                                    }
                                }
                                else {
                                    //[ op, boundTo, callback ]
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { "op": p1, "boundTo": p2, "callback": p3 }));
                                }
                            }
                            case 2: {
                                //[ op, callback ]
                                //[ boundTo, callback ]
                                //[ timeout, callback ]
                                var _h = __read(inputs, 2), p1 = _h[0], p2 = _h[1];
                                if (typeof p1 === "number") {
                                    //[ timeout, callback ]
                                    return typeSafety_1.id(__assign(__assign({}, defaultParams), { "timeout": p1, "callback": p2 }));
                                }
                                else {
                                    //[ op, callback ]
                                    //[ boundTo, callback ]
                                    var callback = p2;
                                    if (canBeMatcher(p1)) {
                                        return typeSafety_1.id(__assign(__assign({}, defaultParams), { callback: callback, "op": p1 }));
                                    }
                                    else {
                                        return typeSafety_1.id(__assign(__assign({}, defaultParams), { callback: callback, "boundTo": p1 }));
                                    }
                                }
                            }
                            case 1: {
                                //[ callback ]
                                var _j = __read(inputs, 1), p = _j[0];
                                return typeSafety_1.id(__assign(__assign({}, defaultParams), { "callback": p }));
                            }
                            case 0: {
                                return typeSafety_1.id(__assign({}, defaultParams));
                            }
                        }
                    }
                    break;
            }
        };
    };
})();
//# sourceMappingURL=parseOverloadParams.js.map