"use strict";
exports.__esModule = true;
var id_1 = require("../tools/typeSafety/id");
var assert_1 = require("../tools/typeSafety/assert");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var EventTargetLike_1 = require("./types/EventTargetLike");
var Evt_merge_1 = require("./Evt.merge");
var importProxy_1 = require("./importProxy");
function fromImpl(ctx, target, eventName, options) {
    if ("then" in target) {
        var evt_1 = new importProxy_1.importProxy.Evt();
        var isCtxDone_1 = (function () {
            var getEvtDonePostCount = function () { return ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.postCount; };
            var n = getEvtDonePostCount();
            return function () { return n !== getEvtDonePostCount(); };
        })();
        target.then(function (data) {
            if (isCtxDone_1()) {
                return;
            }
            evt_1.post(data);
        });
        return evt_1;
    }
    if ("length" in target) {
        return Evt_merge_1.mergeImpl(ctx, Array.from(target).map(function (target) { return fromImpl(ctx, target, eventName, options); }));
    }
    var proxy;
    if (EventTargetLike_1.EventTargetLike.NodeStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.addListener(eventName, listener); },
            "off": function (listener, eventName) { return target.removeListener(eventName, listener); }
        };
    }
    else if (EventTargetLike_1.EventTargetLike.JQueryStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.on(eventName, listener); },
            "off": function (listener, eventName) { return target.off(eventName, listener); }
        };
    }
    else if (EventTargetLike_1.EventTargetLike.HasEventTargetAddRemove.match(target)) {
        proxy = {
            "on": function (listener, eventName, options) { return target.addEventListener(eventName, listener, options); },
            "off": function (listener, eventName, options) { return target.removeEventListener(eventName, listener, options); }
        };
    }
    else if (EventTargetLike_1.EventTargetLike.RxJSSubject.match(target)) {
        var subscription_1;
        proxy = {
            "on": function (listener) { return subscription_1 = target.subscribe(function (data) { return listener(data); }); },
            "off": function () { return subscription_1.unsubscribe(); }
        };
    }
    else {
        id_1.id(target);
        assert_1.assert(false);
    }
    var evt = new importProxy_1.importProxy.Evt();
    var listener = function (data) { return evt.post(data); };
    ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.attachOnce(function () { return proxy.off(listener, eventName, options); });
    proxy.on(listener, eventName, options);
    return evt;
}
function from(ctxOrTarget, targetOrEventName, eventNameOrOptions, options) {
    if ("evtDoneOrAborted" in ctxOrTarget) {
        assert_1.assert(typeGuard_1.typeGuard(targetOrEventName) &&
            typeGuard_1.typeGuard(eventNameOrOptions) &&
            typeGuard_1.typeGuard(options));
        return fromImpl(ctxOrTarget, targetOrEventName, eventNameOrOptions, options);
    }
    else {
        assert_1.assert(typeGuard_1.typeGuard(targetOrEventName) &&
            typeGuard_1.typeGuard(eventNameOrOptions));
        return fromImpl(undefined, ctxOrTarget, targetOrEventName, eventNameOrOptions);
    }
}
exports.from = from;
//# sourceMappingURL=Evt.from.js.map