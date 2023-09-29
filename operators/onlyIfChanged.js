"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyIfChanged = void 0;
var StatefulEvt_1 = require("../lib/StatefulEvt");
var same_1 = require("../tools/inDepth/same");
var initialValue = {};
var onlyIfChanged = function (params) {
    var _a = (params !== null && params !== void 0 ? params : {}).areEqual, areEqual = _a === void 0 ? same_1.same : _a;
    var op = [
        function (data, prev) {
            return (this instanceof StatefulEvt_1.StatefulEvt ?
                areEqual(data, this.state) :
                prev === initialValue ? false : areEqual(data, prev)) ? null : [data];
        },
        initialValue
    ];
    return op;
};
exports.onlyIfChanged = onlyIfChanged;
//# sourceMappingURL=onlyIfChanged.js.map