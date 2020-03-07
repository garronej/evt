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
var CtxCore_1 = require("./CtxCore");
var Evt_1 = require("./Evt");
var EvtCore_1 = require("./EvtCore");
var Ctx = /** @class */ (function (_super) {
    __extends(Ctx, _super);
    function Ctx() {
        var _this_1 = _super.call(this) || this;
        _this_1.evtDetachedInitialPostCount = 0;
        _this_1.evtDetach = undefined;
        _this_1.onDetach = function (handlers) {
            if (_this_1.evtDetach === undefined) {
                _this_1.evtDetachedInitialPostCount++;
                return;
            }
            _this_1.evtDetach.post(handlers);
        };
        return _this_1;
    }
    Ctx.prototype.getEvtDetach = function () {
        if (this.evtDetach === undefined) {
            this.evtDetach = new Evt_1.Evt();
            EvtCore_1.setPostCount(this.evtDetach, this.evtDetachedInitialPostCount);
        }
        return this.evtDetach;
    };
    Ctx.__CtxForEvtBrand = true;
    return Ctx;
}(CtxCore_1.CtxCore));
exports.Ctx = Ctx;
//# sourceMappingURL=Ctx.js.map