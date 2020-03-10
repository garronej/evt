"use strict";
exports.__esModule = true;
var Evt_2 = require("../Evt");
var EvtCore_1 = require("../EvtCore");
function getLazyEvtFactory() {
    var initialPostCount = 0;
    var evt = undefined;
    function getEvt() {
        if (evt === undefined) {
            evt = new Evt_2.Evt();
            EvtCore_1.setPostCount(evt, initialPostCount);
        }
        return evt;
    }
    function post(data) {
        if (evt === undefined) {
            initialPostCount++;
            return;
        }
        evt.post(data);
    }
    return { getEvt: getEvt, post: post };
}
exports.getLazyEvtFactory = getLazyEvtFactory;
//# sourceMappingURL=getLazyEvtFactory.js.map