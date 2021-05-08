"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtText = lib_1.Evt.create("foo");
evtText.state = "bar";
typeSafety_1.assert(evtText.evtChange.state === "bar");
evtText.state = "baz";
typeSafety_1.assert(evtText.evtChange.state === "baz");
console.log("PASS");
//# sourceMappingURL=test88.js.map