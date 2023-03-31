"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
var id_1 = require("tsafe/id");
var assert_1 = require("tsafe/assert");
;
var typeGuard_1 = require("tsafe/typeGuard");
var Evt_merge_1 = require("./Evt.merge");
var importProxy_1 = require("./importProxy");
var nsEventTargetLike = __importStar(require("./types/EventTargetLike"));
var EventTargetLikeAsValue = nsEventTargetLike.EventTargetLike;
function fromImplForTargetEventLike(ctx, target, eventName, options) {
    var matchEventTargetLike = function (target_) {
        return EventTargetLikeAsValue.canBe(target_);
    };
    if (!matchEventTargetLike(target)) {
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
        return (0, Evt_merge_1.mergeImpl)(ctx, Array.from(target).map(function (target) { return fromImplForTargetEventLike(ctx, target, eventName, options); }));
    }
    var proxy;
    if (EventTargetLikeAsValue.HasEventTargetAddRemove.match(target)) {
        proxy = {
            "on": function (listener, eventName, options) { return target.addEventListener(eventName, listener, options); },
            "off": function (listener, eventName, options) { return target.removeEventListener(eventName, listener, options); }
        };
    }
    else if (EventTargetLikeAsValue.NodeStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.addListener(eventName, listener); },
            "off": function (listener, eventName) { return target.removeListener(eventName, listener); }
        };
    }
    else if (EventTargetLikeAsValue.JQueryStyleEventEmitter.match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.on(eventName, listener); },
            "off": function (listener, eventName) { return target.off(eventName, listener); }
        };
    }
    else if (EventTargetLikeAsValue.RxJSSubject.match(target)) {
        var subscription_1;
        proxy = {
            "on": function (listener) { return subscription_1 = target.subscribe(function (data) { return listener(data); }); },
            "off": function () { return subscription_1.unsubscribe(); }
        };
    }
    else {
        (0, id_1.id)(target);
        (0, assert_1.assert)(false);
    }
    var evt = new importProxy_1.importProxy.Evt();
    var listener = function (data) { return evt.post(data); };
    ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.attachOnce(function () { return proxy.off(listener, eventName, options); });
    proxy.on(listener, eventName, options);
    return evt;
}
function fromImplForObserver(ctx, ObserverConstructor, target) {
    var evt = importProxy_1.importProxy.Evt.create();
    var listener = function (_a) {
        var _b = __read(_a, 1), entry = _b[0];
        return evt.post(entry);
    };
    var observer = new ObserverConstructor(listener);
    observer.observe(target);
    ctx === null || ctx === void 0 ? void 0 : ctx.evtDoneOrAborted.attachOnce(function () { return observer.disconnect(); });
    return evt;
}
/*
/^[A-Z]/.test(targetOrEventNameOrObserverConstructorOrObserverTarget.name
    */
function from(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget, options) {
    if ("evtDoneOrAborted" in ctxOrTargetOrObserverConstructor) {
        (0, assert_1.assert)((0, typeGuard_1.typeGuard)(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            (0, typeGuard_1.typeGuard)(eventNameOrOptionsOrObserverTarget, true) &&
            (0, typeGuard_1.typeGuard)(options, true));
        if (typeof targetOrEventNameOrObserverConstructorOrObserverTarget === "function") {
            (0, assert_1.assert)((0, typeGuard_1.typeGuard)(eventNameOrOptionsOrObserverTarget, true) &&
                (0, typeGuard_1.typeGuard)(options, true));
            return fromImplForObserver(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget);
        }
        else {
            (0, assert_1.assert)((0, typeGuard_1.typeGuard)(eventNameOrOptionsOrObserverTarget, true));
            return fromImplForTargetEventLike(ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget, options);
        }
    }
    else {
        (0, assert_1.assert)((0, typeGuard_1.typeGuard)(ctxOrTargetOrObserverConstructor, true) &&
            (0, typeGuard_1.typeGuard)(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
            (0, typeGuard_1.typeGuard)(eventNameOrOptionsOrObserverTarget, true));
        if (typeof ctxOrTargetOrObserverConstructor === "function") {
            (0, assert_1.assert)((0, typeGuard_1.typeGuard)(targetOrEventNameOrObserverConstructorOrObserverTarget, true) &&
                (0, typeGuard_1.typeGuard)(eventNameOrOptionsOrObserverTarget, true));
            return fromImplForObserver(undefined, ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget);
        }
        else {
            (0, assert_1.assert)((0, typeGuard_1.typeGuard)(targetOrEventNameOrObserverConstructorOrObserverTarget, true));
            return fromImplForTargetEventLike(undefined, ctxOrTargetOrObserverConstructor, targetOrEventNameOrObserverConstructorOrObserverTarget, eventNameOrOptionsOrObserverTarget);
        }
    }
}
exports.from = from;
//# sourceMappingURL=Evt.from.js.map