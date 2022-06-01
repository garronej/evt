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
exports.__esModule = true;
exports.useRerenderOnStateChange = void 0;
var useEvt_1 = require("./useEvt");
var React = require("react");
var useState = React.useState;
;
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
function useRerenderOnStateChange(evt) {
    //NOTE: We use function in case the state is a function
    var _a = __read(useState(function () { return evt.state; }), 2), setState = _a[1];
    useEvt_1.useEvt(function (ctx) {
        return evt.attach(ctx, function (state) { return setState(function () { return state; }); });
    }, [evt]);
}
exports.useRerenderOnStateChange = useRerenderOnStateChange;
//# sourceMappingURL=useRerenderOnStateChange.js.map