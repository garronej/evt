"use strict";
exports.__esModule = true;
var Evt_1 = require("../Evt");
function mergeImpl(ref, evts) {
    var evtUnion = new Evt_1.Evt();
    var callback = function (data) { return evtUnion.post(data); };
    evts
        .forEach(function (evt) {
        if (ref === undefined) {
            evt.attach(callback);
        }
        else {
            evt.attach(ref, callback);
        }
    });
    return evtUnion;
}
exports.mergeImpl = mergeImpl;
function merge(p1, p2) {
    return "length" in p1 ?
        mergeImpl(undefined, p1) :
        mergeImpl(p1, p2);
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map