"use strict";
exports.__esModule = true;
require("../tools/polyfill/Object.is");
var Evt_2 = require("./Evt");
var Tracked_from_1 = require("./Tracked.from");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/defineAccessors");
var id_1 = require("../tools/typeSafety/id");
/** https://docs.evt.land/api/tracked */
var Tracked = /** @class */ (function () {
    function Tracked(val) {
        var evtChangeDiff = new Evt_2.Evt();
        this.__postEvtChangeDiff = function (changeDiff) { return evtChangeDiff.post(changeDiff); };
        this.evt = evtChangeDiff.pipe(function (_a) {
            var newVal = _a.newVal;
            return [newVal];
        });
        this.evtDiff = evtChangeDiff;
        this.__val = val;
    }
    Tracked.prototype.forceUpdate = function (newVal) {
        this.__setValAndPost(newVal);
    };
    Tracked.prototype.__setValAndPost = function (newVal) {
        var prevVal = this.__val;
        this.__val = newVal;
        this.__postEvtChangeDiff({ prevVal: prevVal, newVal: newVal });
    };
    /** https://docs.evt.land/api/tracked#tracked-from */
    Tracked.from = Tracked_from_1.from;
    Tracked.__1 = (function () {
        if (false) {
            Tracked.__1;
        }
        defineAccessors_1.defineAccessors(Tracked.prototype, "val", {
            "get": function () { return id_1.id(this).__val; },
            "set": function (newVal) {
                var self = this;
                if (Object.is(self.__val, newVal)) {
                    return;
                }
                self.__setValAndPost(newVal);
            }
        });
    })();
    return Tracked;
}());
exports.Tracked = Tracked;
importProxy_1.importProxy.Tracked = Tracked;
//# sourceMappingURL=Tracked.js.map