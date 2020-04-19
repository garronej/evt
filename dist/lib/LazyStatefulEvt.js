"use strict";
exports.__esModule = true;
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyStatefulEvt = /** @class */ (function () {
    function LazyStatefulEvt(initialState) {
        this.initialPostCount = 0;
        this.initialState = initialState;
    }
    LazyStatefulEvt.prototype.post = function (data) {
        if (this.__evt === undefined) {
            this.initialState = data;
            return ++this.initialPostCount;
        }
        return this.__evt.post(data);
    };
    LazyStatefulEvt.__1 = (function () {
        if (false) {
            LazyStatefulEvt.__1;
        }
        defineAccessors_1.defineAccessors(LazyStatefulEvt.prototype, "evt", {
            "get": function () {
                if (this.__evt === undefined) {
                    this.__evt = new importProxy_1.importProxy.StatefulEvt(this.initialState);
                    delete this.initialState;
                    overwriteReadonlyProp_1.overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
                }
                return this.__evt;
            }
        });
    })();
    return LazyStatefulEvt;
}());
exports.LazyStatefulEvt = LazyStatefulEvt;
//# sourceMappingURL=LazyStatefulEvt.js.map