"use strict";
exports.__esModule = true;
var importProxy_1 = require("../importProxy");
var typeGuard_1 = require("../../tools/typeSafety/typeGuard");
var assert_1 = require("../../tools/typeSafety/assert");
function fromEvtImpl(create, evt, initialValue) {
    var obs = create(initialValue);
    evt.attach(function (data) { return obs.update(data); });
    return obs;
}
function fromObsImpl(create, ctx, obs, transform) {
    var evtDelegate = new importProxy_1.importProxy.Evt();
    {
        var callback = function (data) { return evtDelegate.post(transform(data)); };
        //NOTE: Not using pipe for types reasons.
        if (!!ctx) {
            obs.evt.attach(ctx, callback);
        }
        else {
            obs.evt.attach(callback);
        }
    }
    return fromEvtImpl(create, evtDelegate, transform(obs.val));
}
function from(p1, p2, p3, p4, p5) {
    if ("abort" in p1) {
        //1
        assert_1.assert(typeGuard_1.typeGuard(p2));
        assert_1.assert(typeGuard_1.typeGuard(p3));
        assert_1.assert(typeGuard_1.typeGuard(p4));
        assert_1.assert(typeGuard_1.typeGuard(p5));
        return fromObsImpl(function (val) { return new importProxy_1.importProxy.Observable(val, p4, p5); }, p1, p2, p3);
    }
    else {
        //2 or 3
        if ("attach" in p1) {
            //3
            assert_1.assert(typeGuard_1.typeGuard(p2));
            assert_1.assert(typeGuard_1.typeGuard(p3));
            assert_1.assert(typeGuard_1.typeGuard(p4));
            return fromEvtImpl(function (val) { return new importProxy_1.importProxy.Observable(val, p3, p4); }, p1, p2);
        }
        else {
            //2
            assert_1.assert(typeGuard_1.typeGuard(p2));
            assert_1.assert(typeGuard_1.typeGuard(p3));
            assert_1.assert(typeGuard_1.typeGuard(p4));
            return fromObsImpl(function (val) { return new importProxy_1.importProxy.Observable(val, p3, p4); }, undefined, p1, p2);
        }
    }
}
exports.from = from;
var copy;
(function (copy) {
    function from(p1, p2, p3) {
        if ("abort" in p1) {
            //1
            assert_1.assert(typeGuard_1.typeGuard(p2));
            assert_1.assert(typeGuard_1.typeGuard(p3));
            return fromObsImpl(function (val) { return new importProxy_1.importProxy.ObservableCopy(val); }, p1, p2, p3);
        }
        else {
            //2 or 3
            if ("attach" in p1) {
                //3
                assert_1.assert(typeGuard_1.typeGuard(p2));
                return fromEvtImpl(function (val) { return new importProxy_1.importProxy.ObservableCopy(val); }, p1, p2);
            }
            else {
                //2
                assert_1.assert(typeGuard_1.typeGuard(p2));
                return fromObsImpl(function (val) { return new importProxy_1.importProxy.ObservableCopy(val); }, undefined, p1, p2);
            }
        }
    }
    copy.from = from;
})(copy = exports.copy || (exports.copy = {}));
//# sourceMappingURL=observableFrom.js.map