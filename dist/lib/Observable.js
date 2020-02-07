"use strict";
exports.__esModule = true;
var Evt_1 = require("./Evt");
var ObservableImpl = /** @class */ (function () {
    function ObservableImpl(initialValue, areSame) {
        var _this = this;
        if (areSame === void 0) { areSame = function (oldValue, newValue) { return oldValue === newValue; }; }
        this.areSame = areSame;
        this.evtChange = new Evt_1.Evt();
        this.overwriteReadonlyValue = (function () {
            var propertyDescriptor = {
                "configurable": true,
                "enumerable": true,
                "writable": false
            };
            return function (newValue) {
                propertyDescriptor.value = newValue;
                Object.defineProperty(_this, "value", propertyDescriptor);
            };
        })();
        this.overwriteReadonlyValue(initialValue);
    }
    ObservableImpl.prototype.onPotentialChange = function (newValue) {
        if (this.areSame(this.value, newValue)) {
            return;
        }
        this.overwriteReadonlyValue(newValue);
        this.evtChange.post(this.value);
    };
    return ObservableImpl;
}());
exports.ObservableImpl = ObservableImpl;
