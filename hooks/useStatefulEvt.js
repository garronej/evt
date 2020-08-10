"use strict";
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
exports.useStatefulEvt = void 0;
var react_1 = require("react");
var lib_1 = require("../lib");
var useEvt_1 = require("./useEvt");
;
;
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
function useStatefulEvt(evts) {
    var _a = __read(react_1.useReducer(function (x) { return x + 1; }, 0), 2), forceUpdate = _a[1];
    useEvt_1.useEvt(function (ctx) {
        evts.forEach(function (evt) {
            var attach = function () { return evt.evtChange.attach(ctx, forceUpdate); };
            attach();
            lib_1.Evt.merge(__spread([
                evt.evtChange.evtAttach.pipe(ctx, function (handler) { return handler.ctx !== ctx; })
            ], [
                evt,
                evt.evtChangeDiff,
                evt.evtDiff
            ].map(function (evt) { return evt.evtAttach.pipe(ctx); }))).attach(function () {
                evt.evtChange.detach(ctx);
                attach();
            });
        });
    }, evts);
}
exports.useStatefulEvt = useStatefulEvt;
//# sourceMappingURL=useStatefulEvt.js.map