"use strict";
exports.__esModule = true;
exports.to = void 0;
exports.to = function (eventName) {
    return function (data) { return data[0] !== eventName ?
        null : [data[1]]; };
};
//# sourceMappingURL=to.js.map