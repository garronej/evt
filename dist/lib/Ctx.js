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
var Set_1 = require("minimal-polyfills/dist/lib/Set");
var WeakMap_1 = require("minimal-polyfills/dist/lib/WeakMap");
var getLazyEvtFactory_1 = require("./util/getLazyEvtFactory");
/** https://docs.evt.land/api/ctx */
var Ctx = /** @class */ (function () {
    function Ctx() {
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
        {
            var _a = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _a.getEvt, post = _a.post;
            this.onDone = post;
            this.getEvtDone = getEvt;
        }
        {
            var _b = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _b.getEvt, post = _b.post;
            this.getEvtAttach = getEvt;
            this.onAttach = post;
        }
        {
            var _c = getLazyEvtFactory_1.getLazyEvtFactory(), getEvt = _c.getEvt, post = _c.post;
            this.getEvtDetach = getEvt;
            this.onDetach = post;
        }
    }
    /**
     *
     * https://docs.evt.land/api/ctx#ctx-getprdone-timeout
     *
     * Return a promise that resolve next time ctx.done(result) is invoked
     * Reject if ctx.abort(error) is invoked.
     * Optionally a timeout can be passed, if so the returned promise will reject
     * with EvtError.Timeout if done(result) is not called * within [timeout]ms.
     * If the timeout is reached ctx.abort(timeoutError) will be invoked.
     */
    Ctx.prototype.getPrDone = function (timeout) {
        var _this_1 = this;
        return this.getEvtDone()
            .waitFor(timeout)
            .then(function (_a) {
            var _b = __read(_a, 2), error = _b[0], result = _b[1];
            if (!!error) {
                throw error;
            }
            return result;
        }, function (timeoutError) {
            _this_1.abort(timeoutError);
            throw timeoutError;
        });
    };
    /**
     * https://docs.evt.land/api/ctx#ctx-abort-error
     *
     * All the handler will be detached.
     * evtDone will post [ error, undefined, handlers (detached) ]
     * if getPrDone() was invoked the promise will reject with the error
     */
    Ctx.prototype.abort = function (error) {
        return this.__done(error);
    };
    /**
     * https://docs.evt.land/api/ctx#ctx-done-result
     *
     * Detach all handlers.
     * evtDone will post [ null, result, handlers (detached) ]
     * If getPrDone() was invoked the promise will result with result
     */
    Ctx.prototype.done = function (result) {
        return this.__done(undefined, result);
    };
    /** Detach all handler bound to this context from theirs respective Evt and post getEvtDone() */
    Ctx.prototype.__done = function (error, result) {
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
        this.onDone([
            error !== null && error !== void 0 ? error : null,
            result,
            handlers
        ]);
        return handlers;
    };
    /** https://docs.evt.land/api/ctx#ctx-gethandlers */
    Ctx.prototype.getHandlers = function () {
        var _this_1 = this;
        return Array.from(this.handlers.values())
            .map(function (handler) { return ({ handler: handler, "evt": _this_1.evtByHandler.get(handler) }); });
    };
    Ctx.__addHandlerToCtxCore = function (handler, evt) {
        var ctx = handler.ctx;
        ctx.handlers.add(handler);
        ctx.evtByHandler.set(handler, evt);
        ctx.onAttach({ handler: handler, evt: evt });
    };
    Ctx.__removeHandlerFromCtxCore = function (handler) {
        var ctx = handler.ctx;
        ctx.onDetach({ handler: handler, "evt": ctx.evtByHandler.get(handler) });
        ctx.handlers["delete"](handler);
    };
    Ctx.__matchHandlerBoundToCtx = function (handler) {
        return handler.ctx !== undefined;
    };
    return Ctx;
}());
exports.Ctx = Ctx;
//NOTE: Could be declared only, but in case someone import it, to avoid runtime error we declare it.
/** https://docs.evt.land/api/ctx */
var VoidCtx = /** @class */ (function (_super) {
    __extends(VoidCtx, _super);
    function VoidCtx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Detach all handlers.
     * evtDone will post [ null, undefined, handlers (detached) ]
     * If getPrDone() was invoked the promise will resolve
     */
    VoidCtx.prototype.done = function () {
        return _super.prototype.done.call(this, undefined);
    };
    return VoidCtx;
}(Ctx));
exports.VoidCtx = VoidCtx;
//# sourceMappingURL=Ctx.js.map