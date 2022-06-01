(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.evt = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Ctx = void 0;
var Set_1 = require("minimal-polyfills/Set");
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var assert_1 = require("../tools/typeSafety/assert");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var LazyEvt_1 = require("./LazyEvt");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var CtxImpl = /** @class */ (function () {
    function CtxImpl() {
        this.lazyEvtAttach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDetach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDoneOrAborted = new LazyEvt_1.LazyEvt();
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
    }
    CtxImpl.prototype.onDoneOrAborted = function (doneEvtData) {
        this.lazyEvtDoneOrAborted.post(doneEvtData);
    };
    CtxImpl.prototype.waitFor = function (timeout) {
        var _this_1 = this;
        return this.evtDoneOrAborted
            .waitFor(timeout)
            .then(function (data) {
            if (data.type === "ABORTED") {
                throw data.error;
            }
            return data.result;
        }, function (timeoutError) {
            _this_1.abort(timeoutError);
            throw timeoutError;
        });
    };
    CtxImpl.prototype.abort = function (error) {
        return this.__done(error);
    };
    CtxImpl.prototype.done = function (result) {
        return this.__done(undefined, result);
    };
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    CtxImpl.prototype.__done = function (error, result) {
        var e_1, _a;
        var handlers = [];
        try {
            for (var _b = __values(this.handlers.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var evt = this.evtByHandler.get(handler);
                var wasStillAttached = handler.detach();
                //NOTE: It should not be possible
                if (!wasStillAttached) {
                    continue;
                }
                handlers.push({ handler: handler, evt: evt });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.onDoneOrAborted(__assign(__assign({}, (!!error ?
            { type: "ABORTED", error: error } :
            { type: "DONE", "result": result })), { handlers: handlers }));
        return handlers;
    };
    CtxImpl.prototype.getHandlers = function () {
        var _this_1 = this;
        return Array.from(this.handlers.values())
            .map(function (handler) { return ({ handler: handler, "evt": _this_1.evtByHandler.get(handler) }); });
    };
    CtxImpl.prototype.zz__addHandler = function (handler, evt) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(typeGuard_1.typeGuard(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.lazyEvtAttach.post({ handler: handler, evt: evt });
    };
    CtxImpl.prototype.zz__removeHandler = function (handler) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(typeGuard_1.typeGuard(handler));
        this.lazyEvtDetach.post({
            handler: handler,
            "evt": this.evtByHandler.get(handler)
        });
        this.handlers["delete"](handler);
    };
    CtxImpl.__1 = (function () {
        if (false) {
            CtxImpl.__1;
        }
        defineAccessors_1.defineAccessors(CtxImpl.prototype, "evtDoneOrAborted", {
            "get": function () {
                return this.lazyEvtDoneOrAborted.evt;
            }
        });
        defineAccessors_1.defineAccessors(CtxImpl.prototype, "evtAttach", {
            "get": function () {
                return this.lazyEvtAttach.evt;
            }
        });
        defineAccessors_1.defineAccessors(CtxImpl.prototype, "evtDetach", {
            "get": function () {
                return this.lazyEvtDetach.evt;
            }
        });
    })();
    return CtxImpl;
}());
exports.Ctx = CtxImpl;
try {
    overwriteReadonlyProp_1.overwriteReadonlyProp(exports.Ctx, "name", "Ctx");
}
catch (_a) { }
importProxy_1.importProxy.Ctx = exports.Ctx;

},{"../tools/typeSafety/assert":49,"../tools/typeSafety/defineAccessors":50,"../tools/typeSafety/overwriteReadonlyProp":57,"../tools/typeSafety/typeGuard":58,"./LazyEvt":15,"./importProxy":18,"minimal-polyfills/Set":62,"minimal-polyfills/WeakMap":63}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.asNonPostable = void 0;
/** https://docs.evt.land/api/evt/asnonpostable */
function asNonPostable(evt) {
    return evt;
}
exports.asNonPostable = asNonPostable;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.asPostable = void 0;
/**
 * https://docs.evt.land/api/evt/aspostable
 * ⚠ UNSAFE ⚠ - Please refer to documentation before using.
 * */
function asPostable(evt) {
    return evt;
}
exports.asPostable = asPostable;

},{}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.asyncPipe = void 0;
var Evt_2 = require("./Evt");
/**
 * NOTE: Workaround until v2.0 where .pipe() will support async operators
 * Usage example: https://stackblitz.com/edit/evt-async-op?file=index.ts
 *
 * When the argument is a StatefulEvt:
 * If, wile asyncOp was running, the state of the source evt
 * have changed then the result will be discarded.
 *
 * If the asyncOp complete synchronously (meaning it does not return
 * a promise) then the result is synchronously transformed. (As with .pipe() )
 *
 * More usage example in src/test/test95.ts
 */
function asyncPipe(evt, asyncOp) {
    var _this_1 = this;
    var out = "state" in evt ?
        Evt_2.Evt.create(undefined) :
        Evt_2.Evt.create();
    var currentCallCount = 0;
    var onData = function (data) { return __awaiter(_this_1, void 0, void 0, function () {
        var thisCallCount, prOpResult, opResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentCallCount++;
                    thisCallCount = currentCallCount;
                    prOpResult = asyncOp(data);
                    if (!(prOpResult !== null &&
                        "then" in prOpResult)) return [3 /*break*/, 2];
                    return [4 /*yield*/, prOpResult];
                case 1:
                    opResult = _a.sent();
                    if ("state" in evt &&
                        thisCallCount !== currentCallCount) {
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    opResult = prOpResult;
                    _a.label = 3;
                case 3:
                    if (opResult === null) {
                        return [2 /*return*/];
                    }
                    out.post(opResult[0]);
                    return [2 /*return*/];
            }
        });
    }); };
    evt.attach(onData);
    if ("state" in evt) {
        onData(evt.state);
    }
    return out;
}
exports.asyncPipe = asyncPipe;

},{"./Evt":9}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.create = void 0;
var importProxy_1 = require("./importProxy");
function create() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 0 ?
        new importProxy_1.importProxy.Evt() :
        new importProxy_1.importProxy.StatefulEvt(args[0]);
}
exports.create = create;

},{"./importProxy":18}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.factorize = void 0;
/** https://docs.evt.land/api/evt/factorize */
function factorize(evt) {
    return evt;
}
exports.factorize = factorize;
/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/ 

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.from = void 0;
var id_1 = require("../tools/typeSafety/id");
var assert_1 = require("../tools/typeSafety/assert");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var Evt_merge_1 = require("./Evt.merge");
var importProxy_1 = require("./importProxy");
var _1 = require("./types/EventTargetLike");
function fromImpl(ctx, target, eventName, options) {
    var matchEventTargetLike = function (target_) {
        return _1.z_2.canBe(target_);
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
        return Evt_merge_1.mergeImpl(ctx, Array.from(target).map(function (target) { return fromImpl(ctx, target, eventName, options); }));
    }
    var proxy;
    if (_1.z_2.NodeStyleEventEmitter_match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.addListener(eventName, listener); },
            "off": function (listener, eventName) { return target.removeListener(eventName, listener); }
        };
    }
    else if (_1.z_2.JQueryStyleEventEmitter_match(target)) {
        proxy = {
            "on": function (listener, eventName) { return target.on(eventName, listener); },
            "off": function (listener, eventName) { return target.off(eventName, listener); }
        };
    }
    else if (_1.z_2.HasEventTargetAddRemove_match(target)) {
        proxy = {
            "on": function (listener, eventName, options) { return target.addEventListener(eventName, listener, options); },
            "off": function (listener, eventName, options) { return target.removeEventListener(eventName, listener, options); }
        };
    }
    else if (_1.z_2.RxJSSubject_match(target)) {
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

},{"../tools/typeSafety/assert":49,"../tools/typeSafety/id":52,"../tools/typeSafety/typeGuard":58,"./Evt.merge":11,"./importProxy":18,"./types/EventTargetLike":20}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.getCtxFactory = void 0;
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var importProxy_1 = require("./importProxy");
/**
 * https://docs.evt.land/api/evt/getctx
 *
 * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
 * No strong reference to the object is created
 * when the object is no longer referenced it's associated Ctx will be freed from memory.
 */
