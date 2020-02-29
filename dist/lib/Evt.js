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
var EvtCompat_1 = require("./EvtCompat");
/*
WARNING -- This class is dead code until the TypeScript team fixes
https://github.com/microsoft/TypeScript/issues/36735

EvtCompat is the class exported by the module as Evt.

In current typescript we cannot includes in the same overload
the definition using a transformative matcher so we have
to define other methods that uses the $ prefix as a workaround.

In the future this limitation may fall off, it will be possible, then
to use this class and the '$' wont be needed anymore.

*/
var Evt = /** @class */ (function (_super) {
    __extends(Evt, _super);
    function Evt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Evt.prototype.__createDelegate = function (matcher, boundTo) {
        var evtDelegate = new Evt();
        this.$attach(matcher, boundTo, function (transformedData) { return evtDelegate.post(transformedData); });
        return evtDelegate;
    };
    Evt.prototype.createDelegate = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.createDelegate.apply(this, __spread(inputs));
    };
    Evt.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attach.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOnce.apply(this, __spread(inputs));
    };
    Evt.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachExtract.apply(this, __spread(inputs));
    };
    Evt.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachPrepend.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOncePrepend.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOnceExtract.apply(this, __spread(inputs));
    };
    return Evt;
}(EvtCompat_1.EvtCompat));
exports.Evt = Evt;
var VoidEvt = /** @class */ (function (_super) {
    __extends(VoidEvt, _super);
    function VoidEvt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidEvt;
}(Evt));
exports.VoidEvt = VoidEvt;
//# sourceMappingURL=Evt.js.map