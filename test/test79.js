"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtCount = lib_1.Evt.create(0);
{
    var evtCountReadonly = evtCount;
    evtCountReadonly;
}
var std_out = "";
evtCount.evtChange.attach(function (count) { return std_out += count; });
evtCount.state++;
evtCount.state = evtCount.state;
evtCount.postForceChange([evtCount.state + 1]);
evtCount.postForceChange([evtCount.state]);
evtCount.postForceChange();
typeSafety_1.assert(std_out === "1222");
console.log("PASS");
//# sourceMappingURL=test79.js.map