"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtText = lib_1.Evt.create("foo");
var std_out = "";
var ctx = lib_1.Evt.newCtx();
lib_1.Evt.useEffect(function (text) { return std_out += text.toString(); }, evtText.evtChange.pipe(ctx));
typeSafety_1.assert(std_out === "foo");
evtText.state = "foo";
typeSafety_1.assert(std_out === "foo");
evtText.state = "bar";
typeSafety_1.assert(std_out === "foobar");
ctx.done();
evtText.state = "baz";
typeSafety_1.assert(std_out === "foobar");
console.log("PASS");
//# sourceMappingURL=test89.js.map