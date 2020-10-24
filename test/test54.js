"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var evtText = new lib_1.Evt();
var text = "ok";
evtText.evtAttach.attach(function (_a) {
    var op = _a.op;
    return !!evtText.getStatelessOp(op)(text);
}, function () { return evtText.post(text); });
var str = "";
evtText.attachOnce(function (str_) { return str = str_; });
typeSafety_1.assert(str === "ok");
console.log("PASS");
//# sourceMappingURL=test54.js.map