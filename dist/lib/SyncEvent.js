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
var SyncEvent = (function () {
    function SyncEvent() {
        var _this = this;
        this.postCount = 0;
        this.callbackHandlers = [];
        this.promiseHandlers = [];
        this.postPromise = runExclusive.buildMethodCb(function (data, callback) {
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
                setImmediate(function () { return callback(); });
            else
                callback();
        });
        if (arguments.length === 0)
            this.evtAttach = new SyncEvent("no recursion");
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
        matcher = matcher || SyncEvent.defaultEvtMatcher;
        var evt = new SyncEvent();
        if (extract)
            this.attachExtract(matcher, evt);
        else
            this.attach(matcher, evt);
        return evt;
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
    SyncEvent.prototype.readWaitForParams = function (inputs) {
        inputs = inputs.filter(function (v) { return v; });
        if (inputs.length === 0)
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": undefined };
        else if (inputs.length === 1 && typeof inputs[0] === "number")
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": inputs[0] };
        else if (inputs.length === 1)
            return { "matcher": inputs[0], "timeout": undefined };
        else
            return { "matcher": inputs[0], "timeout": inputs[1] };
    };
    SyncEvent.prototype.__waitFor__ = function (inputs, extract) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _a = _this.readWaitForParams(inputs), matcher = _a.matcher, timeout = _a.timeout;
            var timer = undefined;
            if (timeout) {
                timer = setTimeout(function () {
                    var index = _this.promiseHandlers.indexOf(promiseHandler);
                    _this.promiseHandlers.splice(index, 1);
                    reject(new Error("waitFor() timeout after " + timeout + " ms"));
                }, timeout);
            }
            var promiseHandler = { matcher: matcher, timer: timer, resolve: resolve, extract: extract };
            _this.promiseHandlers.push(promiseHandler);
            if (_this.evtAttach)
                _this.evtAttach.post("waitFor" + (extract ? "Extract" : ""));
        });
    };
    SyncEvent.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, false, false);
    };
    SyncEvent.prototype.attachOncePrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, false, true);
    };
    SyncEvent.prototype.attachOnceExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, true, true, false);
    };
    SyncEvent.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, false, false);
    };
    SyncEvent.prototype.attachPrepend = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, false, true);
    };
    SyncEvent.prototype.attachExtract = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        return this.__attach__(inputs, false, true, false);
    };
    SyncEvent.prototype.readAttachParams = function (inputs) {
        var outAsArray = undefined;
        if (inputs.length === 1 &&
            (inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"))
            outAsArray = [
                SyncEvent.defaultEvtMatcher,
                inputs[0],
                inputs[0].post
            ];
        else if (inputs.length === 1)
            outAsArray = [
                SyncEvent.defaultEvtMatcher,
                this,
                inputs[0]
            ];
        else if (inputs.length === 2 &&
            (inputs[1] instanceof Object &&
                typeof inputs[1].post === "function"))
            outAsArray = [
                inputs[0],
                inputs[1],
                inputs[1].post
            ];
        else if (inputs.length === 2 &&
            typeof inputs[0] === "function")
            outAsArray = [
                inputs[0],
                this,
                inputs[1]
            ];
        else if (inputs.length === 2)
            outAsArray = [
                SyncEvent.defaultEvtMatcher,
                inputs[0],
                inputs[1]
            ];
        else if (inputs.length === 3)
            outAsArray = [
                inputs[0],
                inputs[1],
                inputs[2]
            ];
        var _a = outAsArray, matcher = _a[0], boundTo = _a[1], handler = _a[2];
        return { matcher: matcher, boundTo: boundTo, handler: handler };
    };
    SyncEvent.prototype.__attach__ = function (inputs, once, extract, prepend) {
        var _a = this.readAttachParams(inputs), matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler;
        if (prepend)
            this.callbackHandlers.unshift({ matcher: matcher, boundTo: boundTo, handler: handler, once: once, extract: extract });
        else
            this.callbackHandlers.push({ matcher: matcher, boundTo: boundTo, handler: handler, once: once, extract: extract });
        if (this.evtAttach)
            this.evtAttach.post("attach" + (once ? "Once" : "") + (extract ? "Extract" : "") + (prepend ? "Prepend" : ""));
        return this;
    };
    SyncEvent.prototype.readDetachParams = function (inputs) {
        if (inputs.length === 0)
            return {};
        else if (inputs.length === 1 &&
            (inputs[0] instanceof Object &&
                typeof inputs[0].post === "function"))
            return { "boundTo": inputs[0], "handler": inputs[0].post };
        else if (inputs.length === 1 &&
            (inputs[0].hasOwnProperty("matcher") ||
                inputs[0].hasOwnProperty("boundTo") ||
                inputs[0].hasOwnProperty("handler"))) {
            var out = {};
            if (inputs[0].hasOwnProperty("matcher"))
                out.matcher = inputs[0].matcher;
            if (inputs[0].hasOwnProperty("boundTo"))
                out.boundTo = inputs[0].boundTo;
            if (inputs[0].hasOwnProperty("handler"))
                out.handler = inputs[0].handler;
            return out;
        }
        else if (inputs.length === 1 &&
            typeof inputs[0] !== "function")
            return { "boundTo": inputs[0] };
        else if (inputs.length === 1)
            return { "handler": inputs[0] };
        else if (inputs.length === 2)
            return { "boundTo": inputs[0], "handler": inputs[1] };
        return null;
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
    SyncEvent.prototype.post = function (data) {
        this.postCount++;
        this.postPromise(data);
        return this;
    };
    SyncEvent.prototype.postCallback = function (data) {
        var _this = this;
        var match_run_detach = function (index, callbackHandler) {
            var matcher = callbackHandler.matcher, boundTo = callbackHandler.boundTo, handler = callbackHandler.handler, once = callbackHandler.once;
            if (!matcher(data))
                return { "matched": false, "stopPropagation": false };
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
    SyncEvent.stopPropagation = {};
    SyncEvent.defaultEvtMatcher = function () { return true; };
    return SyncEvent;
}());
exports.SyncEvent = SyncEvent;
var VoidSyncEvent = (function (_super) {
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
