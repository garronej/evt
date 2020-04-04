"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var importProxy_1 = require("../importProxy");
var typeGuard_1 = require("../../tools/typeSafety/typeGuard");
var assert_1 = require("../../tools/typeSafety/assert");
function fromEvtImpl(evt, initialValue) {
    var trk = new importProxy_1.importProxy.Tracked(initialValue);
    evt.attach(function (data) { return trk.val = data; });
    return trk;
}
function fromTrkImpl(ctx, trk, transform) {
    var evtDelegate = new importProxy_1.importProxy.Evt();
    {
        var callback = function (data) { return evtDelegate.post(transform(data)); };
        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            trk.evt.attach(ctx, callback);
        }
        else {
            trk.evt.attach(callback);
        }
    }
    return fromEvtImpl(evtDelegate, transform(trk.val));
}
function from(p1, p2, p3) {
    if ("abort" in p1) {
        //1
        assert_1.assert(typeGuard_1.typeGuard(p2));
        assert_1.assert(typeGuard_1.typeGuard(p3));
        return fromTrkImpl(p1, p2, p3);
    }
    else {
        //2 or 3
        if ("attach" in p1) {
            //3
            assert_1.assert(typeGuard_1.typeGuard(p2));
            return fromEvtImpl(p1, p2);
        }
        else {
            //2
            assert_1.assert(typeGuard_1.typeGuard(p2));
            return fromTrkImpl(undefined, p1, p2);
        }
    }
}
exports.from = from;
//# sourceMappingURL=Tracked.from.js.map