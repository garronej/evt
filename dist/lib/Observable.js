"use strict";
exports.__esModule = true;
var Evt_1 = require("./Evt");
var ObservableImpl = /** @class */ (function () {
    function ObservableImpl(initialValue, areSame) {
        var _this_1 = this;
        if (areSame === void 0) { areSame = function (currentValue, newValue) { return currentValue === newValue; }; }
        this.areSame = areSame;
        this.overwriteReadonlyValue = (function () {
            var propertyDescriptor = {
                "configurable": true,
                "enumerable": true,
                "writable": false
            };
            return function (newValue) {
                propertyDescriptor.value = newValue;
                Object.defineProperty(_this_1, "value", propertyDescriptor);
            };
        })();
        {
            var evtChange_1 = new Evt_1.Evt();
            this.evtChange_post = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return evtChange_1.post.apply(evtChange_1, args);
            };
            this.evtChange = evtChange_1;
        }
        this.overwriteReadonlyValue(initialValue);
    }
    /** Return true if the value have been changed */
    ObservableImpl.prototype.onPotentialChange = function (newValue) {
        if (this.areSame(this.value, newValue)) {
            return false;
        }
        var previousValue = this.value;
        this.overwriteReadonlyValue(newValue);
        this.evtChange_post({ previousValue: previousValue, newValue: newValue });
        return true;
    };
    return ObservableImpl;
}());
exports.ObservableImpl = ObservableImpl;
