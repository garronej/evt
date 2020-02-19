"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var EvtBaseProtected_1 = require("./EvtBaseProtected");
var id = function (x) { return x; };
/** NOTE: constructors are of type "function" but are not callable,
 * without the new keyword.
 * This function will return true if and only if the object passed is
 * a function and it is not a constructor.
 */
function isCallable(o) {
    if (typeof o !== "function") {
        return false;
    }
    var prototype = o["prototype"];
    if (!prototype)
        return true;
    var methods = Object.getOwnPropertyNames(prototype);
    if (methods.length !== 1)
        return false;
    var name = o.name;
    if (!name)
        return true;
    if (name[0].toUpperCase() === name[0])
        return false;
    return true;
}
/** Evt without evtAttach property, attachOnceMatched and createDelegate */
var EvtBase = /** @class */ (function (_super) {
    __extends(EvtBase, _super);
    function EvtBase() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.defaultParams = {
            "matcher": function matchAll() { return true; },
            "boundTo": _this_1,
            "timeout": undefined,
            "callback": undefined
        };
        return _this_1;
    }
    EvtBase.prototype.readParams = function (inputs) {
        //[ matcher, boundTo, timeout, callback ]
        //[ matcher, boundTo, callback ]
        //[ matcher, timeout, callback ]
        //[ boundTo, timeout, callback ]
        //[ matcher, callback ]
        //[ boundTo, callback ]
        //[ timeout, callback ]
        //[ callback ]
        var n = inputs.length;
        switch (n) {
            case 4: {
                //[ matcher, boundTo, timeout, callback ]
                var p1 = inputs[0], p2 = inputs[1], p3 = inputs[2], p4 = inputs[3];
                return id(__assign(__assign({}, this.defaultParams), { "matcher": p1, "boundTo": p2, "timeout": p3, "callback": p4 }));
            }
            case 3: {
                //[ matcher, boundTo, callback ]
                //[ matcher, timeout, callback ]
                //[ boundTo, timeout, callback ]
                var p1 = inputs[0], p2 = inputs[1], p3 = inputs[2];
                if (typeof p2 === "number") {
                    //[ matcher, timeout, callback ]
                    //[ boundTo, timeout, callback ]
                    var timeout = p2;
                    var callback = p3;
                    if (isCallable(p1)) {
                        //[ matcher, timeout, callback ]
                        return id(__assign(__assign({}, this.defaultParams), { timeout: timeout,
                            callback: callback, "matcher": p1 }));
                    }
                    else {
                        //[ boundTo, timeout, callback ]
                        return id(__assign(__assign({}, this.defaultParams), { timeout: timeout,
                            callback: callback, "boundTo": p1 }));
                    }
                }
                else {
                    //[ matcher, boundTo, callback ]
                    return id(__assign(__assign({}, this.defaultParams), { "matcher": p1, "boundTo": p2, "callback": p3 }));
                }
            }
            case 2: {
                //[ matcher, callback ]
                //[ boundTo, callback ]
                //[ timeout, callback ]
                var p1 = inputs[0], p2 = inputs[1];
                if (typeof p1 === "number") {
                    //[ timeout, callback ]
                    return id(__assign(__assign({}, this.defaultParams), { "timeout": p1, "callback": p2 }));
                }
                else {
                    //[ matcher, callback ]
                    //[ boundTo, callback ]
                    var callback = p2;
                    if (isCallable(p1)) {
                        return id(__assign(__assign({}, this.defaultParams), { callback: callback, "matcher": p1 }));
                    }
                    else {
                        return id(__assign(__assign({}, this.defaultParams), { callback: callback, "boundTo": p1 }));
                    }
                }
            }
            case 1: {
                //[ callback ]
                var p = inputs[0];
                return id(__assign(__assign({}, this.defaultParams), { "callback": p }));
            }
            case 0: {
                return id(__assign({}, this.defaultParams));
            }
        }
    };
    EvtBase.prototype.waitFor = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var params;
        var n = inputs.length;
        if (n === 2) {
            var p1 = inputs[0], p2 = inputs[1];
            params = id(__assign(__assign({}, this.defaultParams), { "matcher": p1, "timeout": p2 }));
        }
        else {
            var p = inputs[0];
            params = id(isCallable(p) ? (__assign(__assign({}, this.defaultParams), { "matcher": p })) : (__assign(__assign({}, this.defaultParams), { "timeout": p })));
        }
        return _super.prototype.__waitFor.call(this, params);
    };
    EvtBase.prototype.$attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attach.apply(this, inputs);
    };
    EvtBase.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach(this.readParams(inputs));
    };
    EvtBase.prototype.$attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnce.apply(this, inputs);
    };
    EvtBase.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnce(this.readParams(inputs));
    };
    EvtBase.prototype.$attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, inputs);
    };
    EvtBase.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachExtract(this.readParams(inputs));
    };
    EvtBase.prototype.$attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachPrepend.apply(this, inputs);
    };
    EvtBase.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachPrepend(this.readParams(inputs));
    };
    EvtBase.prototype.$attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOncePrepend.apply(this, inputs);
    };
    EvtBase.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOncePrepend(this.readParams(inputs));
    };
    EvtBase.prototype.$attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, inputs);
    };
    EvtBase.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnceExtract(this.readParams(inputs));
    };
    return EvtBase;
}(EvtBaseProtected_1.EvtBaseProtected));
exports.EvtBase = EvtBase;
//# sourceMappingURL=EvtBase.js.map