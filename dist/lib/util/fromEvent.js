"use strict";
exports.__esModule = true;
var Evt_2 = require("../Evt");
var typeSafety_1 = require("../../tools/typeSafety");
var EventTargetLike_1 = require("../types/EventTargetLike");
var merge_1 = require("./merge");
function fromEventImpl(ctx, target, eventName, options) {
    if ("length" in target) {
        return merge_1.mergeImpl(ctx, Array.from(target).map(function (target) { return fromEventImpl(ctx, target, eventName, options); }));
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
        typeSafety_1.id(target);
        typeSafety_1.assert(false);
    }
    var evt = new Evt_2.Evt();
    var listener = function (data) { return evt.post(data); };
    ctx === null || ctx === void 0 ? void 0 : ctx.getEvtDetach().attachOnce(function () { return proxy.off(listener, eventName, options); });
    proxy.on(listener, eventName, options);
    return evt;
}
function fromEvent(ctxOrTarget, targetOrEventName, eventNameOrOptions, options) {
    if (typeSafety_1.id(Object.getPrototypeOf(ctxOrTarget)
        .constructor).__CtxForEvtBrand === true) {
        typeSafety_1.assert(typeSafety_1.typeGuard.dry(ctxOrTarget) &&
            typeSafety_1.typeGuard.dry(targetOrEventName) &&
            typeSafety_1.typeGuard.dry(eventNameOrOptions) &&
            typeSafety_1.typeGuard.dry(options));
        return fromEventImpl(ctxOrTarget, targetOrEventName, eventNameOrOptions, options);
    }
    else {
        typeSafety_1.assert(typeSafety_1.typeGuard.dry(ctxOrTarget) &&
            typeSafety_1.typeGuard.dry(targetOrEventName) &&
            typeSafety_1.typeGuard.dry(eventNameOrOptions));
        return fromEventImpl(undefined, ctxOrTarget, targetOrEventName, eventNameOrOptions);
    }
}
exports.fromEvent = fromEvent;
//# sourceMappingURL=fromEvent.js.map