"use strict";
exports.__esModule = true;
var composeMatcher_1 = require("../composeMatcher");
function throttleTime(duration) {
    return composeMatcher_1.composeMatcher([
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