function getCtxFactory() {
    var ctxByObj = new WeakMap_1.Polyfill();
    function getCtx(obj) {
        var ctx = ctxByObj.get(obj);
        if (ctx === undefined) {
            ctx = (new importProxy_1.importProxy.Ctx());
            ctxByObj.set(obj, ctx);
        }
        return ctx;
    }
    return getCtx;
}
exports.getCtxFactory = getCtxFactory;

},{"./importProxy":18,"minimal-polyfills/WeakMap":63}],9:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.Evt = exports.doDetachIfNeeded = void 0;
require("minimal-polyfills/Array.prototype.find");
var importProxy_1 = require("./importProxy");
var Evt_create_1 = require("./Evt.create");
var Evt_getCtx_1 = require("./Evt.getCtx");
var Evt_factorize_1 = require("./Evt.factorize");
var Evt_merge_1 = require("./Evt.merge");
var Evt_from_1 = require("./Evt.from");
var Evt_useEffect_1 = require("./Evt.useEffect");
var Evt_asPostable_1 = require("./Evt.asPostable");
var Evt_asyncPipe_1 = require("./Evt.asyncPipe");
var Evt_asNonPostable_1 = require("./Evt.asNonPostable");
var Evt_parsePropsFromArgs_1 = require("./Evt.parsePropsFromArgs");
var Evt_newCtx_1 = require("./Evt.newCtx");
var LazyEvt_1 = require("./LazyEvt");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var invokeOperator_1 = require("./util/invokeOperator");
var Map_1 = require("minimal-polyfills/Map");
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var runExclusive = require("run-exclusive");
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var encapsulateOpState_1 = require("./util/encapsulateOpState");
var Deferred_1 = require("../tools/Deferred");
var Evt_loosenType_1 = require("./Evt.loosenType");
var safeSetTimeout_1 = require("../tools/safeSetTimeout");
var isPromiseLike_1 = require("../tools/typeSafety/isPromiseLike");
var _1 = require("./types/Operator");
var _2 = require("./types/EvtError");
var _3 = require("./types/interfaces/CtxLike");
var EvtImpl = /** @class */ (function () {
    function EvtImpl() {
        this.lazyEvtAttach = new LazyEvt_1.LazyEvt();
        this.lazyEvtDetach = new LazyEvt_1.LazyEvt();
        this.__maxHandlers = undefined;
        this.postCount = 0;
        this.traceId = null;
        this.handlers = [];
        this.handlerTriggers = new Map_1.Polyfill();
        /*
        NOTE: Used as Date.now() would be used to compare if an event is anterior
        or posterior to an other. We don't use Date.now() because two call within
        less than a ms will return the same value unlike this function.
        */
        this.__currentChronologyMark = 0;
        this.asyncHandlerCount = 0;
    }
    EvtImpl.setDefaultMaxHandlers = function (n) {
        this.__defaultMaxHandlers = isFinite(n) ? n : 0;
    };
    EvtImpl.prototype.toStateful = function (p1, p2) {
        var isP1Ctx = _3.z_3.match(p1);
        var initialValue = isP1Ctx ? undefined : p1;
        var ctx = p2 || (isP1Ctx ? p1 : undefined);
        var out = new importProxy_1.importProxy.StatefulEvt(initialValue);
        var callback = function (data) { return out.post(data); };
        if (!!ctx) {
            this.attach(ctx, callback);
        }
        else {
            this.attach(callback);
        }
        return out;
    };
    EvtImpl.prototype.setMaxHandlers = function (n) {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    };
    EvtImpl.prototype.enableTrace = function (params
    //NOTE: Not typeof console.log as we don't want to expose types from node
    ) {
        var id = params.id, formatter = params.formatter, log = params.log;
        this.traceId = id;
        this.traceFormatter = formatter || (function (data) {
            try {
                return JSON.stringify(data, null, 2);
            }
            catch (_a) {
                return "" + data;
            }
        });
        this.log =
            log === undefined ?
                (function () {
                    var inputs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        inputs[_i] = arguments[_i];
                    }
                    return console.log.apply(console, __spread(inputs));
                }) :
                log === false ? undefined : log;
    };
    EvtImpl.prototype.disableTrace = function () {
        this.traceId = null;
        return this;
    };
    EvtImpl.prototype.getChronologyMark = function () {
        return this.__currentChronologyMark++;
    };
    EvtImpl.prototype.detachHandler = function (handler, wTimer, rejectPr) {
        var index = this.handlers.indexOf(handler);
        if (index < 0) {
            return false;
        }
        if (typeGuard_1.typeGuard(handler, !!handler.ctx)) {
            handler.ctx.zz__removeHandler(handler);
        }
        this.handlers.splice(index, 1);
        if (handler.async) {
            this.asyncHandlerCount--;
        }
        this.handlerTriggers["delete"](handler);
        if (wTimer[0] !== undefined) {
            safeSetTimeout_1.safeClearTimeout(wTimer[0]);
            rejectPr(new _2.EvtError.Detached());
        }
        this.lazyEvtDetach.post(handler);
        return true;
    };
    EvtImpl.prototype.triggerHandler = function (handler, wTimer, resolvePr, opResult) {
        var callback = handler.callback, once = handler.once;
        if (wTimer[0] !== undefined) {
            safeSetTimeout_1.safeClearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }
        doDetachIfNeeded(handler, opResult, once);
        var _a = __read(opResult, 1), transformedData = _a[0];
        var prOrValue = callback === null || callback === void 0 ? void 0 : callback.call(this, transformedData);
        resolvePr === null || resolvePr === void 0 ? void 0 : resolvePr(transformedData);
        return isPromiseLike_1.isPromiseLike(prOrValue) ? prOrValue : undefined;
    };
    EvtImpl.prototype.addHandler = function (propsFromArgs, propsFromMethodName) {
        var _this_1 = this;
        if (_1.z_f1.fλ_Stateful_match(propsFromArgs.op)) {
            this.statelessByStatefulOp.set(propsFromArgs.op, encapsulateOpState_1.encapsulateOpState(propsFromArgs.op));
        }
        var d = new Deferred_1.Deferred();
        var wTimer = [undefined];
        var handler = __assign(__assign(__assign({}, propsFromArgs), propsFromMethodName), { "detach": function () { return _this_1.detachHandler(handler, wTimer, d.reject); }, "promise": d.pr });
        if (typeof handler.timeout === "number") {
            wTimer[0] = safeSetTimeout_1.safeSetTimeout(function () {
                wTimer[0] = undefined;
                handler.detach();
                d.reject(new _2.EvtError.Timeout(handler.timeout));
            }, handler.timeout);
        }
        this.handlerTriggers.set(handler, function (opResult) { return _this_1.triggerHandler(handler, wTimer, d.isPending ? d.resolve : undefined, opResult); });
        if (handler.async) {
            this.asyncHandlerChronologyMark.set(handler, this.getChronologyMark());
        }
        if (handler.prepend) {
            var i = void 0;
            for (i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].extract) {
                    continue;
                }
                break;
            }
            this.handlers.splice(i, 0, handler);
        }
        else {
            this.handlers.push(handler);
        }
        if (handler.async) {
            this.asyncHandlerCount++;
        }
        this.checkForPotentialMemoryLeak();
        if (typeGuard_1.typeGuard(handler, !!handler.ctx)) {
            handler.ctx.zz__addHandler(handler, this);
        }
        this.lazyEvtAttach.post(handler);
        return handler;
    };
    EvtImpl.prototype.checkForPotentialMemoryLeak = function () {
        var maxHandlers = this.__maxHandlers !== undefined ?
            this.__maxHandlers :
            EvtImpl.__defaultMaxHandlers;
        if (maxHandlers === 0 ||
            this.handlers.length % (maxHandlers + 1) !== 0) {
            return;
        }
        var message = [
            "MaxHandlersExceededWarning: Possible Evt memory leak detected.",
            this.handlers.length + " handlers attached" + (this.traceId ? " to \"" + this.traceId + "\"" : "") + ".\n",
            "Use Evt.prototype.setMaxHandlers(n) to increase limit on a specific Evt.\n",
            "Use Evt.setDefaultMaxHandlers(n) to change the default limit currently set to " + EvtImpl.__defaultMaxHandlers + ".\n",
        ].join("");
        var map = new Map_1.Polyfill();
        this.getHandlers()
            .map(function (_a) {
            var ctx = _a.ctx, async = _a.async, once = _a.once, prepend = _a.prepend, extract = _a.extract, op = _a.op, callback = _a.callback;
            return (__assign(__assign({ "hasCtx": !!ctx, once: once,
                prepend: prepend,
                extract: extract, "isWaitFor": async }, (op === Evt_parsePropsFromArgs_1.matchAll ? {} : { "op": op.toString() })), (!callback ? {} : { "callback": callback.toString() })));
        })
            .map(function (obj) {
            return "{\n" + Object.keys(obj)
                .map(function (key) { return "  " + key + ": " + obj[key]; })
                .join(",\n") + "\n}";
        })
            .forEach(function (str) { return map.set(str, (map.has(str) ? map.get(str) : 0) + 1); });
        message += "\n" + Array.from(map.keys())
            .map(function (str) { return map.get(str) + " handler" + (map.get(str) === 1 ? "" : "s") + " like:\n" + str; })
            .join("\n") + "\n";
        if (this.traceId === null) {
            message += "\n" + [
                "To validate the identify of the Evt instance that is triggering this warning you can call",
                "Evt.prototype.enableTrace({ \"id\": \"My evt id\", \"log\": false }) on the Evt that you suspect.\n"
            ].join(" ");
        }
        try {
            console.warn(message);
        }
        catch (_a) {
        }
    };
    EvtImpl.prototype.getStatelessOp = function (op) {
        return _1.z_f1.fλ_Stateful_match(op) ?
            this.statelessByStatefulOp.get(op) :
            op;
    };
    EvtImpl.prototype.trace = function (data) {
        var _this_1 = this;
        var _a;
        if (this.traceId === null) {
            return;
        }
        var message = "(" + this.traceId + ") ";
        var isExtracted = !!this.handlers.find(function (_a) {
            var extract = _a.extract, op = _a.op;
            return (extract &&
                !!_this_1.getStatelessOp(op)(data));
        });
        if (isExtracted) {
            message += "extracted ";
        }
        else {
            var handlerCount = this.handlers
                .filter(function (_a) {
                var extract = _a.extract, op = _a.op;
                return !extract &&
                    !!_this_1.getStatelessOp(op)(data);
            })
                .length;
            message += handlerCount + " handler" + ((handlerCount > 1) ? "s" : "") + ", ";
        }
        (_a = this.log) === null || _a === void 0 ? void 0 : _a.call(this, message + this.traceFormatter(data));
    };
    /** Return [ isExtracted, prAllHandlerCallbacksResolved ] */
    EvtImpl.prototype.postSync = function (data) {
        var e_1, _a;
        var prAllHandlerCallbacksResolved = [];
        var getReturnValue = function (isExtracted) { return [
            isExtracted,
            Promise.all(prAllHandlerCallbacksResolved).then(function () { })
        ]; };
        try {
            for (var _b = __values(__spread(this.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var async = handler.async, op = handler.op, extract = handler.extract;
                if (async) {
                    continue;
                }
                var opResult = invokeOperator_1.invokeOperator(this.getStatelessOp(op), data, true);
                if (_1.z_f1.fλ_Result_NotMatched_match(opResult)) {
                    doDetachIfNeeded(handler, opResult);
                    continue;
                }
                var handlerTrigger = this.handlerTriggers.get(handler);
                //NOTE: Possible if detached while in the loop.
                if (!handlerTrigger) {
                    continue;
                }
                var prOrUndefined = handlerTrigger(opResult);
                if (prOrUndefined !== undefined) {
                    prAllHandlerCallbacksResolved.push(prOrUndefined);
                }
                if (extract) {
                    return getReturnValue(true);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return getReturnValue(false);
    };
    EvtImpl.prototype.postAsyncFactory = function () {
        var _this_1 = this;
        return runExclusive.buildMethodCb(function (data, postChronologyMark, releaseLock) {
            var e_2, _a;
            if (_this_1.asyncHandlerCount === 0) {
                releaseLock();
                return;
            }
            var promises = [];
            var chronologyMarkStartResolveTick;
            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(function () { return chronologyMarkStartResolveTick = _this_1.getChronologyMark(); });
            var _loop_1 = function (handler) {
                if (!handler.async) {
                    return "continue";
                }
                var opResult = invokeOperator_1.invokeOperator(_this_1.getStatelessOp(handler.op), data, true);
                if (_1.z_f1.fλ_Result_NotMatched_match(opResult)) {
                    doDetachIfNeeded(handler, opResult);
                    return "continue";
                }
                var handlerTrigger = _this_1.handlerTriggers.get(handler);
                if (!handlerTrigger) {
                    return "continue";
                }
                var shouldCallHandlerTrigger = (function () {
                    var handlerMark = _this_1.asyncHandlerChronologyMark.get(handler);
                    if (postChronologyMark > handlerMark) {
                        return true;
                    }
                    var exceptionRange = _this_1.asyncHandlerChronologyExceptionRange.get(handler);
                    return (exceptionRange !== undefined &&
                        exceptionRange.lowerMark < postChronologyMark &&
                        postChronologyMark < exceptionRange.upperMark &&
                        handlerMark > exceptionRange.upperMark);
                })();
                if (!shouldCallHandlerTrigger) {
                    return "continue";
                }
                promises.push(new Promise(function (resolve) { return handler.promise
                    .then(function () { return resolve(); })["catch"](function () { return resolve(); }); }));
                handlerTrigger(opResult);
            };
            try {
                for (var _b = __values(__spread(_this_1.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var handler = _c.value;
                    _loop_1(handler);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (promises.length === 0) {
                releaseLock();
                return;
            }
            var handlersDump = __spread(_this_1.handlers);
            Promise.all(promises).then(function () {
                var e_3, _a;
                try {
                    for (var _b = __values(_this_1.handlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var handler = _c.value;
                        if (!handler.async) {
                            continue;
                        }
                        if (handlersDump.indexOf(handler) >= 0) {
                            continue;
                        }
                        _this_1.asyncHandlerChronologyExceptionRange.set(handler, {
                            "lowerMark": postChronologyMark,
                            "upperMark": chronologyMarkStartResolveTick
                        });
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                releaseLock();
            });
        });
    };
    EvtImpl.prototype.isHandled = function (data) {
        var _this_1 = this;
        return !!this.getHandlers()
            .find(function (_a) {
            var op = _a.op;
            return !!_this_1.getStatelessOp(op)(data);
        });
    };
    EvtImpl.prototype.getHandlers = function () {
        return __spread(this.handlers);
    };
    EvtImpl.prototype.detach = function (ctx) {
        var e_4, _a;
        var detachedHandlers = [];
        try {
            for (var _b = __values(this.getHandlers()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                if (ctx !== undefined && handler.ctx !== ctx) {
                    continue;
                }
                var wasStillAttached = handler.detach();
                //NOTE: It should not be possible.
                if (!wasStillAttached) {
                    continue;
                }
                detachedHandlers.push(handler);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return detachedHandlers;
    };
    EvtImpl.prototype.pipe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var evtDelegate = new EvtImpl();
        this.addHandler(__assign(__assign({}, Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "pipe")), { "callback": function (transformedData) { return evtDelegate.post(transformedData); } }), EvtImpl.propsFormMethodNames.attach);
        return evtDelegate;
    };
    EvtImpl.prototype.waitFor = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.addHandler(Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "waitFor"), EvtImpl.propsFormMethodNames.waitFor).promise;
    };
    EvtImpl.prototype.$attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attach.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attach = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attach");
    };
    EvtImpl.prototype.$attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnce.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attachOnce = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOnce");
    };
    EvtImpl.prototype.$attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachExtract.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attachExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachExtract");
    };
    EvtImpl.prototype.$attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachPrepend.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attachPrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachPrepend");
    };
    EvtImpl.prototype.$attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOncePrepend.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attachOncePrepend = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOncePrepend");
    };
    EvtImpl.prototype.$attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spread(inputs));
    };
    EvtImpl.prototype.attachOnceExtract = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.__attachX(args, "attachOnceExtract");
    };
    EvtImpl.prototype.__attachX = function (args, methodName) {
        var propsFromArgs = Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "attach*");
        var handler = this.addHandler(propsFromArgs, EvtImpl.propsFormMethodNames[methodName]);
        return propsFromArgs.timeout === undefined ?
            this :
            handler.promise;
    };
    EvtImpl.prototype.postAsyncOnceHandled = function (data) {
        var _this_1 = this;
        if (this.isHandled(data)) {
            return this.post(data);
        }
        var d = new Deferred_1.Deferred();
        this.evtAttach.attachOnce(function (_a) {
            var op = _a.op;
            return !!invokeOperator_1.invokeOperator(_this_1.getStatelessOp(op), data);
        }, function () { return Promise.resolve().then(function () { return d.resolve(_this_1.post(data)); }); });
        return d.pr;
    };
    EvtImpl.prototype.postOrPostAndWait = function (data, wait) {
        var _this_1 = this;
        this.trace(data);
        overwriteReadonlyProp_1.overwriteReadonlyProp(this, "postCount", this.postCount + 1);
        //NOTE: Must be before postSync.
        var postChronologyMark = this.getChronologyMark();
        var _a = __read(this.postSync(data), 2), isExtracted = _a[0], prAllHandlerCallbacksResolved = _a[1];
        var getReturnValue = wait ?
            function () { return prAllHandlerCallbacksResolved; } :
            function () { return _this_1.postCount; };
        if (isExtracted) {
            return getReturnValue();
        }
        if (this.postAsync === undefined) {
            if (this.asyncHandlerCount === 0) {
                return getReturnValue();
            }
            this.postAsync = this.postAsyncFactory();
        }
        this.postAsync(data, postChronologyMark);
        return getReturnValue();
    };
    EvtImpl.prototype.post = function (data) {
        return this.postOrPostAndWait(data, false);
    };
    EvtImpl.prototype.postAndWait = function (data) {
        return this.postOrPostAndWait(data, true);
    };
    EvtImpl.create = Evt_create_1.create;
    EvtImpl.newCtx = Evt_newCtx_1.newCtx;
    EvtImpl.merge = Evt_merge_1.merge;
    EvtImpl.from = Evt_from_1.from;
    EvtImpl.useEffect = Evt_useEffect_1.useEffect;
    EvtImpl.getCtx = Evt_getCtx_1.getCtxFactory();
    EvtImpl.loosenType = Evt_loosenType_1.loosenType;
    EvtImpl.factorize = Evt_factorize_1.factorize;
    EvtImpl.asPostable = Evt_asPostable_1.asPostable;
    EvtImpl.asyncPipe = Evt_asyncPipe_1.asyncPipe;
    EvtImpl.asNonPostable = Evt_asNonPostable_1.asNonPostable;
    EvtImpl.__defaultMaxHandlers = 25;
    EvtImpl.__1 = (function () {
        if (false) {
            EvtImpl.__1;
        }
        defineAccessors_1.defineAccessors(EvtImpl.prototype, "evtAttach", {
            "get": function () {
                return this.lazyEvtAttach.evt;
            }
        });
        defineAccessors_1.defineAccessors(EvtImpl.prototype, "evtDetach", {
            "get": function () {
                return this.lazyEvtDetach.evt;
            }
        });
    })();
    EvtImpl.__2 = (function () {
        if (false) {
            EvtImpl.__2;
        }
        Object.defineProperties(EvtImpl.prototype, [
            "__asyncHandlerChronologyMark",
            "__asyncHandlerChronologyExceptionRange",
            "__statelessByStatefulOp"
        ].map(function (key) { return [
            key.substr(2),
            {
                "get": function () {
                    if (this[key] === undefined) {
                        this[key] = new WeakMap_1.Polyfill();
                    }
                    return this[key];
                }
            }
        ]; }).reduce(function (prev, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], obj = _c[1];
            return (__assign(__assign({}, prev), (_b = {}, _b[key] = obj, _b)));
        }, {}));
    })();
    EvtImpl.propsFormMethodNames = {
        "waitFor": { "async": true, "extract": false, "once": true, "prepend": false },
        "attach": { "async": false, "extract": false, "once": false, "prepend": false },
        "attachExtract": { "async": false, "extract": true, "once": false, "prepend": true },
        "attachPrepend": { "async": false, "extract": false, "once": false, "prepend": true },
        "attachOnce": { "async": false, "extract": false, "once": true, "prepend": false },
        "attachOncePrepend": { "async": false, "extract": false, "once": true, "prepend": true },
        "attachOnceExtract": { "async": false, "extract": true, "once": true, "prepend": true }
    };
    return EvtImpl;
}());
function doDetachIfNeeded(handler, opResult, once) {
    var detach = _1.z_f1.fλ_Result_getDetachArg(opResult);
    if (typeof detach !== "boolean") {
        var _a = __read(detach, 3), ctx = _a[0], error = _a[1], res = _a[2];
        if (!!error) {
            ctx.abort(error);
        }
        else {
            ctx.done(res);
        }
    }
    else if (detach || !!once) {
        handler.detach();
    }
}
exports.doDetachIfNeeded = doDetachIfNeeded;
exports.Evt = EvtImpl;
try {
    overwriteReadonlyProp_1.overwriteReadonlyProp(exports.Evt, "name", "Evt");
}
catch (_a) { }
importProxy_1.importProxy.Evt = exports.Evt;

},{"../tools/Deferred":47,"../tools/safeSetTimeout":48,"../tools/typeSafety/defineAccessors":50,"../tools/typeSafety/isPromiseLike":54,"../tools/typeSafety/overwriteReadonlyProp":57,"../tools/typeSafety/typeGuard":58,"./Evt.asNonPostable":2,"./Evt.asPostable":3,"./Evt.asyncPipe":4,"./Evt.create":5,"./Evt.factorize":6,"./Evt.from":7,"./Evt.getCtx":8,"./Evt.loosenType":10,"./Evt.merge":11,"./Evt.newCtx":12,"./Evt.parsePropsFromArgs":13,"./Evt.useEffect":14,"./LazyEvt":15,"./importProxy":18,"./types/EvtError":23,"./types/Operator":25,"./types/interfaces/CtxLike":29,"./util/encapsulateOpState":39,"./util/invokeOperator":46,"minimal-polyfills/Array.prototype.find":59,"minimal-polyfills/Map":60,"minimal-polyfills/WeakMap":63,"run-exclusive":64}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.loosenType = void 0;
/**
 * https://docs.evt.land/api/evt/loosenType
 */
