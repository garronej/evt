"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRerenderOnStateChange = void 0;
var useEvt_1 = require("./useEvt");
;
;
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
function useRerenderOnStateChange() {
    var evts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        evts[_i] = arguments[_i];
    }
    useEvt_1.useEvt(function (ctx, registerSideEffect) {
        return evts.forEach(function (evt) {
            return evt.evtChange
                .toStateless(ctx)
                .attach(function () { return registerSideEffect(function () { }); });
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    evts);
}
exports.useRerenderOnStateChange = useRerenderOnStateChange;
//# sourceMappingURL=useRerenderOnStateChange.js.map