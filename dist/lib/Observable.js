"use strict";
exports.__esModule = true;
var Evt_1 = require("./Evt");
;
/* Implementation of the Observable interface that expose a method to update the value*/
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
                try {
                    Object.defineProperty(_this_1, "value", propertyDescriptor);
                }
                catch (_a) {
                    //For very old browser:
                    _this_1.value = newValue;
                }
            };
        })();
        {
            var evtChangeDiff_1 = new Evt_1.Evt();
            this.evtChangeDiff_post = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evtChange = evtChangeDiff_1.createDelegate(function (_a) {
                var newValue = _a.newValue;
                return [newValue];
            });
            this.evtChangeDiff = evtChangeDiff_1;
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
        this.evtChangeDiff_post({ previousValue: previousValue, newValue: newValue });
        return true;
    };
    return ObservableImpl;
}());
exports.ObservableImpl = ObservableImpl;
