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
var typeSafety_1 = require("../tools/typeSafety");
var Map_1 = require("minimal-polyfills/dist/lib/Map");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var Set_1 = require("minimal-polyfills/dist/lib/Set");
require("minimal-polyfills/dist/lib/Array.prototype.find");
var runExclusive = require("run-exclusive");
var defs_1 = require("./defs");
var overwriteReadonlyProp_1 = require("../tools/overwriteReadonlyProp");
var HandlerGroupBaseProtected = /** @class */ (function () {
    function HandlerGroupBaseProtected() {
        this.isHandlerGroupImpl = true;
        this.handlers = new Set_1.Polyfill();
    }
    HandlerGroupBaseProtected.prototype.detach = function () {
        var e_1, _a;
        var _b;
        var detachedHandlers = [];
        try {
            for (var _c = __values(this.handlers.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var handler = _d.value;
                var wasStillAttached = handler.detach();
                if (!wasStillAttached) {
                    continue;
                }
                detachedHandlers.push(handler);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        (_b = this.onDetach) === null || _b === void 0 ? void 0 : _b.call(this, detachedHandlers);
        return detachedHandlers;
    };
    HandlerGroupBaseProtected.prototype.addHandler = function (handler) {
        this.handlers.add(handler);
    };
    HandlerGroupBaseProtected.prototype.removeHandler = function (handler) {
        this.handlers["delete"](handler);
    };
    HandlerGroupBaseProtected.match = function (boundTo) {
        typeSafety_1.assert(typeSafety_1.typeGuard.dry(boundTo));
        return !!boundTo.isHandlerGroupImpl;
    };
    return HandlerGroupBaseProtected;
}());
exports.HandlerGroupBaseProtected = HandlerGroupBaseProtected;
/** If the matcher is not transformative then the transformedData will be the input data */
function invokeMatcher(matcher, data, cbInvokedIfMatched, prev //If stateful prev must be provided
) {
    /*
    const matcherResult = (typeof matcher === "function" ? matcher : matcher[0])(
        data,
        prev,
        isInternalInvocation
    );
    */
    var matcherResult = typeof matcher === "function" ?
        matcher(data, undefined, cbInvokedIfMatched) :
        matcher[0](data, prev, cbInvokedIfMatched);
    //NOTE: We assume it was a transformative matcher only 
    //if the returned value is a singleton or a couple, otherwise 
    //we assume it was a filtering matcher that should have returned
    //a boolean but returned something else.
    return (matcherResult === null ? null :
        matcherResult === "DETACH" ? "DETACH" :
            typeof matcherResult === "object" &&
                (matcherResult.length === 1 || matcherResult.length === 2) ? matcherResult :
                !!matcherResult ? [data] : null);
}
exports.invokeMatcher = invokeMatcher;
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
var EvtBaseProtected = /** @class */ (function () {
    function EvtBaseProtected() {
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
        this.previousDadaOfStatefulTransformativeMatchers = new WeakMap_1.Polyfill();
        this.postAsync = runExclusive.buildMethodCb(function (data, postChronologyMark, releaseLock) {
            var e_2, _a;
            var promises = [];
            var chronologyMarkStartResolveTick;
            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(function () { return chronologyMarkStartResolveTick = _this_1.getChronologyMark(); });
            var _loop_1 = function (handler) {
                if (!handler.async) {
                    return "continue";
                }
                var transformativeMatcherResult = _this_1.invokeMatcher(handler.matcher, data);
                if (defs_1.TransformativeMatcher.Returns.NotMatched.match(transformativeMatcherResult)) {
                    if (defs_1.TransformativeMatcher.Returns.Detach.match(transformativeMatcherResult)) {
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
                handlerTrigger(transformativeMatcherResult);
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
    }
    EvtBaseProtected.createHandlerGroup = function () { return new HandlerGroupBaseProtected(); };
    /** https://garronej.github.io/ts-evt/#evtenabletrace */
    EvtBaseProtected.prototype.enableTrace = function (id, formatter, log
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
    EvtBaseProtected.prototype.disableTrace = function () {
        this.traceId = null;
    };
    EvtBaseProtected.prototype.addHandler = function (userProvidedParams, implicitAttachParams) {
        var _this_1 = this;
        if (typeof userProvidedParams.matcher !== "function") {
            this.previousDadaOfStatefulTransformativeMatchers.set(userProvidedParams.matcher, userProvidedParams.matcher[1]);
        }
        var handler = __assign(__assign(__assign({}, userProvidedParams), implicitAttachParams), { "detach": null, "promise": null });
        if (handler.async) {
            this.asyncHandlerChronologyMark.set(handler, this.getChronologyMark());
        }
        handler.promise = new Promise(function (resolve, reject) {
            var timer = undefined;
            if (typeof handler.timeout === "number") {
                timer = setTimeout(function () {
                    timer = undefined;
                    handler.detach();
                    reject(new defs_1.EvtError.Timeout(handler.timeout));
                }, handler.timeout);
            }
            handler.detach = function () {
                var index = _this_1.handlers.indexOf(handler);
                if (index < 0) {
                    return false;
                }
                if (HandlerGroupBaseProtected.match(handler.boundTo)) {
                    handler.boundTo.removeHandler(handler);
                }
                _this_1.handlers.splice(index, 1);
                _this_1.handlerTriggers["delete"](handler);
                if (timer !== undefined) {
                    clearTimeout(timer);
                    reject(new defs_1.EvtError.Detached());
                }
                _this_1.onHandlerDetached(handler);
                return true;
            };
            _this_1.handlerTriggers.set(handler, function (transformativeMatcherMatchedResult) {
                var callback = handler.callback, once = handler.once;
                if (timer !== undefined) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                var _a = __read(transformativeMatcherMatchedResult, 1), transformedData = _a[0];
                if (once ||
                    (transformativeMatcherMatchedResult.length === 2 &&
                        transformativeMatcherMatchedResult[1] === "DETACH")) {
                    handler.detach();
                }
                else if (typeof handler.matcher !== "function") {
                    _this_1.previousDadaOfStatefulTransformativeMatchers.set(handler.matcher, transformedData);
                }
                /*
                if (
                    once ||
                    (
                        transformativeMatcherMatchedResult.length === 2 &&
                        transformativeMatcherMatchedResult[1] === "DETACH"
                    )
                ) {

                    handler.detach();

                }


                const [transformedData] = transformativeMatcherMatchedResult;

                if (typeof userProvidedParams.matcher !== "function") {

                    this.previousDadaOfStatefulTransformativeMatchers.set(
                        userProvidedParams.matcher,
                        transformedData
                    );

                }
                */
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
        if (HandlerGroupBaseProtected.match(handler.boundTo)) {
            handler.boundTo.addHandler(handler);
        }
        return handler;
    };
    EvtBaseProtected.prototype.trace = function (data) {
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
    EvtBaseProtected.prototype.post = function (data) {
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
    /** If the matcher is not transformative then the transformedData will be the input data */
    EvtBaseProtected.prototype.invokeMatcher = function (matcher, data, cbInvokedIfMatched) {
        /*
        return invokeMatcher<T, U>(
            matcher,
            data,
            typeof matcher === "function" ?
                undefined :
                {
                    "prev": this.previousDadaOfStatefulTransformativeMatchers.get(matcher)!,
                    "isInternalInvocation": true
                }
        );
        */
        return invokeMatcher(matcher, data, cbInvokedIfMatched, typeof matcher === "function" ?
            undefined :
            this.previousDadaOfStatefulTransformativeMatchers.get(matcher));
    };
    /** Return isExtracted */
    EvtBaseProtected.prototype.postSync = function (data) {
        var e_4, _a;
        try {
            for (var _b = __values(__spread(this.handlers)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var handler = _c.value;
                var async = handler.async, matcher = handler.matcher, extract = handler.extract;
                if (async) {
                    continue;
                }
                var transformativeMatcherResult = this.invokeMatcher(matcher, data, true);
                if (defs_1.TransformativeMatcher.Returns.NotMatched.match(transformativeMatcherResult)) {
                    if (defs_1.TransformativeMatcher.Returns.Detach.match(transformativeMatcherResult)) {
                        handler.detach();
                    }
                    continue;
                }
                var handlerTrigger = this.handlerTriggers.get(handler);
                //NOTE: Possible if detached while in the loop.
                if (!handlerTrigger) {
                    continue;
                }
                handlerTrigger(transformativeMatcherResult);
                if (extract) {
                    return true;
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
        return false;
    };
    EvtBaseProtected.prototype.__waitFor = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": true,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    EvtBaseProtected.prototype.__attach = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": false
        }).promise;
    };
    EvtBaseProtected.prototype.__attachExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": false,
            "prepend": true
        }).promise;
    };
    EvtBaseProtected.prototype.__attachPrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": true
        }).promise;
    };
    EvtBaseProtected.prototype.__attachOnce = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    EvtBaseProtected.prototype.__attachOncePrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": true
        }).promise;
    };
    EvtBaseProtected.prototype.__attachOnceExtract = function (attachParams) {
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
    EvtBaseProtected.prototype.isHandled = function (data) {
        var _this_1 = this;
        return !!this.getHandlers()
            .find(function (_a) {
            var matcher = _a.matcher;
            return !!_this_1.invokeMatcher(matcher, data);
        });
    };
    /** https://garronej.github.io/ts-evt/#evtgethandlers */
    EvtBaseProtected.prototype.getHandlers = function () {
        return __spread(this.handlers);
    };
    EvtBaseProtected.prototype.onHandlerDetached = function (handler) {
        //NOTE: Overwritten by EvtCompat for post detach.
    };
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    EvtBaseProtected.prototype.detach = function (boundTo) {
        var e_5, _a;
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
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return detachedHandlers;
    };
    return EvtBaseProtected;
}());
exports.EvtBaseProtected = EvtBaseProtected;
//# sourceMappingURL=EvtBaseProtected.js.map