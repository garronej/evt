"use strict";
exports.__esModule = true;
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyEvt = /** @class */ (function () {
    function LazyEvt() {
        this.initialPostCount = 0;
    }
    LazyEvt.prototype.post = function (data) {
        if (this.__evt === undefined) {
            return ++this.initialPostCount;
        }
        return this.__evt.post(data);
    };
    LazyEvt.__1 = (function () {
        if (false) {
            LazyEvt.__1;
        }
        defineAccessors_1.defineAccessors(LazyEvt.prototype, "evt", {
            "get": function () {
                var self = this;
                if (self.__evt === undefined) {
                    self.__evt = new importProxy_1.importProxy.Evt();
                    overwriteReadonlyProp_1.overwriteReadonlyProp(self.__evt, "postCount", self.initialPostCount);
                }
                return self.__evt;
            }
        });
    })();
    return LazyEvt;
}());
exports.LazyEvt = LazyEvt;
//# sourceMappingURL=LazyEvt.js.map