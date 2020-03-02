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
var Map_1 = require("minimal-polyfills/dist/lib/Map");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
require("minimal-polyfills/dist/lib/Array.prototype.find");
var runExclusive = require("run-exclusive");
var types_1 = require("./types");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var invokeMatcher_1 = require("./util/invokeMatcher");
var HandlerGroupCore_1 = require("./HandlerGroupCore");
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
var EvtCore = /** @class */ (function () {
    function EvtCore() {
        var _this_1 = this;
        this.incrementPostCount = (function () {
            var setPostCount = function (value) { return overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "postCount", value); };
            setPostCount(0);
            return function () { return setPostCount(_this_1.postCount + 1); };
        })();
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
        this.previousDadaOfStateful$Matchers = new WeakMap_1.Polyfill();
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
                var $results = _this_1.invokeMatcher(handler.matcher, data);
                if (types_1.$Matcher.Result.NotMatched.match($results)) {
                    if (types_1.$Matcher.Result.Detach.match($results)) {
                        handler.detach();
                    }
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
                handlerTrigger($results);
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
    }
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    EvtCore.prototype.enableTrace = function (id, formatter, log
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
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    EvtCore.prototype.disableTrace = function () {
        this.traceId = null;
    };
    EvtCore.prototype.onHandlerAdded = function (handler) {
        //NOTE: Overwritten by Evt for post detach.
    };
    EvtCore.prototype.addHandler = function (propsFromArgs, propsFromMethodName) {
        var _this_1 = this;
        if (typeof propsFromArgs.matcher !== "function") {
            this.previousDadaOfStateful$Matchers.set(propsFromArgs.matcher, propsFromArgs.matcher[1]);
        }
        var handler = __assign(__assign(__assign({}, propsFromArgs), propsFromMethodName), { "detach": null, "promise": null });
        if (handler.async) {
            this.asyncHandlerChronologyMark.set(handler, this.getChronologyMark());
        }
        handler.promise = new Promise(function (resolve, reject) {
            var timer = undefined;
            if (typeof handler.timeout === "number") {
                timer = setTimeout(function () {
                    timer = undefined;
                    handler.detach();
                    reject(new types_1.EvtError.Timeout(handler.timeout));
                }, handler.timeout);
            }
            handler.detach = function () {
                var index = _this_1.handlers.indexOf(handler);
                if (index < 0) {
                    return false;
                }
                if (HandlerGroupCore_1.HandlerGroupCore.match(handler.boundTo)) {
                    handler.boundTo.removeHandler(handler);
                }
                _this_1.handlers.splice(index, 1);
                _this_1.handlerTriggers["delete"](handler);
                if (timer !== undefined) {
                    clearTimeout(timer);
                    reject(new types_1.EvtError.Detached());
                }
                _this_1.onHandlerDetached(handler);
                return true;
            };
            _this_1.handlerTriggers.set(handler, function ($matchedResult) {
                var callback = handler.callback, once = handler.once;
                if (timer !== undefined) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                var _a = __read($matchedResult, 1), transformedData = _a[0];
                if (once ||
                    ($matchedResult.length === 2 &&
                        $matchedResult[1] === "DETACH")) {
                    handler.detach();
                }
                else if (typeof handler.matcher !== "function") {
                    _this_1.previousDadaOfStateful$Matchers.set(handler.matcher, transformedData);
                }
                callback === null || callback === void 0 ? void 0 : callback.call(handler.boundTo, transformedData);
                resolve(transformedData);
            });
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
        if (HandlerGroupCore_1.HandlerGroupCore.match(handler.boundTo)) {
            handler.boundTo.addHandler(handler);
        }
        this.onHandlerAdded(handler);
        return handler;
    };
    EvtCore.prototype.trace = function (data) {
        var _this_1 = this;
        if (this.traceId === null) {
            return;
        }
        var message = "(" + this.traceId + ") ";
        var isExtracted = !!this.handlers.find(function (_a) {
            var extract = _a.extract, matcher = _a.matcher;
            return extract && !!_this_1.invokeMatcher(matcher, data);
        });
        if (isExtracted) {
            message += "extracted ";
        }
        else {
            var handlerCount = this.handlers
                .filter(function (_a) {
                var extract = _a.extract, matcher = _a.matcher;
                return !extract && !!_this_1.invokeMatcher(matcher, data);
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
    EvtCore.prototype.post = function (data) {
        this.trace(data);
        this.incrementPostCount();
        //NOTE: Must be before postSync.
        var postChronologyMark = this.getChronologyMark();
        var isExtracted = this.postSync(data);
        if (!isExtracted) {
            this.postAsync(data, postChronologyMark);
        }
        return this.postCount;
    };
    /** If the matcher is not $ then the transformedData will be the input data */
    EvtCore.prototype.invokeMatcher = function (matcher, data, cbInvokedIfMatched) {
        return invokeMatcher_1.invokeMatcher(matcher, data, cbInvokedIfMatched, typeof matcher === "function" ?
            undefined :
            this.previousDadaOfStateful$Matchers.get(matcher));
    };
    /** Return isExtracted */
    EvtCore.prototype.postSync = function (data) {
        var e_3, _a;
        try {
            for (var _b = __values(__spread(this.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var async = handler.async, matcher = handler.matcher, extract = handler.extract;
                if (async) {
                    continue;
                }
                var $results = this.invokeMatcher(matcher, data, true);
                if (types_1.$Matcher.Result.NotMatched.match($results)) {
                    if (types_1.$Matcher.Result.Detach.match($results)) {
                        handler.detach();
                    }
                    continue;
                }
                var handlerTrigger = this.handlerTriggers.get(handler);
                //NOTE: Possible if detached while in the loop.
                if (!handlerTrigger) {
                    continue;
                }
                handlerTrigger($results);
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
    EvtCore.prototype.__waitFor = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": true,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    EvtCore.prototype.__attach = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": false
        }).promise;
    };
    EvtCore.prototype.__attachExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": false,
            "prepend": true
        }).promise;
    };
    EvtCore.prototype.__attachPrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": true
        }).promise;
    };
    EvtCore.prototype.__attachOnce = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    EvtCore.prototype.__attachOncePrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": true
        }).promise;
    };
    EvtCore.prototype.__attachOnceExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": true,
            "prepend": true
        }).promise;
    };
    /**
     * https://garronej.github.io/ts-evt/#evtishandleddata
     *
     * Test if posting a given event data will have an effect.
     *
     * Return true if:
     * -There is at least one handler matching
     * this event data ( at least one handler's callback function
     * will be invoked if the data is posted. )
     * -There is at least one handler that will be detached
     * if the event data is posted.
     *
     */
    EvtCore.prototype.isHandled = function (data) {
        var _this_1 = this;
        return !!this.getHandlers()
            .find(function (_a) {
            var matcher = _a.matcher;
            return !!_this_1.invokeMatcher(matcher, data);
        });
    };
    /** https://garronej.github.io/ts-evt/#evtgethandlers */
    EvtCore.prototype.getHandlers = function () {
        return __spread(this.handlers);
    };
    EvtCore.prototype.onHandlerDetached = function (handler) {
        //NOTE: Overwritten by Evt for post detach.
    };
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    EvtCore.prototype.detach = function (boundTo) {
        var e_4, _a;
        var detachedHandlers = [];
        try {
            for (var _b = __values(this.getHandlers()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                if (boundTo === undefined || handler.boundTo === boundTo) {
                    var wasStillAttached = handler.detach();
                    if (!wasStillAttached) {
                        continue;
                    }
                    detachedHandlers.push(handler);
                }
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
    return EvtCore;
}());
exports.EvtCore = EvtCore;
//# sourceMappingURL=EvtCore.js.map