"use strict";
exports.__esModule = true;
var importProxy_1 = require("../importProxy");
var typeGuard_1 = require("../../tools/typeSafety/typeGuard");
var assert_1 = require("../../tools/typeSafety/assert");
function fromEvtImpl(ctx, evt, initialValue) {
    var obs = new importProxy_1.importProxy.Observable(initialValue);
    var callback = function (data) { return obs.onPotentialChange(data); };
    if (!!ctx) {
        evt.attach(ctx, callback);
    }
    else {
        evt.attach(callback);
    }
    return obs;
}
function fromObsImpl(ctx, obs, transform) {
    var op = function (data) { return [transform(data)]; };
    return fromEvtImpl(undefined, !!ctx ?
        obs.evtChange.pipe(ctx, op) :
        obs.evtChange.pipe(op), transform(obs.value));
}
function from(p1, p2, p3) {
    if ("abort" in p1) {
        //1 or 3
        assert_1.assert(typeGuard_1.typeGuard(p2));
        if ("attach" in p2) {
            //1
            assert_1.assert(typeGuard_1.typeGuard(p3));
            return fromEvtImpl(p1, p2, p3);
        }
        else {
            //3
            assert_1.assert(typeGuard_1.typeGuard(p3));
            return fromObsImpl(p1, p2, p3);
        }
    }
    else {
        //2 or 4
        if ("attach" in p1) {
            //2
            assert_1.assert(typeGuard_1.typeGuard(p2));
            return fromEvtImpl(undefined, p1, p2);
        }
        else {
            //4
            assert_1.assert(typeGuard_1.typeGuard(p2));
            return fromObsImpl(undefined, p1, p2);
        }
    }
}
exports.from = from;
//# sourceMappingURL=observableFrom.js.map