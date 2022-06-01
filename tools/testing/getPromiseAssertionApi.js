"use strict";
exports.__esModule = true;
exports.getPromiseAssertionApi = void 0;
var typeSafety_1 = require("../typeSafety");
var same_1 = require("../inDepth/same");
function getPromiseAssertionApi(params) {
    var is = !!params ? same_1.sameFactory(params).same : (function (o1, o2) { return o1 === o2; });
    function mustResolve(params) {
        var timer = setTimeout(function () { return typeSafety_1.assert(false, "did not resolve in time"); }, params.delay !== undefined ? params.delay : 0);
        return params.promise.then(function (data) {
            clearTimeout(timer);
            if (!("expectedData" in params)) {
                return data;
            }
            typeSafety_1.assert(is(data, params.expectedData), "Not equals expected value");
            return data;
        });
    }
    /** Must reject within delay ms*/
    function mustReject(params) {
        var timer = setTimeout(function () { return typeSafety_1.assert(false, "did not reject in time"); }, params.delay !== undefined ? params.delay : 0);
        return params.promise.then(function () { return typeSafety_1.assert(false, "resolved"); }, function (error) {
            clearTimeout(timer);
            if ("expectedRejectedValue" in params) {
                typeSafety_1.assert(is(error, params.expectedRejectedValue));
            }
        });
    }
    function mustStayPending(p) {
        p
            .then(function () { return typeSafety_1.assert(false, "Has fulfilled"); }, function () { return typeSafety_1.assert(false, "has rejected"); });
    }
    return { mustResolve: mustResolve, mustReject: mustReject, mustStayPending: mustStayPending };
}
exports.getPromiseAssertionApi = getPromiseAssertionApi;
//# sourceMappingURL=getPromiseAssertionApi.js.map