function loosenType(evt) {
    return evt;
}
exports.loosenType = loosenType;
/*
import { Evt } from "./Evt";
const x: Evt<boolean> = loosenType(new Evt<true>()); x;
const y: Evt<boolean> = loosenType(new Evt<number>()); y;
*/

},{}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.merge = exports.mergeImpl = void 0;
var importProxy_1 = require("./importProxy");
function mergeImpl(ctx, evts) {
    var evtUnion = new importProxy_1.importProxy.Evt();
    var callback = function (data) { return evtUnion.post(data); };
    evts.forEach(function (evt) {
        if (ctx === undefined) {
            evt.attach(callback);
        }
        else {
            evt.attach(ctx, callback);
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

},{"./importProxy":18}],12:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.newCtx = void 0;
var importProxy_1 = require("./importProxy");
function newCtx() {
    return new importProxy_1.importProxy.Ctx();
}
exports.newCtx = newCtx;

},{"./importProxy":18}],13:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.parsePropsFromArgs = exports.matchAll = void 0;
var id_1 = require("../tools/typeSafety/id");
var compose_1 = require("./util/compose");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
function matchAll() { return true; }
exports.matchAll = matchAll;
var canBeOperator = function (p) {
    return (p !== undefined &&
        typeGuard_1.typeGuard(p) &&
        (typeof p === "function" ||
            typeof p[0] === "function"));
};
var defaultParams = {
    "op": matchAll,
    "ctx": undefined,
    "timeout": undefined,
    "callback": undefined
};
function parsePropsFromArgs(inputs, methodName) {
    typeGuard_1.typeGuard(defaultParams);
    switch (methodName) {
        case "pipe":
            {
                //[]
                //[undefined] ( not valid but user would expect it to work )
                //[ ctx, ...op[] ]
                //[ ...op[] ]
                var getOpWrap = function (ops) {
                    return ops.length === 0 ?
                        {}
                        :
                            { "op": ops.length === 1 ? ops[0] : compose_1.compose.apply(void 0, __spread(ops)) };
                };
                if (canBeOperator(inputs[0])) {
                    //[ ...op[] ]
                    return id_1.id(__assign(__assign({}, defaultParams), getOpWrap(inputs)));
                }
                else {
                    //[]
                    //[ ctx, ...Operator.fλ[] ]
                    var _a = __read(inputs), ctx = _a[0], rest = _a.slice(1);
                    return id_1.id(__assign(__assign(__assign({}, defaultParams), (ctx !== undefined ? { ctx: ctx } : {})), getOpWrap(rest)));
                }
            }
            break;
        case "waitFor":
            {
                //[ op, ctx, timeout ]
                //[ op, ctx, undefined ]
                //[ op, ctx ]
                //[ op, timeout ]
                //[ op, undefined ]
                //[ ctx, timeout ]
                //[ ctx, undefined ]
                //[ op ]
                //[ ctx ]
                //[ timeout ]
                //[ undefined ]
                //[ callback ]
                return parsePropsFromArgs(__spread(inputs.filter(function (value, index) { return !(index === inputs.length - 1 &&
                    value === undefined); }), [
                    defaultParams.callback
                ]), "attach*");
            }
            break;
        case "attach*":
            {
                //NOTE: when callback is undefined call has been forward from waitFor.
                //[ op, ctx, timeout, callback ]
                //[ op, ctx, timeout, undefined ]
                //[ op, ctx, callback ]
                //[ op, ctx, undefined ]
                //[ op, timeout, callback ]
                //[ op, timeout, undefined ]
                //[ ctx, timeout, callback ]
                //[ ctx, timeout, undefined ]
                //[ op, callback ]
                //[ op, undefined ]
                //[ ctx, callback ]
                //[ ctx, undefined ]
                //[ timeout, callback ]
                //[ timeout, undefined ]
                //[ callback ]
                //[ undefined ]
                var n = inputs.length;
                switch (n) {
                    case 4: {
                        //[ op, ctx, timeout, callback ]
                        var _b = __read(inputs, 4), p1 = _b[0], p2 = _b[1], p3 = _b[2], p4 = _b[3];
                        return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "timeout": p3, "callback": p4 }));
                    }
                    case 3: {
                        //[ op, ctx, callback ]
                        //[ op, timeout, callback ]
                        //[ ctx, timeout, callback ]
                        var _c = __read(inputs, 3), p1 = _c[0], p2 = _c[1], p3 = _c[2];
                        if (typeof p2 === "number") {
                            //[ op, timeout, callback ]
                            //[ ctx, timeout, callback ]
                            var timeout = p2;
                            var callback = p3;
                            if (canBeOperator(p1)) {
                                //[ op, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "op": p1 }));
                            }
                            else {
                                //[ ctx, timeout, callback ]
                                return id_1.id(__assign(__assign({}, defaultParams), { timeout: timeout,
                                    callback: callback, "ctx": p1 }));
                            }
                        }
                        else {
                            //[ op, ctx, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "op": p1, "ctx": p2, "callback": p3 }));
                        }
                    }
                    case 2: {
                        //[ op, callback ]
                        //[ ctx, callback ]
                        //[ timeout, callback ]
                        var _d = __read(inputs, 2), p1 = _d[0], p2 = _d[1];
                        if (typeof p1 === "number") {
                            //[ timeout, callback ]
                            return id_1.id(__assign(__assign({}, defaultParams), { "timeout": p1, "callback": p2 }));
                        }
                        else {
                            //[ op, callback ]
                            //[ ctx, callback ]
                            var callback = p2;
                            if (canBeOperator(p1)) {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "op": p1 }));
                            }
                            else {
                                return id_1.id(__assign(__assign({}, defaultParams), { callback: callback, "ctx": p1 }));
                            }
                        }
                    }
                    case 1: {
                        //[ callback ]
                        var _e = __read(inputs, 1), p = _e[0];
                        return id_1.id(__assign(__assign({}, defaultParams), { "callback": p }));
                    }
                    case 0: {
                        return id_1.id(__assign({}, defaultParams));
                    }
                }
            }
            break;
    }
}
exports.parsePropsFromArgs = parsePropsFromArgs;

},{"../tools/typeSafety/id":52,"../tools/typeSafety/typeGuard":58,"./util/compose":38}],14:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.useEffect = void 0;
function useEffect(effect, evt, dataFirst) {
    var i = 0;
    ("state" in evt ? evt.evtChange : evt)
        .attach(function (data) {
        return effect(data, { "isFirst": false, data: data }, i++);
    });
    effect("state" in evt ? evt.state : dataFirst === null || dataFirst === void 0 ? void 0 : dataFirst[0], { "isFirst": true }, i++);
}
exports.useEffect = useEffect;

},{}],15:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.LazyEvt = void 0;
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyEvt = /** @class */ (function () {
    function LazyEvt() {
        this.initialPostCount = 0;
    }
    LazyEvt.prototype.post = function (data) {
        if (this.__evt === undefined) {
            return ++this.initialPostCount;
        }
        return this.__evt.post(data);
    };
    LazyEvt.__1 = (function () {
        if (false) {
            LazyEvt.__1;
        }
        defineAccessors_1.defineAccessors(LazyEvt.prototype, "evt", {
            "get": function () {
                if (this.__evt === undefined) {
                    this.__evt = new importProxy_1.importProxy.Evt();
                    overwriteReadonlyProp_1.overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
                }
                return this.__evt;
            }
        });
    })();
    return LazyEvt;
}());
exports.LazyEvt = LazyEvt;

},{"../tools/typeSafety/defineAccessors":50,"../tools/typeSafety/overwriteReadonlyProp":57,"./importProxy":18}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.LazyStatefulEvt = void 0;
var overwriteReadonlyProp_1 = require("../tools/typeSafety/overwriteReadonlyProp");
var importProxy_1 = require("./importProxy");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyStatefulEvt = /** @class */ (function () {
    function LazyStatefulEvt(initialState) {
        this.initialPostCount = 0;
        this.initialState = initialState;
    }
    LazyStatefulEvt.prototype.post = function (data) {
        if (this.__evt === undefined) {
            this.initialState = data;
            return ++this.initialPostCount;
        }
        return this.__evt.post(data);
    };
    LazyStatefulEvt.__1 = (function () {
        if (false) {
            LazyStatefulEvt.__1;
        }
        defineAccessors_1.defineAccessors(LazyStatefulEvt.prototype, "evt", {
            "get": function () {
                if (this.__evt === undefined) {
                    this.__evt = new importProxy_1.importProxy.StatefulEvt(this.initialState);
                    delete this.initialState;
                    overwriteReadonlyProp_1.overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
                }
                return this.__evt;
            }
        });
    })();
    return LazyStatefulEvt;
}());
exports.LazyStatefulEvt = LazyStatefulEvt;

},{"../tools/typeSafety/defineAccessors":50,"../tools/typeSafety/overwriteReadonlyProp":57,"./importProxy":18}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.StatefulEvt = void 0;
require("minimal-polyfills/Object.is");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyEvt_1 = require("./LazyEvt");
var LazyStatefulEvt_1 = require("./LazyStatefulEvt");
var importProxy_1 = require("./importProxy");
var invokeOperator_1 = require("./util/invokeOperator");
var Evt_parsePropsFromArgs_1 = require("./Evt.parsePropsFromArgs");
var Evt_2 = require("./Evt");
var _1 = require("./types/Operator");
var StatefulEvtImpl = /** @class */ (function (_super) {
    __extends(StatefulEvtImpl, _super);
    function StatefulEvtImpl(initialState) {
        var _this_1 = _super.call(this) || this;
        _this_1.lazyEvtDiff = new LazyEvt_1.LazyEvt();
        _this_1.lazyEvtChangeDiff = new LazyEvt_1.LazyEvt();
        _this_1.__state = initialState;
        _this_1.lazyEvtChange = new LazyStatefulEvt_1.LazyStatefulEvt(_this_1.__state);
        return _this_1;
    }
    StatefulEvtImpl.prototype.post = function (data) {
        return this.__post(data, false);
    };
    StatefulEvtImpl.prototype.postForceChange = function (wData) {
        return this.__post(!!wData ? wData[0] : this.state, true);
    };
    StatefulEvtImpl.prototype.__post = function (data, forceChange) {
        var prevState = this.state;
        this.__state = data;
        var diff = { prevState: prevState, "newState": this.state };
        this.lazyEvtDiff.post(diff);
        if (forceChange || !Object.is(prevState, this.state)) {
            this.lazyEvtChange.post(this.state);
            this.lazyEvtChangeDiff.post(diff);
        }
        return _super.prototype.post.call(this, data);
    };
    StatefulEvtImpl.prototype.pipe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var evt = _super.prototype.pipe.apply(this, __spread(args));
        var opResult = invokeOperator_1.invokeOperator(this.getStatelessOp(Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "pipe").op), this.state);
        if (_1.z_f1.fλ_Result_NotMatched_match(opResult)) {
            throw new Error([
                "Cannot pipe StatefulEvt because the operator does not match",
                "it's current state.",
                "Use evt.toStateless([ctx]).pipe(op).toStatic(initialState)",
                "to be sure the StatefulEvt is correctly initialized"
            ].join(" "));
        }
        return evt.toStateful(opResult[0]);
    };
    StatefulEvtImpl.prototype.toStateless = function (ctx) {
        return !!ctx ? _super.prototype.pipe.call(this, ctx) : _super.prototype.pipe.call(this);
    };
    StatefulEvtImpl.__4 = (function () {
        if (false) {
            StatefulEvtImpl.__4;
        }
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "state", {
            "get": function () { return this.__state; },
            "set": function (state) { this.post(state); }
        });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtDiff", { "get": function () { return this.lazyEvtDiff.evt; } });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtChange", { "get": function () { return this.lazyEvtChange.evt; } });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtChangeDiff", { "get": function () { return this.lazyEvtChangeDiff.evt; } });
    })();
    return StatefulEvtImpl;
}(Evt_2.Evt));
exports.StatefulEvt = StatefulEvtImpl;
importProxy_1.importProxy.StatefulEvt = exports.StatefulEvt;

},{"../tools/typeSafety/defineAccessors":50,"./Evt":9,"./Evt.parsePropsFromArgs":13,"./LazyEvt":15,"./LazyStatefulEvt":16,"./importProxy":18,"./types/Operator":25,"./util/invokeOperator":46,"minimal-polyfills/Object.is":61}],18:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.importProxy = void 0;
/** Manually handling circular import so React Native does not gives warning. */
exports.importProxy = {};

},{}],19:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./types"), exports);
__exportStar(require("./util"), exports);
var Ctx_1 = require("./Ctx");
__createBinding(exports, Ctx_1, "Ctx");
var Evt_2 = require("./Evt");
__createBinding(exports, Evt_2, "Evt");
var StatefulEvt_1 = require("./StatefulEvt");
__createBinding(exports, StatefulEvt_1, "StatefulEvt");
var matchVoid_1 = require("../tools/typeSafety/matchVoid");
__createBinding(exports, matchVoid_1, "matchVoid");

},{"../tools/typeSafety/matchVoid":55,"./Ctx":1,"./Evt":9,"./StatefulEvt":17,"./types":27,"./util":45}],20:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.EventTargetLike = exports.z_2 = void 0;
var typeSafety_1 = require("../../tools/typeSafety");
exports.z_2 = {
    "RxJSSubject_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.subscribe === "function");
    },
    "NodeStyleEventEmitter_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.addListener === "function" &&
            typeof eventTarget.removeListener === "function");
    },
    "JQueryStyleEventEmitter_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.on === "function" &&
            typeof eventTarget.off === "function");
    },
    "HasEventTargetAddRemove_match": function match(eventTarget) {
        return (typeSafety_1.typeGuard(eventTarget) &&
            eventTarget instanceof Object &&
            typeof eventTarget.addEventListener === "function" &&
            typeof eventTarget.removeEventListener === "function");
    },
    "canBe": function canBe(o) {
        try {
            return (exports.z_2.HasEventTargetAddRemove_match(o) ||
                exports.z_2.NodeStyleEventEmitter_match(o) ||
                exports.z_2.JQueryStyleEventEmitter_match(o) ||
                exports.z_2.RxJSSubject_match(o));
        }
        catch (_a) {
            return false;
        }
    }
};
var EventTargetLike;
(function (EventTargetLike) {
    var RxJSSubject;
    (function (RxJSSubject) {
        RxJSSubject.match = exports.z_2.RxJSSubject_match;
    })(RxJSSubject = EventTargetLike.RxJSSubject || (EventTargetLike.RxJSSubject = {}));
    var NodeStyleEventEmitter;
    (function (NodeStyleEventEmitter) {
        ;
        NodeStyleEventEmitter.match = exports.z_2.NodeStyleEventEmitter_match;
    })(NodeStyleEventEmitter = EventTargetLike.NodeStyleEventEmitter || (EventTargetLike.NodeStyleEventEmitter = {}));
    var JQueryStyleEventEmitter;
    (function (JQueryStyleEventEmitter) {
        JQueryStyleEventEmitter.match = exports.z_2.JQueryStyleEventEmitter_match;
    })(JQueryStyleEventEmitter = EventTargetLike.JQueryStyleEventEmitter || (EventTargetLike.JQueryStyleEventEmitter = {}));
    var HasEventTargetAddRemove;
    (function (HasEventTargetAddRemove) {
        HasEventTargetAddRemove.match = exports.z_2.HasEventTargetAddRemove_match;
    })(HasEventTargetAddRemove = EventTargetLike.HasEventTargetAddRemove || (EventTargetLike.HasEventTargetAddRemove = {}));
    /* Return true if o can be a EventTargetLike */
    EventTargetLike.canBe = exports.z_2.canBe;
})(EventTargetLike = exports.EventTargetLike || (exports.EventTargetLike = {}));

},{"../../tools/typeSafety":53}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Detached = void 0;
var Detached = /** @class */ (function (_super) {
    __extends(Detached, _super);
    function Detached() {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Evt handler detached") || this;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return Detached;
}(Error));
exports.Detached = Detached;

},{}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Timeout = void 0;
var Timeout = /** @class */ (function (_super) {
    __extends(Timeout, _super);
    function Timeout(timeout) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Evt timeout after " + timeout + "ms") || this;
        _this_1.timeout = timeout;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return Timeout;
}(Error));
exports.Timeout = Timeout;

},{}],23:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.EvtError = void 0;
var _1 = require("./EvtError.Timeout");
var _2 = require("./EvtError.Detached");
var EvtError;
(function (EvtError) {
    EvtError.Timeout = _1.Timeout;
    EvtError.Detached = _2.Detached;
})(EvtError = exports.EvtError || (exports.EvtError = {}));

},{"./EvtError.Detached":21,"./EvtError.Timeout":22}],24:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],25:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Operator = exports.z_f1 = void 0;
var typeSafety_1 = require("../../tools/typeSafety");
exports.z_f1 = {
    "fλ_Stateful_match": function match(op) {
        return typeof op !== "function";
    },
    "fλ_Result_match": function match(result) {
        return exports.z_f1.fλ_Result_Matched_match(result) || exports.z_f1.fλ_Result_NotMatched_match(result);
    },
    "fλ_Result_getDetachArg": function getDetachArg(result) {
        var detach = exports.z_f1.fλ_Result_Matched_match(result) ? result[1] : result;
        if (exports.z_f1.fλ_Result_Detach_FromEvt_match(detach)) {
            return true;
        }
        if (exports.z_f1.fλ_Result_Detach_WithCtxArg_match(detach)) {
            return [
                detach.DETACH,
                detach.err,
                detach.res
            ];
        }
        return false;
    },
    "fλ_Result_NotMatched_match": function match(result) {
        return (result === null ||
            exports.z_f1.fλ_Result_Detach_match(result));
    },
    "fλ_Result_Matched_match": function match(result) {
        return (typeSafety_1.typeGuard(result) &&
            result instanceof Object &&
            !("input" in result) && //exclude String.prototype.match
            (result.length === 1 ||
                (result.length === 2 &&
                    (result[1] === null ||
                        exports.z_f1.fλ_Result_Detach_match(result[1])))));
    },
    "fλ_Result_Detach_FromEvt_match": function match(detach) {
        return detach === "DETACH";
    },
    "fλ_Result_Detach_WithCtxArg_match": function match(detach) {
        return (typeSafety_1.typeGuard(detach) &&
            detach instanceof Object &&
            detach.DETACH instanceof Object);
    },
    "fλ_Result_Detach_match": function match(detach) {
        return exports.z_f1.fλ_Result_Detach_FromEvt_match(detach) || exports.z_f1.fλ_Result_Detach_WithCtxArg_match(detach);
    }
};
var Operator;
(function (Operator) {
    var fλ;
    (function (fλ) {
        var Stateful;
        (function (Stateful) {
            Stateful.match = exports.z_f1.fλ_Stateful_match;
        })(Stateful = fλ.Stateful || (fλ.Stateful = {}));
        var Result;
        (function (Result) {
            Result.match = exports.z_f1.fλ_Result_match;
            Result.getDetachArg = exports.z_f1.fλ_Result_getDetachArg;
            var NotMatched;
            (function (NotMatched) {
                NotMatched.match = exports.z_f1.fλ_Result_NotMatched_match;
            })(NotMatched = Result.NotMatched || (Result.NotMatched = {}));
            var Matched;
            (function (Matched) {
                Matched.match = exports.z_f1.fλ_Result_Matched_match;
            })(Matched = Result.Matched || (Result.Matched = {}));
            var Detach;
            (function (Detach) {
                var FromEvt;
                (function (FromEvt) {
                    FromEvt.match = exports.z_f1.fλ_Result_Detach_FromEvt_match;
                })(FromEvt = Detach.FromEvt || (Detach.FromEvt = {}));
                var WithCtxArg;
                (function (WithCtxArg) {
                    WithCtxArg.match = exports.z_f1.fλ_Result_Detach_WithCtxArg_match;
                })(WithCtxArg = Detach.WithCtxArg || (Detach.WithCtxArg = {}));
                Detach.match = exports.z_f1.fλ_Result_Detach_match;
            })(Detach = Result.Detach || (Result.Detach = {}));
        })(Result = fλ.Result || (fλ.Result = {}));
    })(fλ = Operator.fλ || (Operator.fλ = {}));
})(Operator = exports.Operator || (exports.Operator = {}));

},{"../../tools/typeSafety":53}],26:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],27:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.dom = void 0;
__exportStar(require("./helper"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./EventTargetLike"), exports);
/*
import * as ns1 from "./EventTargetLike";

export type EventTargetLike<T> = ns1.EventTargetLike<T>;

export namespace EventTargetLike {
    export type HTMLElement = ns1.EventTargetLike.HTMLElement;
    export type Window = ns1.EventTargetLike.Window;
    export type Document = ns1.EventTargetLike.Document;
    export type RxJSSubject<T> = ns1.EventTargetLike.RxJSSubject<T>;
    export namespace RxJSSubject {
        export type Subscription = ns1.EventTargetLike.RxJSSubject.Subscription;
        export const match = ns1.EventTargetLike.RxJSSubject.match;
    }
    export type NodeStyleEventEmitter = ns1.EventTargetLike.NodeStyleEventEmitter;
    export namespace NodeStyleEventEmitter {
        export type Regular = ns1.EventTargetLike.NodeStyleEventEmitter.Regular;
        export type Compat = ns1.EventTargetLike.NodeStyleEventEmitter.Compat;
        export declare type NodeEventHandler = ns1.EventTargetLike.NodeStyleEventEmitter.NodeEventHandler;
        export const match = ns1.EventTargetLike.NodeStyleEventEmitter.match;
    }
    export type JQueryStyleEventEmitter = ns1.EventTargetLike.JQueryStyleEventEmitter;
    export namespace JQueryStyleEventEmitter {
        export const match = ns1.EventTargetLike.JQueryStyleEventEmitter.match;
    }
    export type HasEventTargetAddRemove<E> = ns1.EventTargetLike.HasEventTargetAddRemove<E>;
    export namespace HasEventTargetAddRemove {
        export type Options = ns1.EventTargetLike.HasEventTargetAddRemove.Options;
        export const match = ns1.EventTargetLike.HasEventTargetAddRemove.match;
    }
    export const canBe = ns1.EventTargetLike.canBe;
}
*/
/*
import * as ns2 from "./EvtError";

export type EvtError = ns2.EvtError;

export namespace EvtError {

    export type Timeout = typeof ns2.EvtError.Timeout["prototype"];

    export const Timeout: {
        new(timeout: number): Timeout;
        readonly prototype: Timeout;
    } = ns2.EvtError.Timeout;

    export type Detached = typeof ns2.EvtError.Detached["prototype"];

    export const Detached: {
        new(): Detached;
        readonly prototype: Detached;
    } = ns2.EvtError.Detached;

}
*/
__exportStar(require("./EvtError"), exports);
__exportStar(require("./Handler"), exports);
//type CtxLike<Result> = import("../types/interfaces").CtxLike<Result>;
//
//
///** https://docs.evt.land/api/handler */
//export type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> =
//    import("./Handler").Handler<T, U, CtxProp>;
//
//export namespace Handler {
//
//    /** Handlers params that come from the arguments passed to the method invoked */
//    export type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> =
//        import("./Handler").Handler.PropsFromArgs<T, U, CtxProp>;
//
//    /** 
//     * Handlers params that are implicitly specified by the method used: 
//     * attachOnce => once
//     * attachOncePrepend => once + prepend
//     * waitFor => once + async
//     * ...
//     */
//    export type PropsFromMethodName =
//        import("./Handler").Handler.PropsFromMethodName;
//
//    export namespace PropsFromMethodName {
//
//        export type Sync =
//            import("./Handler").Handler.PropsFromMethodName.Sync;
//
//        export type Async =
//            import("./Handler").Handler.PropsFromMethodName.Async;
//
//    }
//
//    export type WithEvt<T, CtxResult> =
//        import("./Handler").Handler.WithEvt<T, CtxResult>;
//
//
//}
var dom = require("./lib.dom");
exports.dom = dom;
__exportStar(require("./Operator"), exports);
/*
import * as ns3 from "./Operator";

export type Operator<T, U, CtxResult = any> = ns3.Operator<T, U, CtxResult>;
export namespace Operator {

    export type fλ<T, U, CtxResult = any> = ns3.Operator.fλ<T, U, CtxResult>;

    export namespace fλ {

        export type Stateless<T, U, CtxResult = any> = ns3.Operator.fλ.Stateless<T, U, CtxResult>;
        export type Stateful<T, U, CtxResult = any> = ns3.Operator.fλ.Stateful<T,U,CtxResult>;
        export namespace Stateful {
            export const match = ns3.Operator.fλ.Stateful.match;
        }

        export type Result<U, CtxResult = any> = ns3.Operator.fλ.Result<U,CtxResult>;

        export namespace Result {
            export const match = ns3.Operator.fλ.Result.match;
            export const getDetachArg= ns3.Operator.fλ.Result.getDetachArg;
            export type NotMatched<CtxResult = any> = ns3.Operator.fλ.Result.NotMatched<CtxResult>;
            export namespace NotMatched {
                export const match = ns3.Operator.fλ.Result.NotMatched.match;
            }

            export type Matched<U, CtxResult= any> = ns3.Operator.fλ.Result.Matched<U, CtxResult>;

            export namespace Matched {

                export type NoDetachArg<U> = ns3.Operator.fλ.Result.Matched.NoDetachArg<U>;
                export type WithDetachArg<U, CtxResult = any> = ns3.Operator.fλ.Result.Matched.WithDetachArg<U, CtxResult>;
                export const match = ns3.Operator.fλ.Result.Matched.match;

            }

            export type Detach<CtxResult = any> = ns3.Operator.fλ.Result.Detach<CtxResult>;
            export namespace Detach {

                export type FromEvt = ns3.Operator.fλ.Result.Detach.FromEvt;

                export namespace FromEvt {
                    export const match = ns3.Operator.fλ.Result.Detach.FromEvt.match;
                }

                export type WithCtxArg<CtxResult = any> = ns3.Operator.fλ.Result.Detach.WithCtxArg<CtxResult>;

                export namespace WithCtxArg {


                    export type Void = ns3.Operator.fλ.Result.Detach.WithCtxArg.Void;
                    export type Arg<CtxResult> = ns3.Operator.fλ.Result.Detach.WithCtxArg.Arg<CtxResult>;
                    export const match = ns3.Operator.fλ.Result.Detach.WithCtxArg.match;

                }

                export const match = ns3.Operator.fλ.Result.Detach.match;

            }

        }

    }

    export type Stateless<T, U, CtxResult = any> = ns3.Operator.Stateless<T, U, CtxResult>;

}
*/

},{"./EventTargetLike":20,"./EvtError":23,"./Handler":24,"./Operator":25,"./helper":26,"./interfaces":36,"./lib.dom":37}],28:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],29:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.CtxLike = exports.z_3 = void 0;
var typeGuard_1 = require("../../../tools/typeSafety/typeGuard");
exports.z_3 = {
    "match": function match(o) {
        return (typeGuard_1.typeGuard(o) &&
            o instanceof Object &&
            typeof o.done === "function" &&
            typeof o.abort === "function" &&
            typeof o.zz__addHandler === "function" &&
            typeof o.zz__removeHandler === "function");
    }
};
var CtxLike;
(function (CtxLike) {
    CtxLike.match = exports.z_3.match;
})(CtxLike = exports.CtxLike || (exports.CtxLike = {}));

},{"../../../tools/typeSafety/typeGuard":58}],30:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],31:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],32:[function(require,module,exports){
"use strict";
exports.__esModule = true;
;

},{}],33:[function(require,module,exports){
"use strict";
exports.__esModule = true;

},{}],34:[function(require,module,exports){
"use strict";
exports.__esModule = true;
;

},{}],35:[function(require,module,exports){
"use strict";
exports.__esModule = true;
;

},{}],36:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./Ctx"), exports);
__exportStar(require("./CtxLike"), exports);
__exportStar(require("./Evt"), exports);
__exportStar(require("./Postable"), exports);
__exportStar(require("./StatefulEvt"), exports);
__exportStar(require("./StatefulPostable"), exports);
__exportStar(require("./VoidCtx"), exports);
__exportStar(require("./VoidEvt"), exports);

},{"./Ctx":28,"./CtxLike":29,"./Evt":30,"./Postable":31,"./StatefulEvt":32,"./StatefulPostable":33,"./VoidCtx":34,"./VoidEvt":35}],37:[function(require,module,exports){
"use strict";
/*
This is a curated re export of the dom API definitions.

The DOM definitions are available only when "compilerOptions": { "lib": ["DOM"] }}
is present in the tsconfig.json.

We need we re-export those definitions so that we can expose methods that interact with
the DOM ( ex Evt.from ) while not producing type error when
EVT is imported in project that does not use 'lib DOM', typically
projects that targets Node.JS.
*/
exports.__esModule = true;
exports.__hack = void 0;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
exports.__hack = "NOT TYPE ONLY";

},{}],38:[function(require,module,exports){
"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.compose = void 0;
var encapsulateOpState_1 = require("./encapsulateOpState");
var invokeOperator_1 = require("./invokeOperator");
var id_1 = require("../../tools/typeSafety/id");
var assert_1 = require("../../tools/typeSafety/assert");
var typeGuard_1 = require("../../tools/typeSafety/typeGuard");
var _1 = require("../types/Operator");
function f_o_g(op1, op2) {
    var opAtoB = _1.z_f1.fλ_Stateful_match(op1) ?
        encapsulateOpState_1.encapsulateOpState(op1) :
        id_1.id(op1);
    var opBtoC = _1.z_f1.fλ_Stateful_match(op2) ?
        encapsulateOpState_1.encapsulateOpState(op2) :
        id_1.id(op2);
    return id_1.id(function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 3), dataA = _b[0], isPost = _b[2];
        var resultB = invokeOperator_1.invokeOperator(opAtoB, dataA, isPost);
        if (_1.z_f1.fλ_Result_NotMatched_match(resultB)) {
            //CtxResultOp1 assignable to CtxResultOp1 | CtxResultOp2...
            assert_1.assert(typeGuard_1.typeGuard(resultB));
            return resultB;
        }
        var detachOp1 = !!resultB[1] ? resultB[1] : null;
        //...same...
        assert_1.assert(typeGuard_1.typeGuard(detachOp1));
        var _c = __read(resultB, 1), dataB = _c[0];
        var resultC = invokeOperator_1.invokeOperator(opBtoC, dataB, isPost);
        if (_1.Operator.fλ.Result.NotMatched.match(resultC)) {
            //...same
            assert_1.assert(typeGuard_1.typeGuard(resultC));
            return detachOp1 !== null ? detachOp1 : resultC;
        }
        return id_1.id([
            resultC[0],
            !!detachOp1 ? detachOp1 : (!!resultC[1] ? resultC[1] : null)
        ]);
    });
}
function compose() {
    var ops = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ops[_i] = arguments[_i];
    }
    if (ops.length === 1) {
        var _a = __read(ops, 1), op = _a[0];
        return _1.z_f1.fλ_Stateful_match(op) ?
            encapsulateOpState_1.encapsulateOpState(op) :
            op;
    }
    var _b = __read(ops), op1 = _b[0], op2 = _b[1], rest = _b.slice(2);
    var op1_o_op2 = f_o_g(op1, op2);
    if (rest.length === 0) {
        return op1_o_op2;
    }
    return compose.apply(void 0, __spread([op1_o_op2], rest));
}
exports.compose = compose;

},{"../../tools/typeSafety/assert":49,"../../tools/typeSafety/id":52,"../../tools/typeSafety/typeGuard":58,"../types/Operator":25,"./encapsulateOpState":39,"./invokeOperator":46}],39:[function(require,module,exports){
"use strict";
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
exports.__esModule = true;
exports.encapsulateOpState = void 0;
var id_1 = require("../../tools/typeSafety/id");
var _1 = require("../types/Operator");
function encapsulateOpState(statefulFλOp) {
    var state = statefulFλOp[1];
    return id_1.id(function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 3), data = _b[0], cbInvokedIfMatched = _b[2];
        var opResult = statefulFλOp[0](data, state, cbInvokedIfMatched);
        if (!!cbInvokedIfMatched &&
            _1.z_f1.fλ_Result_Matched_match(opResult)) {
            state = opResult[0];
        }
        return opResult;
    });
}
exports.encapsulateOpState = encapsulateOpState;

},{"../../tools/typeSafety/id":52,"../types/Operator":25}],40:[function(require,module,exports){
"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.distinct = void 0;
var compose_1 = require("../compose");
exports.distinct = function (keySelector, ctxFlush) {
    var _a;
    return compose_1.compose(function (data) {
        var _a, _b;
        return [{
                data: data,
                "selectedKey": (_a = keySelector === null || keySelector === void 0 ? void 0 : keySelector(data)) !== null && _a !== void 0 ? _a : data,
                "currentFlushCount": (_b = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _b !== void 0 ? _b : 0
            }];
    }, [
        function (_a, _b) {
            var data = _a.data, selectedKey = _a.selectedKey, currentFlushCount = _a.currentFlushCount;
            var alreadyPostedData = _b.alreadyPostedData, previousFlushCount = _b.previousFlushCount;
            return [{
                    "boxedData": (currentFlushCount !== previousFlushCount ||
                        !alreadyPostedData.has(selectedKey)) ? [data] : null,
                    "alreadyPostedData": new Set(__spread((currentFlushCount !== previousFlushCount ?
                        [] : Array.from(alreadyPostedData)), [
                        selectedKey
                    ])),
                    "previousFlushCount": currentFlushCount
                }];
        },
        {
            "boxedData": null,
            "alreadyPostedData": new Set(),
            "previousFlushCount": (_a = ctxFlush === null || ctxFlush === void 0 ? void 0 : ctxFlush.evtDoneOrAborted.postCount) !== null && _a !== void 0 ? _a : 0
        }
    ], function (_a) {
        var boxedData = _a.boxedData;
        return boxedData;
    });
};

},{"../compose":38}],41:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var throttleTime_1 = require("./throttleTime");
__createBinding(exports, throttleTime_1, "throttleTime");
var to_1 = require("./to");
__createBinding(exports, to_1, "to");
var nonNullable_1 = require("./nonNullable");
__createBinding(exports, nonNullable_1, "nonNullable");
var distinct_1 = require("./distinct");
__createBinding(exports, distinct_1, "distinct");

},{"./distinct":40,"./nonNullable":42,"./throttleTime":43,"./to":44}],42:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.nonNullable = void 0;
var isNonNullable = function (arg) { return arg !== undefined && arg !== null; };
exports.nonNullable = function (data) {
    return !isNonNullable(data) ? null : [data];
};

},{}],43:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.throttleTime = void 0;
var compose_1 = require("../compose");
exports.throttleTime = function (duration) {
    return compose_1.compose([
        function (data, _a) {
            var lastClick = _a.lastClick;
            var now = Date.now();
            return now - lastClick < duration ?
                null :
                [{ data: data, "lastClick": now }];
        },
        { "lastClick": 0, "data": null }
    ], function (_a) {
        var data = _a.data;
        return [data];
    });
};

},{"../compose":38}],44:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.to = void 0;
/*
NOTE: Here we allow a tiny memory leak to be able to emulate
the EventEmitter.removeListener(event, callback) method easily.

evt.getHandlers()
    .filter(handler => (
        handler.callback === callback &&
        handler.op === to("event1")
    ))
    .forEach(handler => handler.detach());
*/
var map = new Map();
/**
 * Operator that helps emulate an EventEmitter with EVT
 * See https://stackblitz.com/edit/evt-honvv3?file=index.ts
 * or https://docs.evt.land/extending_evt
 * */
