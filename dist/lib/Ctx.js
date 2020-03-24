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
var assert_1 = require("../tools/typeSafety/assert");
var typeGuard_1 = require("../tools/typeSafety/typeGuard");
var LazyEvtFactory_1 = require("./util/LazyEvtFactory");
var importProxy_1 = require("./importProxy");
/** https://docs.evt.land/api/ctx */
var Ctx = /** @class */ (function () {
    function Ctx() {
        this.handlers = new Set_1.Polyfill();
        this.evtByHandler = new WeakMap_1.Polyfill();
        {
            var lazyEvtAttachFactory_1 = new LazyEvtFactory_1.LazyEvtFactory();
            var lazyEvtDetachFactory_1 = new LazyEvtFactory_1.LazyEvtFactory();
            this.onHandler = function (isAttach, handler) {
                return isAttach ?
                    lazyEvtAttachFactory_1.post(handler) :
                    lazyEvtDetachFactory_1.post(handler);
            };
            this.getEvtAttach = function () { return lazyEvtAttachFactory_1.getEvt(); };
            this.getEvtDetach = function () { return lazyEvtDetachFactory_1.getEvt(); };
        }
        {
            var lazyEvtDoneFactory_1 = new LazyEvtFactory_1.LazyEvtFactory();
            this.onDone = function (doneEvtData) { return lazyEvtDoneFactory_1.post(doneEvtData); };
            this.getEvtDone = function () { return lazyEvtDoneFactory_1.getEvt(); };
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
    /** Exposed only to enable safe interoperability between mismatching EVT versions, do not use */
    Ctx.prototype.zz__addHandler = function (handler, evt) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(typeGuard_1.typeGuard(handler));
        this.handlers.add(handler);
        this.evtByHandler.set(handler, evt);
        this.onHandler(true, { handler: handler, evt: evt });
    };
    /** Exposed only to enable safe interoperability between EVT versions, do not use */
    Ctx.prototype.zz__removeHandler = function (handler) {
        assert_1.assert(handler.ctx === this);
        assert_1.assert(typeGuard_1.typeGuard(handler));
        this.onHandler(false, { handler: handler, "evt": this.evtByHandler.get(handler) });
        this.handlers["delete"](handler);
    };
    return Ctx;
}());
exports.Ctx = Ctx;
importProxy_1.importProxy.Ctx = Ctx;
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
importProxy_1.importProxy.VoidCtx = VoidCtx;
//# sourceMappingURL=Ctx.js.map