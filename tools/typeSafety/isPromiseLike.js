"use strict";
exports.__esModule = true;
exports.isPromiseLike = void 0;
function isPromiseLike(o) {
    return typeof (o === null || o === void 0 ? void 0 : o.then) === "function";
}
exports.isPromiseLike = isPromiseLike;
//# sourceMappingURL=isPromiseLike.js.map