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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
require("minimal-polyfills/dist/lib/Object.is");
var defineAccessors_1 = require("../tools/typeSafety/defineAccessors");
var LazyEvt_1 = require("./LazyEvt");
var LazyStatefulEvt_1 = require("./LazyStatefulEvt");
var importProxy_1 = require("./importProxy");
var invokeOperator_1 = require("./util/invokeOperator");
var Operator_1 = require("./types/Operator");
var Evt_parsePropsFromArgs_1 = require("./Evt.parsePropsFromArgs");
var Evt_2 = require("./Evt");
var StatefulEvtImpl = /** @class */ (function (_super) {
    __extends(StatefulEvtImpl, _super);
    function StatefulEvtImpl(initialState) {
        var _this_1 = _super.call(this) || this;
        _this_1.lazyEvtDiff = new LazyEvt_1.LazyEvt();
        _this_1.lazyEvtChangeDiff = new LazyEvt_1.LazyEvt();
        _this_1.__state = initialState;
        _this_1.lazyEvtChange = new LazyStatefulEvt_1.LazyStatefulEvt(_this_1.__state);
        return _this_1;
    }
    StatefulEvtImpl.prototype.post = function (data) {
        return this.__post(data, false);
    };
    StatefulEvtImpl.prototype.postForceChange = function (wData) {
        return this.__post(!!wData ? wData[0] : this.state, true);
    };
    StatefulEvtImpl.prototype.__post = function (data, forceChange) {
        var prevState = this.state;
        this.__state = data;
        var diff = { prevState: prevState, "newState": this.state };
        this.lazyEvtDiff.post(diff);
        if (forceChange || !Object.is(prevState, this.state)) {
            this.lazyEvtChange.post(this.state);
            this.lazyEvtChangeDiff.post(diff);
        }
        return _super.prototype.post.call(this, data);
    };
    StatefulEvtImpl.prototype.pipe = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var evt = _super.prototype.pipe.apply(this, __spread(args));
        var opResult = invokeOperator_1.invokeOperator(this.getStatelessOp(Evt_parsePropsFromArgs_1.parsePropsFromArgs(args, "pipe").op), this.state);
        if (Operator_1.Operator.fλ.Result.NotMatched.match(opResult)) {
            throw new Error([
                "Cannot pipe StatefulEvt because the operator does not match",
                "it's current state.",
                "Use evt.toStateless([ctx]).pipe(op).toStatic(initialState)",
                "to be sure the StatefulEvt is correctly initialized"
            ].join(" "));
        }
        return evt.toStateful(opResult[0]);
    };
    /** Return a stateless copy */
    StatefulEvtImpl.prototype.toStateless = function (ctx) {
        return !!ctx ? _super.prototype.pipe.call(this, ctx) : _super.prototype.pipe.call(this);
    };
    StatefulEvtImpl.__4 = (function () {
        if (false) {
            StatefulEvtImpl.__4;
        }
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "state", {
            "get": function () { return this.__state; },
            "set": function (state) { this.post(state); }
        });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtDiff", { "get": function () { return this.lazyEvtDiff.evt; } });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtChange", { "get": function () { return this.lazyEvtChange.evt; } });
        defineAccessors_1.defineAccessors(StatefulEvtImpl.prototype, "evtChangeDiff", { "get": function () { return this.lazyEvtChangeDiff.evt; } });
    })();
    return StatefulEvtImpl;
}(Evt_2.Evt));
exports.StatefulEvt = StatefulEvtImpl;
importProxy_1.importProxy.StatefulEvt = exports.StatefulEvt;
//# sourceMappingURL=StatefulEvt.js.map