exports.to = function (eventName) { var _a; return (_a = map.get(eventName)) !== null && _a !== void 0 ? _a : (map.set(eventName, function (data) { return data[0] !== eventName ? null : [data[1]]; }),
    exports.to(eventName)); };

},{}],45:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./genericOperators"), exports);
var compose_1 = require("./compose");
__createBinding(exports, compose_1, "compose");
var invokeOperator_1 = require("./invokeOperator");
__createBinding(exports, invokeOperator_1, "invokeOperator");

},{"./compose":38,"./genericOperators":41,"./invokeOperator":46}],46:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.invokeOperator = void 0;
var _1 = require("../types/Operator");
function invokeOperator(op, data, isPost) {
    var result = op(data, undefined, isPost);
    return _1.z_f1.fλ_Result_match(result) ?
        result :
        !!result ? [data] : null;
}
exports.invokeOperator = invokeOperator;

},{"../types/Operator":25}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.VoidDeferred = exports.Deferred = void 0;
var overwriteReadonlyProp_1 = require("./typeSafety/overwriteReadonlyProp");
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this_1 = this;
        this.isPending = true;
        var resolve;
        var reject;
        this.pr = new Promise(function (resolve_, reject_) {
            resolve = function (value) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                resolve_(value);
            };
            reject = function (error) {
                overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "isPending", false);
                reject_(error);
            };
        });
        this.resolve = resolve;
        this.reject = reject;
    }
    return Deferred;
}());
exports.Deferred = Deferred;
var VoidDeferred = /** @class */ (function (_super) {
    __extends(VoidDeferred, _super);
    function VoidDeferred() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VoidDeferred;
}(Deferred));
exports.VoidDeferred = VoidDeferred;

},{"./typeSafety/overwriteReadonlyProp":57}],48:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.safeClearTimeout = exports.safeSetTimeout = void 0;
exports.safeSetTimeout = function (callback, ms) { return setTimeout(callback, ms); };
exports.safeClearTimeout = function (timer) { return clearTimeout(timer); };

},{}],49:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
exports.assert = exports.AssertionError = void 0;
var overwriteReadonlyProp_1 = require("./overwriteReadonlyProp");
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(msg) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Wrong assertion encountered" + (!msg ? "" : ": \"" + msg + "\"")) || this;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        if (!_this_1.stack) {
            return _this_1;
        }
        try {
            overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "stack", _this_1.stack
                .split("\n")
                .filter(function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var _b = __read(_a, 2), i = _b[1];
                return i !== 1 && i !== 2;
            })
                .join("\n"));
        }
        catch (_a) {
        }
        return _this_1;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
