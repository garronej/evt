"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
var evtFoo = new lib_1.StatefulEvt("init");
(0, assert_1.assert)(evtFoo.toStateless().postCount === 0);
console.log("PASS");
//# sourceMappingURL=test100.js.map