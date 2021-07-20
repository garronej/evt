"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtText = lib_1.Evt.create("foo");
try {
    evtText.pipe(function (text) { return text.startsWith("f") ? null : [text.toUpperCase()]; });
    typeSafety_1.assert(false);
}
catch (_a) { }
var ctx = lib_1.Evt.newCtx();
var evtTextSt = evtText.toStateless(ctx)
    .pipe(function (text) { return text.startsWith("f") ? null : [text.toUpperCase()]; })
    .toStateful();
typeSafety_1.assert(evtTextSt.state === undefined);
evtText.post("foobar");
typeSafety_1.assert(evtTextSt.state === undefined);
evtText.post("baz");
typeSafety_1.assert(evtTextSt.state === "BAZ");
ctx.done();
evtText.post("hello");
typeSafety_1.assert(evtTextSt.state === "BAZ");
console.log("PASS");
//# sourceMappingURL=test90.js.map