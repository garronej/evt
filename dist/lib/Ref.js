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
var RefCore_1 = require("./RefCore");
var Evt_1 = require("./Evt");
var Ref = /** @class */ (function (_super) {
    __extends(Ref, _super);
    function Ref() {
        var _this_1 = _super.call(this) || this;
        var evtDetached = new Evt_1.Evt();
        _this_1.onDetach = function (handlers) { return evtDetached.post(handlers); };
        _this_1.evtDetached = evtDetached;
        return _this_1;
    }
    return Ref;
}(RefCore_1.RefCore));
exports.Ref = Ref;
//# sourceMappingURL=Ref.js.map