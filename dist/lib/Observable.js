"use strict";
exports.__esModule = true;
var Evt_1 = require("./Evt");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
;
/** https://garronej.github.io/ts-evt/#observert-documentation */
var Observable = /** @class */ (function () {
    function Observable(initialValue, areSame) {
        if (areSame === void 0) { areSame = function (currentValue, newValue) { return currentValue === newValue; }; }
        this.areSame = areSame;
        {
            var evtChangeDiff_1 = new Evt_1.Evt();
            this.evtChangeDiff_post = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evtChange = evtChangeDiff_1.pipe(function (_a) {
                var newValue = _a.newValue;
                return [newValue];
            });
            this.evtChangeDiff = evtChangeDiff_1;
        }
        this.overwriteReadonlyValue(initialValue);
    }
    Observable.prototype.overwriteReadonlyValue = function (newValue) {
        overwriteReadonlyProp_1.overwriteReadonlyProp(this, "value", newValue);
    };
    /** Return true if the value have been changed */
    Observable.prototype.onPotentialChange = function (newValue) {
        if (this.areSame(this.value, newValue)) {
            return false;
        }
        var previousValue = this.value;
        this.overwriteReadonlyValue(newValue);
        this.evtChangeDiff_post({ previousValue: previousValue, newValue: newValue });
        return true;
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map