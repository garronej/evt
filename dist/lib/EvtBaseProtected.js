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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Map_1 = require("minimal-polyfills/dist/lib/Map");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
require("minimal-polyfills/dist/lib/Array.prototype.find");
var runExclusive = require("run-exclusive");
var defs_1 = require("./defs");
/** If the matcher is not transformative then the transformedData will be the input data */
function invokeMatcher(matcher, data) {
    var matcherResult = matcher(data);
    return typeof matcherResult === "boolean" ?
        (matcherResult ? [data] : null)
        :
            matcherResult;
}
exports.invokeMatcher = invokeMatcher;
/** Evt without evtAttach property, attachOnceMatched, createDelegate and without overload */
var EvtBaseProtected = /** @class */ (function () {
    function EvtBaseProtected() {
        var _this_1 = this;
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
        this.postAsync = runExclusive.buildMethodCb(function (data, postChronologyMark, releaseLock) {
            var promises = [];
            var chronologyMarkStartResolveTick;
            //NOTE: Must be before handlerTrigger call.
            Promise.resolve().then(function () { return chronologyMarkStartResolveTick = _this_1.getChronologyMark(); });
            var _loop_1 = function (handler) {
                if (!handler.async) {
                    return "continue";
                }
                var transformativeMatcherResult = invokeMatcher(handler.matcher, data);
                if (transformativeMatcherResult === null) {
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
                handlerTrigger(transformativeMatcherResult[0]);
            };
            for (var _i = 0, _a = __spreadArrays(_this_1.handlers); _i < _a.length; _i++) {
                var handler = _a[_i];
                _loop_1(handler);
            }
            if (promises.length === 0) {
                releaseLock();
                return;
            }
            var handlersDump = __spreadArrays(_this_1.handlers);
            Promise.all(promises).then(function () {
                for (var _i = 0, _a = _this_1.handlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
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
                releaseLock();
            });
        });
    }
    EvtBaseProtected.prototype.enableTrace = function (id, formatter, log //NOTE: we don't want to expose types from node
    ) {
        this.traceId = id;
        this.traceFormatter = (formatter !== null && formatter !== void 0 ? formatter : (function (data) {
            try {
                return JSON.stringify(data, null, 2);
            }
            catch (_a) {
                return "" + data;
            }
        }));
        this.log = (log !== null && log !== void 0 ? log : (function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            return console.log.apply(console, inputs);
        }));
    };
    EvtBaseProtected.prototype.disableTrace = function () {
        this.traceId = null;
    };
    EvtBaseProtected.prototype.addHandler = function (attachParams, implicitAttachParams) {
        var _this_1 = this;
        var handler = __assign(__assign(__assign({}, attachParams), implicitAttachParams), { "detach": null, "promise": null });
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
                _this_1.handlers.splice(index, 1);
                _this_1.handlerTriggers["delete"](handler);
                if (timer !== undefined) {
                    clearTimeout(timer);
                    reject(new defs_1.EvtError.Detached());
                }
                return true;
            };
            _this_1.handlerTriggers.set(handler, function (dataOrTransformedData) {
                var _a;
                var callback = handler.callback, once = handler.once;
                if (timer !== undefined) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                if (once) {
                    handler.detach();
                }
                (_a = callback) === null || _a === void 0 ? void 0 : _a.call(handler.boundTo, dataOrTransformedData);
                resolve(dataOrTransformedData);
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
        return handler;
    };
    EvtBaseProtected.prototype.trace = function (data) {
        if (this.traceId === null) {
            return;
        }
        var message = "(" + this.traceId + ") ";
        var isExtracted = !!this.handlers.find(function (_a) {
            var extract = _a.extract, matcher = _a.matcher;
            return extract && matcher(data);
        });
        if (isExtracted) {
            message += "extracted ";
        }
        else {
            var handlerCount = this.handlers
                .filter(function (_a) {
                var extract = _a.extract, matcher = _a.matcher;
                return !extract && matcher(data);
            })
                .length;
            message += handlerCount + " handler" + ((handlerCount > 1) ? "s" : "") + " => ";
        }
        this.log(message + this.traceFormatter(data));
    };
    /** Returns post count */
    EvtBaseProtected.prototype.post = function (data) {
        this.trace(data);
        this.postCount++;
        //NOTE: Must be before postSync.
        var postChronologyMark = this.getChronologyMark();
        var isExtracted = this.postSync(data);
        if (!isExtracted) {
            this.postAsync(data, postChronologyMark);
        }
        return this.postCount;
    };
    /** Return isExtracted */
    EvtBaseProtected.prototype.postSync = function (data) {
        for (var _i = 0, _a = __spreadArrays(this.handlers); _i < _a.length; _i++) {
            var handler = _a[_i];
            var async = handler.async, matcher = handler.matcher, extract = handler.extract;
            if (async) {
                continue;
            }
            var transformativeMatcherResult = invokeMatcher(matcher, data);
            if (transformativeMatcherResult === null) {
                continue;
            }
            var handlerTrigger = this.handlerTriggers.get(handler);
            //NOTE: Possible if detached while in the loop.
            if (!handlerTrigger) {
                continue;
            }
            handlerTrigger(transformativeMatcherResult[0]);
            if (extract) {
                return true;
            }
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
    EvtBaseProtected.prototype.getHandlers = function () {
        return __spreadArrays(this.handlers);
    };
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    EvtBaseProtected.prototype.detach = function (boundTo) {
        var detachedHandlers = [];
        for (var _i = 0, _a = __spreadArrays(this.handlers); _i < _a.length; _i++) {
            var handler = _a[_i];
            if (boundTo === undefined || handler.boundTo === boundTo) {
                handler.detach();
                detachedHandlers.push(handler);
            }
        }
        return detachedHandlers;
    };
    return EvtBaseProtected;
}());
exports.EvtBaseProtected = EvtBaseProtected;
