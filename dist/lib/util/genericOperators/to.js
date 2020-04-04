"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = function (eventName) {
    return function (data) { return data[0] !== eventName ?
        null : [data[1]]; };
};
//# sourceMappingURL=to.js.map