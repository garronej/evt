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
exports.__esModule = true;
var assert_1 = require("../typeSafety/assert");
var representsSameData_1 = require("./representsSameData");
var RepresentsSameDataError = /** @class */ (function (_super) {
    __extends(RepresentsSameDataError, _super);
    function RepresentsSameDataError(message, got, expected) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, message) || this;
        _this_1.got = got;
        _this_1.expected = expected;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        return _this_1;
    }
    return RepresentsSameDataError;
}(Error));
exports.RepresentsSameDataError = RepresentsSameDataError;
function assertRepresentsSameDataFactory(_a) {
    var takeIntoAccountArraysOrdering = _a.takeIntoAccountArraysOrdering;
    var representsSameData = representsSameData_1.representsSameDataFactory({ takeIntoAccountArraysOrdering: takeIntoAccountArraysOrdering }).representsSameData;
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
//# sourceMappingURL=assertRepresentsSameData.js.map