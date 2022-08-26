"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var evtText = lib_1.Evt.create("foo");
try {
    evtText.pipe(function (text) { return text.startsWith("f") ? null : [text.toUpperCase()]; });
    (0, assert_1.assert)(false);
}
catch (_a) { }
var ctx = lib_1.Evt.newCtx();
var evtTextSt = evtText.toStateless(ctx)
    .pipe(function (text) { return text.startsWith("f") ? null : [text.toUpperCase()]; })
    .toStateful();
(0, assert_1.assert)(evtTextSt.state === undefined);
evtText.post("foobar");
(0, assert_1.assert)(evtTextSt.state === undefined);
evtText.post("baz");
(0, assert_1.assert)(evtTextSt.state === "BAZ");
ctx.done();
evtText.post("hello");
(0, assert_1.assert)(evtTextSt.state === "BAZ");
console.log("PASS");
//# sourceMappingURL=test90.js.map