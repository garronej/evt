"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var runExclusive = require("run-exclusive");
function matchPostable(o) {
    return o instanceof Object && typeof o.post === "function";
}
function isCallable(o) {
    if (typeof o !== "function")
        return false;
    var prototype = o["prototype"];
    if (!prototype)
        return true;
    var methods = Object.getOwnPropertyNames(prototype);
    if (methods.length !== 1)
        return false;
    var name = o.name;
    if (!name)
        return true;
    if (name[0].toUpperCase() === name[0])
        return false;
    return true;
}
exports.isCallable = isCallable;
var matchAll = function () { return true; };
var SyncEvent = /** @class */ (function () {
    function SyncEvent() {
        var _this = this;
        this.postCount = 0;
        this.callbackHandlers = [];
        this.promiseHandlers = [];
        this.postPromisesThenCallbacks = runExclusive.buildMethodCb(function (data, releaseLock) {
            var match_run_detach = function (index, promiseHandler) {
                var matcher = promiseHandler.matcher, timer = promiseHandler.timer, resolve = promiseHandler.resolve;
                if (!matcher(data))
                    return false;
                if (timer)
                    clearTimeout(timer);
                _this.promiseHandlers.splice(index, 1);
                resolve(data);
                return true;
            };
            var extracted = false;
            _this.promiseHandlers.slice().forEach(function (promiseHandler, index) {
                if (!promiseHandler.extract)
                    return;
                if (match_run_detach(index, promiseHandler))
                    extracted = true;
            });
            var matched = extracted;
            if (!extracted) {
                _this.promiseHandlers.slice().forEach(function (promiseHandler, index) {
                    if (promiseHandler.extract)
                        return;
                    if (match_run_detach(index, promiseHandler))
                        matched = true;
                });
                _this.postCallback(data);
            }
            if (matched)
                setTimeout(function () { return releaseLock(); }, 0);
            else
                releaseLock();
        });
        if (arguments.length === 0) {
            this.evtAttach = new SyncEvent("no recursion");
        }
    }
    SyncEvent.prototype.stopWaiting = function () {
        for (var _i = 0, _a = this.promiseHandlers; _i < _a.length; _i++) {
            var timer = _a[_i].timer;
            if (timer)
                clearTimeout(timer);
        }
        this.promiseHandlers.splice(0, this.promiseHandlers.length);
    };
    SyncEvent.prototype.getHandlerCount = function () {
        return this.callbackHandlers.length + this.promiseHandlers.length;
    };
    SyncEvent.prototype.getWaiterCount = function () {
        return this.promiseHandlers.length;
    };
    SyncEvent.prototype.getPermanentHandlerCount = function () {
        return this.callbackHandlers.filter(function (_a) {
            var once = _a.once;
            return !once;
        }).length;
    };
    SyncEvent.prototype.getOnceHandlerCount = function () {
        return this.callbackHandlers.length - this.getPermanentHandlerCount();
    };
    SyncEvent.prototype.createProxy = function (matcher) {
        return this.__createProxy__(matcher, false);
    };
    SyncEvent.prototype.createProxyExtract = function (matcher) {
        return this.__createProxy__(matcher, true);
    };
    SyncEvent.prototype.__createProxy__ = function (matcher, extract) {
        matcher = matcher || matchAll;
        var evt = new SyncEvent();
        if (extract)
            this.attachExtract(matcher, evt);
        else
            this.attach(matcher, evt);
        return evt;
    };
    SyncEvent.prototype.readWaitForParams = function (inputs) {
        inputs = inputs.filter(function (v) { return v; });
        var matcher = matchAll;
        var timeout = undefined;
        var n = inputs.length;
        if (n === 1) {
            if (typeof inputs[0] === "number") {
                timeout = inputs[0];
            }
            else {
                matcher = inputs[0];
            }
        }
        else if (n === 2) {
            matcher = inputs[0];
            timeout = inputs[1];
        }
        return { matcher: matcher, timeout: timeout };
    };
    SyncEvent.prototype.waitFor = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__waitFor__(inputs, false);
    };
    SyncEvent.prototype.waitForExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__waitFor__(inputs, true);
    };
    SyncEvent.prototype.__waitFor__ = function (inputs, extract) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a = _this.readWaitForParams(inputs), matcher = _a.matcher, timeout = _a.timeout;
            var timer = undefined;
            if (typeof timeout === "number") {
                timer = setTimeout(function () {
                    var index = _this.promiseHandlers.indexOf(promiseHandler);
                    _this.promiseHandlers.splice(index, 1);
                    reject(new Error("SyncEvent waitFor timeout, " + timeout + "ms elapsed"));
                }, timeout);
            }
            var promiseHandler = { matcher: matcher, timer: timer, resolve: resolve, extract: extract };
            _this.promiseHandlers.push(promiseHandler);
            if (_this.evtAttach)
                _this.evtAttach.post("waitFor" + (extract ? "Extract" : ""));
        });
    };
    //matcher, boundTo, timeout, handler
    SyncEvent.prototype.readAttachParams = function (inputs) {
        var matcher = matchAll;
        var boundTo = this;
        var timeout = undefined;
        var handler = (function () {
            var h = inputs.pop();
            if (matchPostable(h)) {
                boundTo = h;
                return h.post;
            }
            return h;
        })();
        var r = inputs.length;
        if (r === 3) {
            matcher = inputs[0];
            boundTo = inputs[1];
            timeout = inputs[2];
        }
        else if (r === 2) {
            //matcher, timeout
            //boundTo, timeout
            //matcher, boundTo
            var p1 = inputs[0], p2 = inputs[1];
            if (typeof p2 === "number") {
                //matcher, timeout
                //boundTo, timeout
                timeout = p2;
                if (isCallable(p1)) {
                    //matcher, timeout
                    matcher = p1;
                }
                else {
                    //boundTo, timeout
                    boundTo = p1;
                }
            }
            else {
                //matcher, boundTo
                matcher = p1;
                boundTo = p2;
            }
        }
        else if (r === 1) {
            //matcher
            //boundTo
            //timeout
            var p = inputs[0];
            if (typeof p === "number") {
                //timeout
                timeout = p;
            }
            else if (isCallable(p)) {
                //matcher
                matcher = p;
            }
            else {
                //boundTo
                boundTo = p;
            }
        }
        return { matcher: matcher, boundTo: boundTo, timeout: timeout, handler: handler };
    };
    SyncEvent.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, false, false);
    };
    SyncEvent.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, false, false);
    };
    SyncEvent.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, false, true);
    };
    SyncEvent.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, false, true);
    };
    SyncEvent.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, true, false);
    };
    SyncEvent.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, true, false);
    };
    SyncEvent.prototype.__attach__ = function (inputs, once, extract, prepend) {
        var _this = this;
        var out = this;
        var _a = this.readAttachParams(inputs), matcher = _a.matcher, boundTo = _a.boundTo, timeout = _a.timeout, handler = _a.handler;
        var timer = undefined;
        if (typeof timeout === "number") {
            out = new Promise(function (resolve) {
                timer = setTimeout(function () {
                    var index = _this.callbackHandlers.indexOf(callbackHandler);
                    _this.callbackHandlers.splice(index, 1);
                    resolve();
                }, timeout);
            });
        }
        var callbackHandler = { matcher: matcher, boundTo: boundTo, timer: timer, handler: handler, once: once, extract: extract };
        if (prepend) {
            this.callbackHandlers.unshift(callbackHandler);
        }
        else {
            this.callbackHandlers.push(callbackHandler);
        }
        if (this.evtAttach) {
            this.evtAttach.post("attach" + (once ? "Once" : "") + (extract ? "Extract" : "") + (prepend ? "Prepend" : ""));
        }
        return out;
    };
    SyncEvent.prototype.post = function (data) {
        this.postCount++;
        this.postPromisesThenCallbacks(data);
        return this;
    };
    SyncEvent.prototype.postCallback = function (data) {
        var _this = this;
        var match_run_detach = function (index, callbackHandler) {
            var matcher = callbackHandler.matcher, boundTo = callbackHandler.boundTo, timer = callbackHandler.timer, handler = callbackHandler.handler, once = callbackHandler.once;
            if (!matcher(data))
                return { "matched": false, "stopPropagation": false };
            if (timer)
                clearTimeout(timer);
            if (once)
                _this.callbackHandlers.splice(index, 1);
            if (SyncEvent.stopPropagation === handler.call(boundTo, data))
                return { "matched": true, "stopPropagation": true };
            else
                return { "matched": true, "stopPropagation": false };
        };
        var extracted = false;
        this.callbackHandlers.slice().forEach(function (callbackHandler, index) {
            if (!callbackHandler.extract)
                return;
            extracted = match_run_detach(index, callbackHandler).matched;
        });
        if (extracted)
            return;
        var breakForEach = {};
        try {
            this.callbackHandlers.slice().forEach(function (callbackHandler, index) {
                if (callbackHandler.extract)
                    return;
                var stopPropagation = match_run_detach(index, callbackHandler).stopPropagation;
                if (stopPropagation)
                    throw breakForEach;
            });
        }
        catch (error) {
            if (error !== breakForEach)
                throw error;
        }
    };
    SyncEvent.prototype.readDetachParams = function (inputs) {
        var n = inputs.length;
        if (n === 0) {
            return {};
        }
        else if (n === 2) {
            return { "boundTo": inputs[0], "handler": inputs[1] };
        }
        else {
            var p = inputs[0];
            if (matchPostable(p)) {
                return { "boundTo": p, "handler": p.post };
            }
            else if (p.hasOwnProperty("matcher") ||
                p.hasOwnProperty("boundTo") ||
                p.hasOwnProperty("handler")) {
                var out = {};
                if (p.hasOwnProperty("matcher"))
                    out.matcher = p.matcher;
                if (p.hasOwnProperty("boundTo"))
                    out.boundTo = p.boundTo;
                if (p.hasOwnProperty("handler"))
                    out.handler = p.handler;
                return out;
            }
            else if (isCallable(p)) {
                return { "handler": p };
            }
            else {
                return { "boundTo": p };
            }
        }
    };
    SyncEvent.prototype.detach = function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var by = this.readDetachParams(inputs);
        this.callbackHandlers.slice().forEach(function (_a, index) {
            var matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler;
            if ((by.hasOwnProperty("matcher") ? (by.matcher === matcher) : true) &&
                (by.hasOwnProperty("boundTo") ? (by.boundTo === boundTo) : true) &&
                (by.hasOwnProperty("handler") ? (by.handler === handler) : true))
                _this.callbackHandlers.splice(index, 1);
        });
        if (!Object.keys(by).length)
            this.stopWaiting();
        return this;
    };
    SyncEvent.stopPropagation = [];
    return SyncEvent;
}());
exports.SyncEvent = SyncEvent;
var VoidSyncEvent = /** @class */ (function (_super) {
    __extends(VoidSyncEvent, _super);
    function VoidSyncEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidSyncEvent.prototype.post = function () {
        return _super.prototype.post.call(this, undefined);
    };
    return VoidSyncEvent;
}(SyncEvent));
exports.VoidSyncEvent = VoidSyncEvent;
