"use strict";
exports.__esModule = true;
var Void_1 = require("./types/interfaces/Void");
/**
 * https://docs.evt.land/api/evt/factorize
 *
 * Type guard for Void, the event data type posted by VoidEvt
 * */
function isVoid(o) {
    return Void_1.Void.match(o);
}
exports.isVoid = isVoid;
//# sourceMappingURL=Evt.isVoid.js.map