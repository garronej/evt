"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var evtText = new lib_1.Evt();
var acc = "";
evtText.$attach(function (text) { return [text, text === "END" ? "DETACH" : null]; }, function (text) { return acc += " " + text; });
evtText.post("TICK");
evtText.post("TICK");
evtText.post("END");
evtText.post("TICK");
console.assert(acc === " TICK TICK END");
console.log("PASS");
//# sourceMappingURL=test44.js.map