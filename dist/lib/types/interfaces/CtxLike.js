"use strict";
exports.__esModule = true;
var typeGuard_1 = require("../../../tools/typeSafety/typeGuard");
var CtxLike;
(function (CtxLike) {
    function match(o) {
        return (typeGuard_1.typeGuard(o) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function");
    }
    CtxLike.match = match;
})(CtxLike = exports.CtxLike || (exports.CtxLike = {}));
//# sourceMappingURL=CtxLike.js.map