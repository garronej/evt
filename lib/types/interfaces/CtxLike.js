"use strict";
exports.__esModule = true;
exports.CtxLike = exports.z_3 = void 0;
var typeGuard_1 = require("../../../tools/typeSafety/typeGuard");
exports.z_3 = {
    "match": function match(o) {
        return (typeGuard_1.typeGuard(o) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function");
    }
};
var CtxLike;
(function (CtxLike) {
    CtxLike.match = exports.z_3.match;
})(CtxLike = exports.CtxLike || (exports.CtxLike = {}));
//# sourceMappingURL=CtxLike.js.map