function assert(condition, msg) {
    if (!condition) {
        throw new AssertionError(msg);
    }
}
exports.assert = assert;

},{"./overwriteReadonlyProp":57}],50:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.defineAccessors = void 0;
exports.defineAccessors = function (obj, propertyName, propertyDescriptor) {
    var get = propertyDescriptor.get, set = propertyDescriptor.set;
    Object.defineProperty(obj, propertyName, __assign(__assign(__assign({}, (Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true
    })), (get !== undefined ? { "get": function () { return get.call(this); } } : {})), (set !== undefined ? { "set": function (value) { set.call(this, value); } } : {})));
};

},{}],51:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.exclude = void 0;
/** Return a function to use as Array.prototype.filter argument
 * to exclude one or many primitive value element from the array.
 * Ex: ([ "a", "b" ] as const).filter(exclude("a") return "b"[]
 */
function exclude(target) {
    var test = target instanceof Object ?
        (function (element) { return target.indexOf(element) < 0; }) :
        (function (element) { return element !== target; });
    return function (str) {
        return test(str);
    };
}
exports.exclude = exclude;

},{}],52:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.id = void 0;
/**
 * The identity function.
 *
 * Help to build an object of type T.
 * Better than using 'as T' as there is no type safety loss.
 *
 * - Used as continence for enabling type inference.
 * Example:
 *
 * type Circle = {
 *     type: "CIRCLE";
 *     radius: number;
 * };
 *
 * type Square = {
 *     type: "SQUARE";
 *     side: number;
 * };
 * type Shape= Circle | Square;
 *
 * declare function f(shape: Shape): void;
 *
 * f(id<Circle>({ "type": "CIRCLE", "radius": 33 }); <== We have auto completion to instantiate circle.
 *
 * - Used to loosen the type restriction without saying "trust me" to the compiler.
 * declare const x: Set<readonly ["FOO"]>;
 * declare function f(s: Set<string[]>): void;
 * f(id<Set<any>>(x));
 *
 * Example:
 * declare const x: Set<readonly [ "FOO" ]>;
 * declare f(x: Set<string[]>): void;
 * id(x as Set<["FOO"]>); <== trust me it's readonly!
 * f(id<Set<any>>(x)); <== we acknowledge that we are out of the safe zone.
 */
