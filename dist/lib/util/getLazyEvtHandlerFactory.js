"use strict";
exports.__esModule = true;
var Evt_2 = require("../Evt");
var EvtCore_1 = require("../EvtCore");
var id_1 = require("../../tools/typeSafety/id");
function getLazyEvtHandlerFactory() {
    var initialPostCount = {
        "evtAttach": 0,
        "evtDetach": 0
    };
    var evts = {
        "evtAttach": id_1.id(undefined),
        "evtDetach": id_1.id(undefined)
    };
    function getLazyEvtHandler(target) {
        if (evts[target] === undefined) {
            evts[target] = new Evt_2.Evt();
            EvtCore_1.setPostCount(evts[target], initialPostCount[target]);
        }
        return evts[target];
    }
    function onHandler(target, handler) {
        if (evts[target] === undefined) {
            initialPostCount[target]++;
            return;
        }
        evts[target].post(handler);
    }
    return { getLazyEvtHandler: getLazyEvtHandler, onHandler: onHandler };
}
exports.getLazyEvtHandlerFactory = getLazyEvtHandlerFactory;
//# sourceMappingURL=getLazyEvtHandlerFactory.js.map