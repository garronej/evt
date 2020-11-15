"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var voidEvt = lib_1.Evt.create();
var evt = voidEvt;
var count = 0;
lib_1.Evt.factorize(evt).attach(function (data) {
    if (lib_1.matchVoid(data)) {
        count++;
        return;
    }
    data.toUpperCase();
});
voidEvt.post();
voidEvt.postAsyncOnceHandled();
typeSafety_1.assert(count === 2);
console.log("PASS");
//# sourceMappingURL=test83.js.map