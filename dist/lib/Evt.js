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
require("minimal-polyfills/dist/lib/Array.prototype.find");
var Map_1 = require("minimal-polyfills/dist/lib/Map");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var runExclusive = require("run-exclusive");
var EvtError_1 = require("./types/EvtError");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var encapsulateOpState_1 = require("./util/encapsulateOpState");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var Operator_1 = require("./types/Operator");
var Ctx_1 = require("./Ctx");
var invokeOperator_1 = require("./util/invokeOperator");
var merge_1 = require("./util/merge");
var from_1 = require("./util/from");
var parseOverloadParams_1 = require("./util/parseOverloadParams");
var getLazyEvtFactory_1 = require("./util/getLazyEvtFactory");
var getCtxFactory_1 = require("./util/getCtxFactory");
exports.setPostCount = function (evt, value) {
    return overwriteReadonlyProp_1.overwriteReadonlyProp(evt, "postCount", value);
};
/** https://docs.evt.land/api/evt */
var Evt = /** @class */ (function () {
    function Evt() {
        var _this_1 = this;
        this.__maxHandlers = 25;
        //NOTE: Not really readonly but we want to prevent user from setting the value
        //manually and we cant user accessor because we target es3.
        /**
         * https://docs.evt.land/api/evt/post
         *
         * Number of times .post(data) have been called.
         */
        this.postCount = 0;
        this.traceId = null;
        this.handlers = [];
        this.handlerTriggers = new Map_1.Polyfill();
        //NOTE: An async handler ( attached with waitFor ) is only eligible to handle a post if the post
        //occurred after the handler was set. We don't want to waitFor event from the past.
        //private readonly asyncHandlerChronologyMark = new WeakMap<ImplicitParams.Async, number>();
        this.asyncHandlerChronologyMark = new WeakMap_1.Polyfill();
        //NOTE: There is an exception to the above rule, we want to allow async waitFor loop 
        //do so we have to handle the case where multiple event would be posted synchronously.
        this.asyncHandlerChronologyExceptionRange = new WeakMap_1.Polyfill();
        /*
        NOTE: Used as Date.now() would be used to compare if an event is anterior
        or posterior to an other. We don't use Date.now() because two call within
        less than a ms will return the same value unlike this function.
        */
        this.getChronologyMark = (function () {
            var currentChronologyMark = 0;
            return function () { return currentChronologyMark++; };
        })();
        this.statelessByStatefulOp = new WeakMap_1.Polyfill();
        this.postAsync = runExclusive.buildMethodCb(function (data, postChronologyMark, releaseLock) {
            var e_1, _a;
            var promises = [];
            var chronologyMarkStartResolveTick;
            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(function () { return chronologyMarkStartResolveTick = _this_1.getChronologyMark(); });
            var _loop_1 = function (handler) {
                if (!handler.async) {
                    return "continue";
                }
                var opResult = invokeOperator_1.invokeOperator(_this_1.getStatelessOp(handler.op), data, true);
                if (Operator_1.Operator.fλ.Result.NotMatched.match(opResult)) {
                    Evt.doDetachIfNeeded(handler, opResult);
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (promises.length === 0) {
                releaseLock();
                return;
            }
            var handlersDump = __spread(_this_1.handlers);
            Promise.all(promises).then(function () {
                var e_2, _a;
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
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                releaseLock();
            });
        });
        this.__parseOverloadParams = parseOverloadParams_1.parseOverloadParamsFactory();
        var _a = getLazyEvtFactory_1.getLazyEvtFactory(), getEvtAttach = _a.getEvt, postEvtAttach = _a.post;
        var _b = getLazyEvtFactory_1.getLazyEvtFactory(), getEvtDetach = _b.getEvt, postEvtDetach = _b.post;
        this.onHandler = function (isAttach, handler) {
            return (isAttach ? postEvtAttach : postEvtDetach)(handler);
        };
        this.getEvtAttach = getEvtAttach;
        this.getEvtDetach = getEvtDetach;
    }
    Evt.newCtx = function () {
        return new Ctx_1.Ctx();
    };
    /** https://docs.evt.land/api/evt/post */
    Evt.prototype.postAsyncOnceHandled = function (data) {
        var _this_1 = this;
        if (this.isHandled(data)) {
            return this.post(data);
        }
        var resolvePr;
        var pr = new Promise(function (resolve) { return resolvePr = resolve; });
        this.getEvtAttach().attachOnce(function (_a) {
            var op = _a.op;
            return !!invokeOperator_1.invokeOperator(_this_1.getStatelessOp(op), data);
        }, function () { return Promise.resolve().then(function () { return resolvePr(_this_1.post(data)); }); });
        return pr;
    };
    /**
     *
     * By default EventEmitters will print a warning if more than 25 handlers are added for
     * a particular event. This is a useful default that helps finding memory leaks.
     * Not all events should be limited to 25 handlers. The evt.setMaxHandlers() method allows the limit to be
     * modified for this specific EventEmitter instance.
     * The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.
     * Returns a reference to the EventEmitter, so that calls can be chained.
     *
     */
    Evt.prototype.setMaxHandlers = function (n) {
        this.__maxHandlers = isFinite(n) ? n : 0;
        return this;
    };
    /** https://docs.evt.land/api/evt/enabletrace */
    Evt.prototype.enableTrace = function (id, formatter, log
    //NOTE: Not typeof console.log as we don't want to expose types from node
    ) {
        this.traceId = id;
        this.traceFormatter = formatter !== null && formatter !== void 0 ? formatter : (function (data) {
            try {
                return JSON.stringify(data, null, 2);
            }
            catch (_a) {
                return "" + data;
            }
        });
        this.log = log !== null && log !== void 0 ? log : (function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            return console.log.apply(console, __spread(inputs));
        });
    };
    /** https://docs.evt.land/api/evt/enabletrace */
    Evt.prototype.disableTrace = function () {
        this.traceId = null;
    };
    Evt.prototype.detachHandler = function (handler, wTimer, rejectPr) {
        var _a;
        var index = this.handlers.indexOf(handler);
        if (index < 0) {
            return false;
        }
        if (typeGuard_1.typeGuard.dry(handler, !!handler.ctx)) {
            handler.ctx.zz__removeHandler(handler);
        }
        this.handlers.splice(index, 1);
        this.handlerTriggers["delete"](handler);
        if (wTimer[0] !== undefined) {
            clearTimeout(wTimer[0]);
            rejectPr(new EvtError_1.EvtError.Detached());
        }
        (_a = this.onHandler) === null || _a === void 0 ? void 0 : _a.call(this, false, handler);
        return true;
    };
    Evt.doDetachIfNeeded = function (handler, opResult, once) {
        var detach = Operator_1.Operator.fλ.Result.getDetachArg(opResult);
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
    };
    Evt.prototype.triggerHandler = function (handler, wTimer, resolvePr, opResult) {
        var callback = handler.callback, once = handler.once;
        if (wTimer[0] !== undefined) {
            clearTimeout(wTimer[0]);
            wTimer[0] = undefined;
        }
        Evt.doDetachIfNeeded(handler, opResult, once);
        var _a = __read(opResult, 1), transformedData = _a[0];
        callback === null || callback === void 0 ? void 0 : callback.call(this, transformedData);
        resolvePr(transformedData);
    };
    Evt.prototype.addHandler = function (propsFromArgs, propsFromMethodName) {
        var _this_1 = this;
        var _a;
        if (Operator_1.Operator.fλ.Stateful.match(propsFromArgs.op)) {
            this.statelessByStatefulOp.set(propsFromArgs.op, encapsulateOpState_1.encapsulateOpState(propsFromArgs.op));
        }
        var handler = __assign(__assign(__assign({}, propsFromArgs), propsFromMethodName), { "detach": null, "promise": null });
        if (handler.async) {
            this.asyncHandlerChronologyMark.set(handler, this.getChronologyMark());
        }
        handler.promise = new Promise(function (resolve, reject) {
            var wTimer = [undefined];
            if (typeof handler.timeout === "number") {
                wTimer[0] = setTimeout(function () {
                    wTimer[0] = undefined;
                    handler.detach();
                    reject(new EvtError_1.EvtError.Timeout(handler.timeout));
                }, handler.timeout);
            }
            handler.detach =
                function () { return _this_1.detachHandler(handler, wTimer, reject); };
            _this_1.handlerTriggers.set(handler, function (opResult) { return _this_1.triggerHandler(handler, wTimer, resolve, opResult); });
        });
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
        if (this.__maxHandlers !== 0 &&
            this.handlers.length % (this.__maxHandlers + 1) === 0) {
            var message = [
                "MaxHandlersExceededWarning: Possible Evt memory leak detected.",
                this.handlers.length + " handlers attached" + (this.traceId ? " to " + this.traceId : "") + ".",
                "Use evt.setMaxHandlers() to increase limit."
            ].join(" ");
            try {
                console.warn(message);
            }
            catch (_b) {
            }
        }
        if (typeGuard_1.typeGuard.dry(handler, !!handler.ctx)) {
            handler.ctx.zz__addHandler(handler, this);
        }
        (_a = this.onHandler) === null || _a === void 0 ? void 0 : _a.call(this, true, handler);
        return handler;
    };
    /** https://docs.evt.land/api/evt/getstatelessop */
    Evt.prototype.getStatelessOp = function (op) {
        return Operator_1.Operator.fλ.Stateful.match(op) ?
            this.statelessByStatefulOp.get(op) :
            op;
    };
    Evt.prototype.trace = function (data) {
        var _this_1 = this;
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
            message += handlerCount + " handler" + ((handlerCount > 1) ? "s" : "") + " => ";
        }
        this.log(message + this.traceFormatter(data));
    };
    /**
     * https://garronej.github.io/ts-evt/#evtattach-evtattachonce-and-evtpost
     *
     * Returns post count
     * */
    Evt.prototype.post = function (data) {
        this.trace(data);
        exports.setPostCount(this, this.postCount + 1);
        //NOTE: Must be before postSync.
        var postChronologyMark = this.getChronologyMark();
        var isExtracted = this.postSync(data);
        if (!isExtracted) {
            this.postAsync(data, postChronologyMark);
        }
        return this.postCount;
    };
    /** Return isExtracted */
    Evt.prototype.postSync = function (data) {
        var e_3, _a;
        try {
            for (var _b = __values(__spread(this.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var async = handler.async, op = handler.op, extract = handler.extract;
                if (async) {
                    continue;
                }
                var opResult = invokeOperator_1.invokeOperator(this.getStatelessOp(op), data, true);
                if (Operator_1.Operator.fλ.Result.NotMatched.match(opResult)) {
                    Evt.doDetachIfNeeded(handler, opResult);
                    continue;
                }
                var handlerTrigger = this.handlerTriggers.get(handler);
                //NOTE: Possible if detached while in the loop.
                if (!handlerTrigger) {
                    continue;
                }
                handlerTrigger(opResult);
                if (extract) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
    };
    Evt.prototype.__waitFor = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": true,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    Evt.prototype.__attach = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": false
        }).promise;
    };
    Evt.prototype.__attachExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": false,
            "prepend": true
        }).promise;
    };
    Evt.prototype.__attachPrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": true
        }).promise;
    };
    Evt.prototype.__attachOnce = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    Evt.prototype.__attachOncePrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": true
        }).promise;
    };
    Evt.prototype.__attachOnceExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": true,
            "prepend": true
        }).promise;
    };
    /**
     * https://docs.evt.land/api/evt/ishandled
     *
     * Test if posting a given event data will have an effect.
     *
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -Handlers could be will be detached
     * if the event data is posted.
     *
     */
    Evt.prototype.isHandled = function (data) {
        var _this_1 = this;
        return !!this.getHandlers()
            .find(function (_a) {
            var op = _a.op;
            return !!_this_1.getStatelessOp(op)(data);
        });
    };
    /** https://docs.evt.land/api/evt/gethandler */
    Evt.prototype.getHandlers = function () {
        return __spread(this.handlers);
    };
    Evt.prototype.detach = function (ctx) {
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
    Evt.prototype.pipe = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var evtDelegate = new Evt();
        this.__attach(__assign(__assign({}, this.__parseOverloadParams(inputs, "pipe")), { "callback": function (transformedData) { return evtDelegate.post(transformedData); } }));
        return evtDelegate;
    };
    Evt.prototype.waitFor = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__waitFor(this.__parseOverloadParams(inputs, "waitFor"));
    };
    Evt.prototype.$attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attach.apply(this, __spread(inputs));
    };
    Evt.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach(this.__parseOverloadParams(inputs, "attach*"));
    };
    Evt.prototype.$attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnce.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnce(this.__parseOverloadParams(inputs, "attach*"));
    };
    Evt.prototype.$attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spread(inputs));
    };
    Evt.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachExtract(this.__parseOverloadParams(inputs, "attach*"));
    };
    Evt.prototype.$attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachPrepend.apply(this, __spread(inputs));
    };
    Evt.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachPrepend(this.__parseOverloadParams(inputs, "attach*"));
    };
    Evt.prototype.$attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOncePrepend.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOncePrepend(this.__parseOverloadParams(inputs, "attach*"));
    };
    Evt.prototype.$attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.attachOnceExtract.apply(this, __spread(inputs));
    };
    Evt.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attachOnceExtract(this.__parseOverloadParams(inputs, "attach*"));
    };
    /**
     * https://docs.evt.land/api/evt/getctx
     *
     * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
     * No strong reference to the object is created
     * when the object is no longer referenced it's associated Ctx will be freed from memory.
     */
    Evt.getCtx = getCtxFactory_1.getCtxFactory();
    /** https://docs.evt.land/api/evt/merge */
    Evt.merge = merge_1.merge;
    /** https://docs.evt.land/api/evt/from */
    Evt.from = from_1.from;
    return Evt;
}());
exports.Evt = Evt;
/** https://docs.evt.land/api/voidevt */
var VoidEvt = /** @class */ (function (_super) {
    __extends(VoidEvt, _super);
    function VoidEvt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidEvt.prototype.post = function () {
        return _super.prototype.post.call(this, undefined);
    };
    VoidEvt.prototype.postAsyncOnceHandled = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.postAsyncOnceHandled.call(this, undefined)];
            });
        });
    };
    return VoidEvt;
}(Evt));
exports.VoidEvt = VoidEvt;
//# sourceMappingURL=Evt.js.map