exports.id = function (x) { return x; };

},{}],53:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var assert_1 = require("./assert");
__createBinding(exports, assert_1, "assert");
var exclude_1 = require("./exclude");
__createBinding(exports, exclude_1, "exclude");
var id_1 = require("./id");
__createBinding(exports, id_1, "id");
var matchVoid_1 = require("./matchVoid");
__createBinding(exports, matchVoid_1, "matchVoid");
var objectKeys_1 = require("./objectKeys");
__createBinding(exports, objectKeys_1, "objectKeys");
var typeGuard_1 = require("./typeGuard");
__createBinding(exports, typeGuard_1, "typeGuard");

},{"./assert":49,"./exclude":51,"./id":52,"./matchVoid":55,"./objectKeys":56,"./typeGuard":58}],54:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.isPromiseLike = void 0;
function isPromiseLike(o) {
    return typeof (o === null || o === void 0 ? void 0 : o.then) === "function";
}
exports.isPromiseLike = isPromiseLike;

},{}],55:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.matchVoid = void 0;
/**
 *
 * Unlike undefined or null, testing o !== void
 * will not restrict the type.
 *
 * Example:
 *
 * declare o: { p: string; } | void;
 *
 * matchVoid(o)?null:o.p <== Type inference ok
 *
 * Match void
 * @param o type of o should be a union of type containing void
 * @returns true if o is undefined
 */
