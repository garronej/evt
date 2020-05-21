"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
exports.dom = void 0;
__exportStar(require("./helper"), exports);
__exportStar(require("./interfaces"), exports);
var EventTargetLike_1 = require("./EventTargetLike");
__createBinding(exports, EventTargetLike_1, "EventTargetLike");
var EvtError_1 = require("./EvtError");
__createBinding(exports, EvtError_1, "EvtError");
var dom = require("./lib.dom");
exports.dom = dom;
var Operator_1 = require("./Operator");
__createBinding(exports, Operator_1, "Operator");
//# sourceMappingURL=index.js.map