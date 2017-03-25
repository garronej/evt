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
Object.defineProperty(exports, "__esModule", { value: true });
var ts_exec_queue_1 = require("ts-exec-queue");
var SyncEvent = (function () {
    function SyncEvent() {
        var _this = this;
        this.postCount = 0;
        this.handlers = [];
        this.promiseHandlers = [];
        this.postPromise = ts_exec_queue_1.execQueue(function (data, callback) {
            var promiseHandlers = _this.promiseHandlers.slice();
            var run = false;
            for (var index = 0; index < promiseHandlers.length; index++) {
                var _a = promiseHandlers[index], matcher = _a.matcher, timer = _a.timer, resolve = _a.resolve;
                if (!matcher(data))
                    continue;
                if (!run)
                    run = true;
                if (timer)
                    clearTimeout(timer);
                _this.promiseHandlers.splice(index, 1);
                resolve(data);
            }
            if (run)
                setImmediate(callback);
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
    Object.defineProperty(SyncEvent.prototype, "handlerCount", {
        get: function () {
            return this.handlers.length + this.promiseHandlers.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncEvent.prototype, "waiterCount", {
        get: function () {
            return this.promiseHandlers.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncEvent.prototype, "permanentHandlerCount", {
        get: function () {
            var out = 0;
            for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
                var type = _a[_i].type;
                if (type === "attach")
                    out++;
            }
            return out;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SyncEvent.prototype, "onceHandlerCount", {
        get: function () {
            return this.handlers.length - this.permanentHandlerCount;
        },
        enumerable: true,
        configurable: true
    });
    SyncEvent.prototype.readWaitForParams = function (inputs) {
        if (inputs.length === 0)
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": undefined };
        else if (inputs.length === 1 && typeof inputs[0] === "number")
            return { "matcher": SyncEvent.defaultEvtMatcher, "timeout": inputs[0] };
        else if (inputs.length === 1)
            return { "matcher": inputs[0], "timeout": undefined };
        else
            return { "matcher": inputs[0], "timeout": inputs[1] };
    };
    SyncEvent.prototype.waitFor = function () {
        var _this = this;
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
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
            var promiseHandler = { matcher: matcher, timer: timer, resolve: resolve };
            _this.promiseHandlers.push(promiseHandler);
            if (!_this.evtAttach)
                return;
            _this.evtAttach.post("waitFor");
        });
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
    SyncEvent.prototype.attachOnce = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var _a = this.readAttachParams(inputs), matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler;
        this.__attach__("attachOnce", matcher, boundTo, handler);
    };
    SyncEvent.prototype.attach = function () {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var _a = this.readAttachParams(inputs), matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler;
        this.__attach__("attach", matcher, boundTo, handler);
    };
    SyncEvent.prototype.__attach__ = function (type, matcher, boundTo, handler) {
        this.handlers.push({ matcher: matcher, boundTo: boundTo, handler: handler, type: type });
        if (!this.evtAttach)
            return;
        this.evtAttach.post(type);
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
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var by = this.readDetachParams(inputs);
        var handlers = this.handlers.slice();
        for (var index = 0; index < handlers.length; index++) {
            var _a = handlers[index], matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler;
            if ((by.hasOwnProperty("matcher") ? (by.matcher === matcher) : true) &&
                (by.hasOwnProperty("boundTo") ? (by.boundTo === boundTo) : true) &&
                (by.hasOwnProperty("handler") ? (by.handler === handler) : true))
                this.handlers.splice(index, 1);
        }
        if (!Object.keys(by).length)
            this.stopWaiting();
    };
    SyncEvent.prototype.post = function (data) {
        this.postCount++;
        //if( (data as any) !== "attach" && (data as any) !== "attachOnce")
        //console.log(this.handlers);
        var handlers = this.handlers.slice();
        for (var index = 0; index < handlers.length; index++) {
            var _a = handlers[index], matcher = _a.matcher, boundTo = _a.boundTo, handler = _a.handler, type = _a.type;
            if (!matcher(data))
                continue;
            if (type === "attachOnce")
                this.handlers.splice(index, 1);
            handler.call(boundTo, data);
        }
        this.postPromise(data);
    };
    return SyncEvent;
}());
SyncEvent.defaultEvtMatcher = function () { return true; };
exports.SyncEvent = SyncEvent;
var VoidSyncEvent = (function (_super) {
    __extends(VoidSyncEvent, _super);
    function VoidSyncEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoidSyncEvent.prototype.post = function () {
        _super.prototype.post.call(this, undefined);
    };
    return VoidSyncEvent;
}(SyncEvent));
exports.VoidSyncEvent = VoidSyncEvent;
//# sourceMappingURL=SyncEvent.js.map