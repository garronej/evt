"use strict";
exports.__esModule = true;
var Evt_2 = require("./Evt");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var observableFrom_1 = require("./util/observableFrom");
;
/** https://docs.evt.land/api/observable */
var Observable = /** @class */ (function () {
    function Observable(initialValue, areSame) {
        if (areSame === void 0) { areSame = function (currentValue, newValue) { return currentValue === newValue; }; }
        this.areSame = areSame;
        {
            var evtChangeDiff_1 = new Evt_2.Evt();
            this.evtChangeDiff_post = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evtChange = evtChangeDiff_1.pipe(function (_a) {
                var newValue = _a.newValue;
                return [newValue];
            });
            this.evtChangeDiff = evtChangeDiff_1;
        }
        overwriteReadonlyProp_1.overwriteReadonlyProp(this, "value", initialValue);
    }
    /** Return true if the value have been changed */
    Observable.prototype.onPotentialChange = function (newValue) {
        if (this.areSame(this.value, newValue)) {
            return false;
        }
        var previousValue = this.value;
        overwriteReadonlyProp_1.overwriteReadonlyProp(this, "value", newValue);
        this.evtChangeDiff_post({ previousValue: previousValue, newValue: newValue });
        return true;
    };
    /*** https://docs.evt.land/api/observable#observable-from */
    Observable.from = observableFrom_1.from;
    return Observable;
}());
exports.Observable = Observable;
importProxy_1.importProxy.Observable = Observable;
//# sourceMappingURL=Observable.js.map