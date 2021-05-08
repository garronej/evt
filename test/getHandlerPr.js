"use strict";
exports.__esModule = true;
exports.getHandlerPr = void 0;
var diff_1 = require("../tools/reducers/diff");
var typeSafety_1 = require("../tools/typeSafety");
/** For tests that used the legacy attach returned Promise */
function getHandlerPr(evt, run) {
    var handlersBefore = evt.getHandlers();
    var x = run();
    typeSafety_1.assert(!("then" in x));
    var handlersAfter = evt.getHandlers();
    var o = diff_1.arrDiff(handlersBefore, handlersAfter);
    return o.added[0].promise;
}
exports.getHandlerPr = getHandlerPr;
//# sourceMappingURL=getHandlerPr.js.map