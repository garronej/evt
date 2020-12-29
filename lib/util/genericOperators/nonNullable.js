"use strict";
exports.__esModule = true;
exports.nonNullable = void 0;
var isNonNullable = function (arg) { return arg !== undefined && arg !== null; };
exports.nonNullable = function (data) {
    return !isNonNullable(data) ? null : [data];
};
//# sourceMappingURL=nonNullable.js.map