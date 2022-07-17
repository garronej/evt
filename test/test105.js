"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var log = global.console.log;
var console = { "log": function (str) { return console.stdOut += "".concat(str); }, "stdOut": "" };
var ctx = lib_1.Evt.newCtx();
var evt = lib_1.Evt.create("foo");
ctx.done();
evt.attach(ctx, function (str) { return console.log(str); });
evt.post("bar");
evt.post("baz");
(0, assert_1.assert)(console.stdOut === "foo");
log("PASS");
//# sourceMappingURL=test105.js.map