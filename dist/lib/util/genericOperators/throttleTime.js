"use strict";
exports.__esModule = true;
var composeOperators_1 = require("../composeOperators");
function throttleTime(duration) {
    return composeOperators_1.composeOperators([
        function (data, _a) {
            var lastClick = _a.lastClick;
            var now = Date.now();
            return now - lastClick < duration ?
                null :
                [{ data: data, "lastClick": now }];
        },
        { "lastClick": 0, "data": null }
    ], function (_a) {
        var data = _a.data;
        return [data];
    });
}
exports.throttleTime = throttleTime;
//# sourceMappingURL=throttleTime.js.map