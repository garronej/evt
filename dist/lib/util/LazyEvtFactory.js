"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var overwriteReadonlyProp_1 = require("../../tools/overwriteReadonlyProp");
var importProxy_1 = require("../importProxy");
var LazyEvtFactory = /** @class */ (function () {
    function LazyEvtFactory() {
        this.initialPostCount = 0;
        this.evt = undefined;
    }
    LazyEvtFactory.prototype.getEvt = function () {
        if (this.evt === undefined) {
            this.evt = new importProxy_1.importProxy.Evt();
            overwriteReadonlyProp_1.overwriteReadonlyProp(this.evt, "postCount", this.initialPostCount);
        }
        return this.evt;
    };
    LazyEvtFactory.prototype.post = function (data) {
        if (this.evt === undefined) {
            this.initialPostCount++;
            return;
        }
        this.evt.post(data);
    };
    return LazyEvtFactory;
}());
exports.LazyEvtFactory = LazyEvtFactory;
//# sourceMappingURL=LazyEvtFactory.js.map