"use strict";
exports.__esModule = true;
var Evt_2 = require("./Evt");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var observableFrom_1 = require("./util/observableFrom");
var inDepth = require("../tools/inDepth");
;
/** https://docs.evt.land/api/observable */
var Observable = /** @class */ (function () {
    function Observable(initialValue, same) {
        if (same === void 0) { same = inDepth.same; }
        this.same = same;
        {
            var evtChangeDiff_1 = new Evt_2.Evt();
            this.evtChangeDiff_post = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evt = evtChangeDiff_1.pipe(function (_a) {
                var currVal = _a.currVal;
                return [currVal];
            });
            this.evtDiff = evtChangeDiff_1;
        }
        this.setVal(initialValue);
    }
    Observable.prototype.setVal = function (val) {
        return overwriteReadonlyProp_1.overwriteReadonlyProp(this, "val", inDepth.copy(val, { "freeze": true }));
    };
    /** Return true if the value have been changed */
    Observable.prototype.update = function (val) {
        if (this.same(this.val, val)) {
            return false;
        }
        var prevVal = this.val;
        this.evtChangeDiff_post({ prevVal: prevVal, "currVal": this.setVal(val) });
        return true;
    };
    /*** https://docs.evt.land/api/observable#observable-from */
    Observable.from = observableFrom_1.from;
    return Observable;
}());
exports.Observable = Observable;
importProxy_1.importProxy.Observable = Observable;
//# sourceMappingURL=Observable.js.map