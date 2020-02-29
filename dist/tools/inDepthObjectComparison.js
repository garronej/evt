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
var setPrototypeOfPolyfill_1 = require("./setPrototypeOfPolyfill");
var assert_1 = require("./typeSafety/assert");
var RepresentsSameDataError = /** @class */ (function (_super) {
    __extends(RepresentsSameDataError, _super);
    function RepresentsSameDataError(message, got, expected) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, message) || this;
        _this_1.got = got;
        _this_1.expected = expected;
        setPrototypeOfPolyfill_1.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return RepresentsSameDataError;
}(Error));
exports.RepresentsSameDataError = RepresentsSameDataError;
function assertRepresentsSameDataFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    var representsSameData = representsSameDataFactory({ takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }).representsSameData;
    /** Compare if two object represent the same data, [ "ok", "foo" ] <=> [ "foo", "ok" ] */
    function assertRepresentsSameData(_a) {
        var got = _a.got, expected = _a.expected, errorMessage = _a.errorMessage;
        try {
            assert_1.assert(representsSameData(got, expected));
        }
        catch (e) {
            throw new RepresentsSameDataError("" + (errorMessage !== null && errorMessage !== void 0 ? errorMessage : "Wrongly assert same"), got, expected);
        }
    }
    return { assertRepresentsSameData: assertRepresentsSameData };
}
exports.assertRepresentsSameDataFactory = assertRepresentsSameDataFactory;
/** Return a function that perform a in depth comparison of two things of arbitrary type T. */
function representsSameDataFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    return { "representsSameData": function (o1, o2) { return representsSameData(o1, o2, takeIntoAccountArraysOrdering); } };
}
exports.representsSameDataFactory = representsSameDataFactory;
function representsSameData(o1, o2, takeIntoAccountArraysOrdering) {
    var e_1, _a, e_2, _b;
    if (o1 === o2) {
        return true;
    }
    if (o1 instanceof Date) {
        if (!(o2 instanceof Date)) {
            return false;
        }
        return o1.getTime() === o2.getTime();
    }
    if (o1 instanceof Object) {
        if (!(o2 instanceof Object)) {
            return false;
        }
        if (!takeIntoAccountArraysOrdering && o1 instanceof Array) {
            if (!(o2 instanceof Array)) {
                return false;
            }
            if (o1.length !== o2.length) {
                return false;
            }
            var o2Set = new Set(o2);
            try {
                for (var o1_1 = __values(o1), o1_1_1 = o1_1.next(); !o1_1_1.done; o1_1_1 = o1_1.next()) {
                    var val1 = o1_1_1.value;
                    var isFound = false;
                    try {
                        for (var o2Set_1 = (e_2 = void 0, __values(o2Set)), o2Set_1_1 = o2Set_1.next(); !o2Set_1_1.done; o2Set_1_1 = o2Set_1.next()) {
                            var val2 = o2Set_1_1.value;
                            var result = representsSameData(val1, val2, takeIntoAccountArraysOrdering);
                            if (!result) {
                                continue;
                            }
                            isFound = true;
                            o2Set["delete"](val2);
                            break;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (o2Set_1_1 && !o2Set_1_1.done && (_b = o2Set_1["return"])) _b.call(o2Set_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (!isFound) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (o1_1_1 && !o1_1_1.done && (_a = o1_1["return"])) _a.call(o1_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            if (o1 instanceof Array) {
                if (!(o2 instanceof Array)) {
                    return false;
                }
                if (o1.length !== o2.length) {
                    return false;
                }
            }
            else {
                var result = representsSameData(Object.keys(o1).filter(function (key) { return o1[key] !== undefined; }), Object.keys(o2).filter(function (key) { return o2[key] !== undefined; }), takeIntoAccountArraysOrdering);
                if (!result) {
                    return false;
                }
            }
            for (var key in o1) {
                var result = representsSameData(o1[key], o2[key], takeIntoAccountArraysOrdering);
                if (!result) {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=inDepthObjectComparison.js.map