"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var same_1 = require("../tools/inDepth/same");
var assert_1 = require("tsafe/assert");
var evtFoo = lib_1.Evt.create({ "foo": 33 });
var evtX = evtFoo
    .pipe([function (data, prev) { return (0, same_1.same)(data, prev) ? null : [data]; }, { "foo": NaN }]);
(0, assert_1.assert)(evtX.state.foo === 33);
console.log("PASS");
//# sourceMappingURL=test108.js.map