"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var getHandlerPr_1 = require("./getHandlerPr");
var mustResolve = (0, getPromiseAssertionApi_1.getPromiseAssertionApi)().mustResolve;
var evtText = new lib_1.Evt();
var obj = { "p": "foo" };
mustResolve({
    "promise": (0, getHandlerPr_1.getHandlerPr)(evtText, function () {
        return evtText.attach(function (obj_) { return !!obj_.p.match("foo"); }, function (obj_) { return obj_ === obj; });
    }),
    "expectedData": obj
});
evtText.post(obj);
setTimeout(function () { return console.log("PASS"); }, 0);
//# sourceMappingURL=test71.js.map