function matchVoid(o) {
    return o === undefined;
}
exports.matchVoid = matchVoid;

},{}],56:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.objectKeys = void 0;
/** Object.keys() with types */
function objectKeys(o) {
    return Object.keys(o);
}
exports.objectKeys = objectKeys;

},{}],57:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.overwriteReadonlyProp = void 0;
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
exports.overwriteReadonlyProp = function (obj, propertyName, value) {
    try {
        obj[propertyName] = value;
    }
    catch (_a) {
    }
    if (obj[propertyName] === value) {
        return value;
    }
    var errorDefineProperty = undefined;
    var propertyDescriptor = Object.getOwnPropertyDescriptor(obj, propertyName) || {
        "enumerable": true,
        "configurable": true
    };
    if (!!propertyDescriptor.get) {
        throw new Error("Probably a wrong ides to overwrite " + propertyName + " getter");
    }
    try {
        Object.defineProperty(obj, propertyName, __assign(__assign({}, propertyDescriptor), { value: value }));
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty || new Error("Can't assign");
    }
    return value;
};

},{}],58:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.typeGuard = void 0;
/**
 * Use cases:
 *
 * 1) When we know the subtype of a variable but the compiler is unaware.
 *
 * declare const x: "FOO" | "BAR";
 *
 * 1.1) If we want to tel the compile that we know x is of type "BAR"
 *
 * assert(typeGuard<"BAR">(x));
 * x; <== x is of type "BAR"
 *
 * 1.2) If we want to tell the compiler that x is NOT of type "BAR"
 *
 * assert(!typeGuard<"BAR">(x,false));
 * x; <== x is of type "FOO"
 *
 * 2) Tell the compiler what assertion can be made on a given variable
 * if a given test return true.
 *
 * type Circle = { type: "CIRCLE"; radius: number; };
 * type Square = { type: "SQUARE"; sideLength: number; };
 * type Shape = Circle | Square;
 *
 * declare const shape: Shape;
 *
 * if( typeGuard<Circle>(shape, shape.type === "CIRCLE") ){
 *     [ shape is Circle ]
 * }else{
 *     [ shape is not Circle ]
 * }
 *
 *
 * export function matchVoid(o: any): o is void {
 *     return typeGuard<void>(o, o === undefined || o === null );
 * }
 *
 * 3) Helper for safely build other type guards
 *
 * export function match<T>(set: Object): set is SetLike<T> {
 *     return (
 *         typeGuard<SetLike<T>>(set) &&
 *         typeof set.values === "function" &&
 *         /Set/.test(Object.getPrototypeOf(set).constructor.name)
 *     );
 * }
 *
 */
