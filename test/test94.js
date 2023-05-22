"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsafe_1 = require("tsafe");
try {
    (0, tsafe_1.assert)(false, "We should never be here");
}
catch (error) {
    (0, tsafe_1.assert)(error instanceof tsafe_1.AssertionError);
}
console.log("PASS");
//# sourceMappingURL=test94.js.map