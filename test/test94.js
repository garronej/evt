"use strict";
exports.__esModule = true;
var assert_1 = require("../tools/typeSafety/assert");
try {
    assert_1.assert(false, "We should never be here");
}
catch (error) {
    assert_1.assert(error instanceof assert_1.AssertionError);
}
console.log("PASS");
//# sourceMappingURL=test94.js.map