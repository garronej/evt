"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var HandlerGroupCore_1 = require("./HandlerGroupCore");
var Evt_1 = require("./Evt");
var HandlerGroup = /** @class */ (function (_super) {
    __extends(HandlerGroup, _super);
    function HandlerGroup() {
        var _this_1 = _super.call(this) || this;
        var evtDetached = new Evt_1.Evt();
        _this_1.onDetach = function (handlers) { return evtDetached.post(handlers); };
        _this_1.evtDetached = evtDetached;
        return _this_1;
    }
    return HandlerGroup;
}(HandlerGroupCore_1.HandlerGroupCore));
exports.HandlerGroup = HandlerGroup;
//# sourceMappingURL=HandlerGroup.js.map