"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var typeSafety_1 = require("../tools/typeSafety");
var getPromiseAssertionApi_1 = require("../tools/testing/getPromiseAssertionApi");
var getHandlerPr_1 = require("./getHandlerPr");
var _a = getPromiseAssertionApi_1.getPromiseAssertionApi(), mustResolve = _a.mustResolve, mustStayPending = _a.mustStayPending;
{
    //Test type only
    var evtText_1 = new lib_1.Evt();
    evtText_1.$attach(lib_1.compose(function (text) { return [text.toUpperCase(), { "DETACH": lib_1.Evt.newCtx(), "res": true }]; }, function (text) { return [text.length, { "DETACH": lib_1.Evt.newCtx(), "res": 3 }]; }, function (n) { return ["=>" + n + "<=", { "DETACH": lib_1.Evt.newCtx() }]; }, function (str) { return [str.toUpperCase(), { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }]; }, function (str) { return [str.toUpperCase(), { "DETACH": lib_1.Evt.newCtx(), "err": new Error() }]; }), function (str) { return str.toUpperCase(); });
}
{
    var evtText_2 = new lib_1.Evt();
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evtText_2, function () {
            return evtText_2.$attach(lib_1.compose(function (text) { return [text, "DETACH"]; }, function (text) { return [text]; }), function (text) { return text.toLowerCase(); });
        })
    });
    evtText_2.post("foo");
    typeSafety_1.assert(evtText_2.getHandlers().length === 0);
}
{
    var evtText_3 = new lib_1.Evt();
    var ctx_1 = lib_1.Evt.newCtx();
    mustResolve({
        "promise": getHandlerPr_1.getHandlerPr(evtText_3, function () {
            return evtText_3.$attach(lib_1.compose(function (text) { return [text, { "DETACH": ctx_1 }]; }, function (text) { return [text]; }), ctx_1, function (text) { return text.toLowerCase(); });
        })
    });
    evtText_3.post("foo");
    typeSafety_1.assert(evtText_3.getHandlers().length === 0);
}
{
    var evtText_4 = new lib_1.Evt();
    mustStayPending(getHandlerPr_1.getHandlerPr(evtText_4, function () {
        return evtText_4.$attach(lib_1.compose(function (text) { return [text, "DETACH"]; }, function () { return null; }), function () { });
    }));
    evtText_4.post("foo");
    typeSafety_1.assert(evtText_4.getHandlers().length === 0);
}
{
    var evtText_5 = new lib_1.Evt();
    var ctx_2 = lib_1.Evt.newCtx();
    mustStayPending(getHandlerPr_1.getHandlerPr(evtText_5, function () {
        return evtText_5.$attach(lib_1.compose(function (text) { return [text, { "DETACH": ctx_2 }]; }, function (str) { str.toLowerCase(); return null; }), ctx_2, function () { });
    }));
    evtText_5.post("foo");
    typeSafety_1.assert(evtText_5.getHandlers().length === 0);
}
console.log("PASS");
//# sourceMappingURL=test67.js.map