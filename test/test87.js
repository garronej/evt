"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtIsBlue = lib_1.Evt.create(false);
var evtIsBig = lib_1.Evt.create(false);
var evtIsBigAndBlue = lib_1.Evt.merge([
    evtIsBlue.evtChange,
    evtIsBig.evtChange
])
    .toStateful()
    .pipe(function () { return [evtIsBlue.state && evtIsBig.state]; });
typeSafety_1.assert(evtIsBigAndBlue.state === false);
evtIsBlue.state = true;
typeSafety_1.assert(evtIsBigAndBlue.state === false);
evtIsBig.state = true;
typeSafety_1.assert(evtIsBigAndBlue.state === true);
console.log("PASS");
//# sourceMappingURL=test87.js.map