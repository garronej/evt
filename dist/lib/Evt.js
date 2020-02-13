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
exports.__esModule = true;
var EvtCompat_1 = require("./EvtCompat");
//Merge into overloads the methods using mutational callbacks alongside callbacks.
//Might be working in future version of typescript but as for Feb 2020 EvtCompat should be used instead.
var Evt = /** @class */ (function (_super) {
    __extends(Evt, _super);
    function Evt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Evt.prototype.__createDelegate = function (matcher) {
        var evtDelegate = new Evt();
        this.$attach(matcher, function (transformedData) { return evtDelegate.post(transformedData); });
        return evtDelegate;
    };
    Evt.prototype.createDelegate = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.createDelegate.apply(this, inputs);
    };
    Evt.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attach.apply(this, inputs);
    };
    Evt.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOnce.apply(this, inputs);
    };
    Evt.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachExtract.apply(this, inputs);
    };
    Evt.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachPrepend.apply(this, inputs);
    };
    Evt.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOncePrepend.apply(this, inputs);
    };
    Evt.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return _super.prototype.attachOnceExtract.apply(this, inputs);
    };
    return Evt;
}(EvtCompat_1.EvtCompat));
exports.Evt = Evt;
var VoidEvt = /** @class */ (function (_super) {
    __extends(VoidEvt, _super);
    function VoidEvt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidEvt.prototype.post = function () {
        return _super.prototype.post.call(this, undefined);
    };
    VoidEvt.prototype.postOnceMatched = function () {
        return _super.prototype.postOnceMatched.call(this, undefined);
    };
    return VoidEvt;
}(Evt));
exports.VoidEvt = VoidEvt;
