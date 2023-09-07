"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var onlyIfChanged_1 = require("../lib/util/genericOperators/onlyIfChanged");
var alphabet = "";
var evtFoo = lib_1.Evt.create({ "foo": "a" });
evtFoo
    .pipe((0, onlyIfChanged_1.onlyIfChanged)())
    .attach(function (_a) {
    var foo = _a.foo;
    alphabet += foo;
});
evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "b" });
evtFoo.post({ "foo": "b" });
evtFoo.post({ "foo": "c" });
(0, assert_1.assert)(alphabet === "abc");
console.log("PASS");
//# sourceMappingURL=test110.js.map