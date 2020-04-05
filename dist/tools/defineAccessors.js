"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.defineAccessors = function (obj, propertyName, propertyDescriptor) {
    var _a;
    var get = propertyDescriptor.get, set = propertyDescriptor.set;
    Object.defineProperty(obj, propertyName, __assign(__assign(__assign({}, ((_a = Object.getOwnPropertyDescriptor(obj, propertyName)) !== null && _a !== void 0 ? _a : {
        "enumerable": true,
        "configurable": true
    })), (get !== undefined ? { "get": function () { return get.call(this); } } : {})), (set !== undefined ? { "set": function (value) { set.call(this, value); } } : {})));
};
//# sourceMappingURL=defineAccessors.js.map