function typeGuard(o, isMatched) {
    if (isMatched === void 0) { isMatched = true; }
    o; //NOTE: Just to avoid unused variable;
    return isMatched;
}
exports.typeGuard = typeGuard;

},{}],59:[function(require,module,exports){
"use strict";
exports.__esModule = true;
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}

},{}],60:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = exports.LightMapImpl = void 0;
var LightMapImpl = /** @class */ (function () {
    function LightMapImpl() {
        this.record = [];
    }
    LightMapImpl.prototype.has = function (key) {
        return this.record
            .map(function (_a) {
            var _key = _a[0];
            return _key;
        })
            .indexOf(key) >= 0;
    };
    LightMapImpl.prototype.get = function (key) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            return undefined;
        }
        return entry[1];
    };
    LightMapImpl.prototype.set = function (key, value) {
        var entry = this.record
            .filter(function (_a) {
            var _key = _a[0];
            return _key === key;
        })[0];
        if (entry === undefined) {
            this.record.push([key, value]);
        }
        else {
            entry[1] = value;
        }
        return this;
    };
    LightMapImpl.prototype["delete"] = function (key) {
        var index = this.record.map(function (_a) {
            var key = _a[0];
            return key;
        }).indexOf(key);
        if (index < 0) {
            return false;
        }
        this.record.splice(index, 1);
        return true;
    };
    LightMapImpl.prototype.keys = function () {
        return this.record.map(function (_a) {
            var key = _a[0];
            return key;
        });
    };
    return LightMapImpl;
}());
exports.LightMapImpl = LightMapImpl;
exports.Polyfill = typeof Map !== "undefined" ? Map : LightMapImpl;

},{}],61:[function(require,module,exports){
"use strict";
exports.__esModule = true;
if (!Object.is) {
    Object.is = function (x, y) {
        // SameValue algorithm
        if (x === y) { // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            // Step 6.a: NaN == NaN
            return x !== x && y !== y;
        }
    };
}

},{}],62:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = exports.LightSetImpl = void 0;
var Map_1 = require("./Map");
var LightSetImpl = /** @class */ (function () {
    function LightSetImpl(values) {
        this.map = new Map_1.Polyfill();
        if (values === undefined) {
            return;
        }
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            this.add(value);
        }
    }
    LightSetImpl.prototype.has = function (value) {
        return this.map.has(value);
    };
    LightSetImpl.prototype.add = function (value) {
        this.map.set(value, true);
        return this;
    };
    LightSetImpl.prototype.values = function () {
        return this.map.keys();
    };
    LightSetImpl.prototype["delete"] = function (value) {
        return this.map["delete"](value);
    };
    return LightSetImpl;
}());
exports.LightSetImpl = LightSetImpl;
exports.Polyfill = typeof Set !== "undefined" ? Set : LightSetImpl;

},{"./Map":60}],63:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Polyfill = void 0;
var Map_1 = require("./Map");
exports.Polyfill = typeof WeakMap !== "undefined" ? WeakMap : Map_1.Polyfill;

},{"./Map":60}],64:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.buildMethodCb = exports.buildCb = exports.getPrComplete = exports.isRunning = exports.cancelAllQueuedCalls = exports.getQueuedCallCount = exports.buildMethod = exports.build = exports.createGroupRef = void 0;
var WeakMap_1 = require("minimal-polyfills/WeakMap");
var ExecQueue = /** @class */ (function () {
    function ExecQueue() {
        this.queuedCalls = [];
        this.isRunning = false;
        this.prComplete = Promise.resolve();
    }
    //TODO: move where it is used.
    ExecQueue.prototype.cancelAllQueuedCalls = function () {
        var n;
        this.queuedCalls.splice(0, n = this.queuedCalls.length);
        return n;
    };
    return ExecQueue;
}());
var globalContext = {};
var clusters = new WeakMap_1.Polyfill();
//console.log("Map version");
//export const clusters = new Map<Object, Map<GroupRef,ExecQueue>>();
function getOrCreateExecQueue(context, groupRef) {
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        execQueueByGroup = new WeakMap_1.Polyfill();
        clusters.set(context, execQueueByGroup);
    }
    var execQueue = execQueueByGroup.get(groupRef);
    if (!execQueue) {
        execQueue = new ExecQueue();
        execQueueByGroup.set(groupRef, execQueue);
    }
    return execQueue;
}
function createGroupRef() {
    return new Array(0);
}
exports.createGroupRef = createGroupRef;
function build() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(true, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(true, inputs[0], inputs[1]);
    }
}
exports.build = build;
function buildMethod() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnPromise(false, createGroupRef(), inputs[0]);
        case 2: return buildFnPromise(false, inputs[0], inputs[1]);
    }
}
exports.buildMethod = buildMethod;
/**
 *
 * Get the number of queued call of a run-exclusive function.
 * Note that if you call a runExclusive function and call this
 * directly after it will return 0 as there is one function call
 * execution ongoing but 0 queued.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 * */
function getQueuedCallCount(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.queuedCalls.length : 0;
}
exports.getQueuedCallCount = getQueuedCallCount;
/**
 *
 * Cancel all queued calls of a run-exclusive function.
 * Note that the current running call will not be cancelled.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 *
 */
function cancelAllQueuedCalls(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.cancelAllQueuedCalls() : 0;
}
exports.cancelAllQueuedCalls = cancelAllQueuedCalls;
/**
 * Tell if a run-exclusive function has an instance of it's call currently being
 * performed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function isRunning(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.isRunning : false;
}
exports.isRunning = isRunning;
/**
 * Return a promise that resolve when all the current queued call of a runExclusive functions
 * have completed.
 *
 * The classInstanceObject parameter is to provide only for the run-exclusive
 * function created with 'buildMethod[Cb].
 */
function getPrComplete(runExclusiveFunction, classInstanceObject) {
    var execQueue = getExecQueueByFunctionAndContext(runExclusiveFunction, classInstanceObject);
    return execQueue ? execQueue.prComplete : Promise.resolve();
}
exports.getPrComplete = getPrComplete;
var groupByRunExclusiveFunction = new WeakMap_1.Polyfill();
function getExecQueueByFunctionAndContext(runExclusiveFunction, context) {
    if (context === void 0) { context = globalContext; }
    var groupRef = groupByRunExclusiveFunction.get(runExclusiveFunction);
    if (!groupRef) {
        throw Error("Not a run exclusiveFunction");
    }
    var execQueueByGroup = clusters.get(context);
    if (!execQueueByGroup) {
        return undefined;
    }
    return execQueueByGroup.get(groupRef);
}
function buildFnPromise(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        return new Promise(function (resolve, reject) {
            var onPrCompleteResolve;
            execQueue.prComplete = new Promise(function (resolve) {
                return onPrCompleteResolve = function () { return resolve(); };
            });
            var onComplete = function (result) {
                onPrCompleteResolve();
                execQueue.isRunning = false;
                if (execQueue.queuedCalls.length) {
                    execQueue.queuedCalls.shift()();
                }
                if ("data" in result) {
                    resolve(result.data);
                }
                else {
                    reject(result.reason);
                }
            };
            (function callee() {
                var _this = this;
                var inputs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    inputs[_i] = arguments[_i];
                }
                if (execQueue.isRunning) {
                    execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                    return;
                }
                execQueue.isRunning = true;
                try {
                    fun.apply(this, inputs)
                        .then(function (data) { return onComplete({ data: data }); })["catch"](function (reason) { return onComplete({ reason: reason }); });
                }
                catch (error) {
                    onComplete({ "reason": error });
                }
            }).apply(_this, inputs);
        });
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}
function buildCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(true, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(true, inputs[0], inputs[1]);
    }
}
exports.buildCb = buildCb;
function buildMethodCb() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    switch (inputs.length) {
        case 1: return buildFnCallback(false, createGroupRef(), inputs[0]);
        case 2: return buildFnCallback(false, inputs[0], inputs[1]);
    }
}
exports.buildMethodCb = buildMethodCb;
function buildFnCallback(isGlobal, groupRef, fun) {
    var execQueue;
    var runExclusiveFunction = (function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        if (!isGlobal) {
            if (!(this instanceof Object)) {
                throw new Error("Run exclusive, <this> should be an object");
            }
            execQueue = getOrCreateExecQueue(this, groupRef);
        }
        var callback = undefined;
        if (inputs.length && typeof inputs[inputs.length - 1] === "function") {
            callback = inputs.pop();
        }
        var onPrCompleteResolve;
        execQueue.prComplete = new Promise(function (resolve) {
            return onPrCompleteResolve = function () { return resolve(); };
        });
        var onComplete = function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            onPrCompleteResolve();
            execQueue.isRunning = false;
            if (execQueue.queuedCalls.length) {
                execQueue.queuedCalls.shift()();
            }
            if (callback) {
                callback.apply(_this, inputs);
            }
        };
        onComplete.hasCallback = !!callback;
        (function callee() {
            var _this = this;
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            if (execQueue.isRunning) {
                execQueue.queuedCalls.push(function () { return callee.apply(_this, inputs); });
                return;
            }
            execQueue.isRunning = true;
            try {
                fun.apply(this, __spreadArrays(inputs, [onComplete]));
            }
            catch (error) {
                error.message += " ( This exception should not have been thrown, miss use of run-exclusive buildCb )";
                throw error;
            }
        }).apply(this, inputs);
    });
    if (isGlobal) {
        execQueue = getOrCreateExecQueue(globalContext, groupRef);
    }
    groupByRunExclusiveFunction.set(runExclusiveFunction, groupRef);
    return runExclusiveFunction;
}

},{"minimal-polyfills/WeakMap":63}]},{},[19])(19)
});
//# sourceMappingURL=bundle.js.map
