"use strict";
exports.__esModule = true;
var Evt_1 = require("./Evt");
var EvtBaseProtected_1 = require("./EvtBaseProtected");
;
/** https://garronej.github.io/ts-evt/#observert-documentation */
var ObservableImpl = /** @class */ (function () {
    function ObservableImpl(initialValue, areSame) {
        if (areSame === void 0) { areSame = function (currentValue, newValue) { return currentValue === newValue; }; }
        this.areSame = areSame;
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
    ObservableImpl.prototype.overwriteReadonlyValue = function (newValue) {
        EvtBaseProtected_1.overwriteReadonlyProp(this, "value", newValue);
    };
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
