"use strict";
//NOTE: We cannot import type { Operator } from "../../types/Operator";
//for TypeScript backward compatibility reasons.
exports.__esModule = true;
exports.to = void 0;
exports.to = function (eventName) {
    return function (data) { return data[0] !== eventName ?
        null : [data[1]]; };
};
//# sourceMappingURL=to.js.map