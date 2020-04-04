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
exports.__esModule = true;
var Evt_2 = require("./Evt");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var staticFrom = require("./util/observableFrom");
require("../tools/polyfill/Object.is");
var inDepth = require("../tools/inDepth");
;
/** https://docs.evt.land/api/observable */
var Observable = /** @class */ (function () {
    function Observable(val, same, copy) {
        if (same === void 0) { same = Object.is; }
        this.same = same;
        this.copy = copy;
        {
            var evtChangeDiff_1 = new Evt_2.Evt();
            this.evtChangeDiff_post = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evt = evtChangeDiff_1.pipe(function (_a) {
                var currVal = _a.currVal;
                return [currVal];
            });
            this.evtDiff = evtChangeDiff_1;
        }
        this.setVal(val);
    }
    Observable.prototype.setVal = function (val) {
        return overwriteReadonlyProp_1.overwriteReadonlyProp(this, "val", this.copy ? this.copy(val) : val);
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
    Observable.prototype.forceUpdate = function (valWrap) {
        if (valWrap === undefined) {
            this.evtChangeDiff_post({
                "prevVal": this.val,
                "currVal": this.val
            });
        }
        else {
            var _a = __read(valWrap, 1), val = _a[0];
            if (this.same(this.val, val)) {
                this.forceUpdate();
                return;
            }
            this.update(val);
        }
    };
    /*** https://docs.evt.land/api/observable#observable-from */
    Observable.from = staticFrom.from;
    return Observable;
}());
exports.Observable = Observable;
importProxy_1.importProxy.Observable = Observable;
var ObservableInDepth = /** @class */ (function (_super) {
    __extends(ObservableInDepth, _super);
    function ObservableInDepth(val, same) {
        return _super.call(this, val, same !== null && same !== void 0 ? same : inDepth.same, inDepth.copy) || this;
    }
    /*** https://docs.evt.land/api/observable#observable-from */
    ObservableInDepth.from = staticFrom.inDepth.from;
    return ObservableInDepth;
}(Observable));
exports.ObservableInDepth = ObservableInDepth;
importProxy_1.importProxy.ObservableInDepth = ObservableInDepth;
//# sourceMappingURL=Observable.js.map