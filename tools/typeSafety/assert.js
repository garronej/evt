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
exports.__esModule = true;
exports.assert = exports.AssertionError = void 0;
var overwriteReadonlyProp_1 = require("./overwriteReadonlyProp");
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(msg) {
        var _newTarget = this.constructor;
        var _this_1 = _super.call(this, "Wrong assertion encountered" + (!msg ? "" : ": \"" + msg + "\"")) || this;
        Object.setPrototypeOf(_this_1, _newTarget.prototype);
        if (!_this_1.stack) {
            return _this_1;
        }
        try {
            overwriteReadonlyProp_1.overwriteReadonlyProp(_this_1, "stack", _this_1.stack
                .split("\n")
                .filter(function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var _b = __read(_a, 2), i = _b[1];
                return i !== 1 && i !== 2;
            })
                .join("\n"));
        }
        catch (_a) {
        }
        return _this_1;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
function assert(condition, msg) {
    if (!condition) {
        throw new AssertionError(msg);
    }
}
exports.assert = assert;
//# sourceMappingURL=assert.js.map