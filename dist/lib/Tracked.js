"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../tools/polyfill/Object.is");
var Evt_2 = require("./Evt");
var Tracked_from_1 = require("./util/Tracked.from");
var importProxy_1 = require("./importProxy");
var Tracked = /** @class */ (function () {
    function Tracked(val) {
        {
            var evtChangeDiff_1 = new Evt_2.Evt();
            this._postEvtChangeDiff = function (changeDiff) { return evtChangeDiff_1.post(changeDiff); };
            this.evt = evtChangeDiff_1.pipe(function (_a) {
                var newVal = _a.newVal;
                return [newVal];
            });
            this.evtDiff = evtChangeDiff_1;
        }
        this._val = val;
    }
    Object.defineProperty(Tracked.prototype, "val", {
        get: function () {
            return this._val;
        },
        set: function (newVal) {
            if (Object.is(this._val, newVal)) {
                return;
            }
            this._setValAndPost(newVal);
        },
        enumerable: true,
        configurable: true
    });
    Tracked.prototype.forceUpdate = function (newVal) {
        this._setValAndPost(newVal);
    };
    Tracked.prototype._setValAndPost = function (newVal) {
        var prevVal = this._val;
        this._val = newVal;
        this._postEvtChangeDiff({ prevVal: prevVal, newVal: newVal });
    };
    Tracked.from = Tracked_from_1.from;
    return Tracked;
}());
exports.Tracked = Tracked;
importProxy_1.importProxy.Tracked = Tracked;
//# sourceMappingURL=Tracked.js.map