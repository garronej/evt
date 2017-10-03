"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var runExclusive = require("run-exclusive");
var Map = require("es6-map");
var defaultFormatter = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return inputs[0];
};
/** SyncEvent without evtAttach property and without overload */
var SyncEventBaseProtected = /** @class */ (function () {
    function SyncEventBaseProtected() {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var _this = this;
        this.postCount = 0;
        this.traceId = null;
        this.traceFormatter = function (data) { return JSON.stringify(data, null, 2); };
        this.handlers = [];
        this.handlerTriggers = new Map();
        this.postAsync = runExclusive.buildCb(function (handlersDump, data, releaseLock) {
            var isHandled = false;
            for (var _i = 0, handlersDump_1 = handlersDump; _i < handlersDump_1.length; _i++) {
                var handler = handlersDump_1[_i];
                var async = handler.async, matcher = handler.matcher;
                if (!async || !matcher(data))
                    continue;
                var handlerTrigger = _this.handlerTriggers.get(handler);
                if (!handlerTrigger)
                    continue;
                isHandled = true;
                handlerTrigger(data);
            }
            if (isHandled) {
                setTimeout(releaseLock, 0);
            }
            else {
                releaseLock();
            }
        });
        if (!inputs.length)
            return;
        var eventEmitter = inputs[0], eventName = inputs[1];
        var formatter = inputs[2] || defaultFormatter;
        eventEmitter.on(eventName, function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            return _this.post(defaultFormatter(inputs));
        });
    }
    SyncEventBaseProtected.prototype.enableTrace = function (id, formatter) {
        this.traceId = id;
        if (formatter) {
            this.traceFormatter = formatter;
        }
    };
    SyncEventBaseProtected.prototype.disableTrace = function () {
        this.traceId = null;
    };
    SyncEventBaseProtected.prototype.addHandler = function (attachParams, implicitAttachParams) {
        var _this = this;
        var handler = __assign({}, attachParams, implicitAttachParams, { "detach": function () {
                var index = _this.handlers.indexOf(handler);
                if (index < 0)
                    return false;
                _this.handlers.splice(index, 1);
                _this.handlerTriggers["delete"](handler);
                return true;
            }, "promise": null });
        handler.promise = new Promise(function (resolve, reject) {
            var timer = undefined;
            if (handler.timeout) {
                timer = setTimeout(function () {
                    handler.detach();
                    reject(new Error("SyncEvent timeout after " + handler.timeout + "ms"));
                }, handler.timeout);
            }
            _this.handlerTriggers.set(handler, function (data) {
                var callback = handler.callback, once = handler.once;
                if (timer) {
                    clearTimeout(timer);
                }
                if (once) {
                    handler.detach();
                }
                if (callback) {
                    callback.call(handler.boundTo, data);
                }
                resolve(data);
            });
        });
        if (handler.prepend) {
            var i = void 0;
            for (i = 0; i < this.handlers.length; i++) {
                if (this.handlers[i].extract) {
                    continue;
                }
                else {
                    break;
                }
            }
            this.handlers.splice(i, 0, handler);
        }
        else {
            this.handlers.push(handler);
        }
        return handler;
    };
    SyncEventBaseProtected.prototype.trace = function (data) {
        if (typeof this.traceId !== "string")
            return;
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
        try {
            console.log(message + this.traceFormatter(data));
        }
        catch (error) {
            console.log(message, data);
        }
    };
    SyncEventBaseProtected.prototype.post = function (data) {
        this.trace(data);
        this.postCount++;
        var handlersDup = this.handlers.slice();
        var isExtracted = this.postSync(data);
        if (!isExtracted) {
            this.postAsync(handlersDup, data);
        }
        return this.postCount;
    };
    SyncEventBaseProtected.prototype.postSync = function (data) {
        for (var _i = 0, _a = this.handlers.slice(); _i < _a.length; _i++) {
            var handler = _a[_i];
            var async = handler.async, matcher = handler.matcher, extract = handler.extract;
            if (async || !matcher(data))
                continue;
            this.handlerTriggers.get(handler)(data);
            if (extract)
                return true;
        }
        return false;
    };
    SyncEventBaseProtected.prototype.__waitFor = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": true,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attach = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": false
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attachExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": false,
            "prepend": true
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attachPrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": false,
            "prepend": true
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attachOnce = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": false
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attachOncePrepend = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": false,
            "once": true,
            "prepend": true
        }).promise;
    };
    SyncEventBaseProtected.prototype.__attachOnceExtract = function (attachParams) {
        return this.addHandler(attachParams, {
            "async": false,
            "extract": true,
            "once": true,
            "prepend": true
        }).promise;
    };
    SyncEventBaseProtected.prototype.getHandlers = function () { return this.handlers.slice(); };
    /** Detach every handler bound to a given object or all handlers, return the detached handlers */
    SyncEventBaseProtected.prototype.detach = function (boundTo) {
        var n = arguments.length;
        var detachedHandlers = [];
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (!n || handler.boundTo === boundTo) {
                handler.detach();
                detachedHandlers.push(handler);
            }
        }
        return detachedHandlers;
    };
    return SyncEventBaseProtected;
}());
exports.SyncEventBaseProtected = SyncEventBaseProtected;
