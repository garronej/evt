"use strict";
exports.__esModule = true;
var importProxy_1 = require("../importProxy");
var typeGuard_1 = require("../../tools/typeSafety/typeGuard");
var assert_1 = require("../../tools/typeSafety/assert");
function fromEvtImpl(evt, initialValue, areSame) {
    var obs = new importProxy_1.importProxy.Observable(initialValue, areSame);
    evt.attach(function (data) { return obs.onPotentialChange(data); });
    return obs;
}
function fromObsImpl(ctx, obs, transform, areSame) {
    var evtDelegate = new importProxy_1.importProxy.Evt();
    {
        var callback = function (data) { return evtDelegate.post(transform(data)); };
        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            obs.evtChange.attach(ctx, callback);
        }
        else {
            obs.evtChange.attach(callback);
        }
    }
    return fromEvtImpl(evtDelegate, transform(obs.value), areSame);
}
function from(p1, p2, p3, p4) {
    if ("abort" in p1) {
        //2
        assert_1.assert(typeGuard_1.typeGuard(p2));
        assert_1.assert(typeGuard_1.typeGuard(p3));
        assert_1.assert(typeGuard_1.typeGuard(p4));
        return fromObsImpl(p1, p2, p3, p4);
    }
    else {
        //1 or 3
        if ("attach" in p1) {
            //1
            assert_1.assert(typeGuard_1.typeGuard(p2));
            assert_1.assert(typeGuard_1.typeGuard(p3));
            return fromEvtImpl(p1, p2, p3);
        }
        else {
            //3
            assert_1.assert(typeGuard_1.typeGuard(p2));
            assert_1.assert(typeGuard_1.typeGuard(p3));
            return fromObsImpl(undefined, p1, p2, p3);
        }
    }
}
exports.from = from;
//# sourceMappingURL=observableFrom.js.map