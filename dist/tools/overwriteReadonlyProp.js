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
Object.defineProperty(exports, "__esModule", { value: true });
exports.overwriteReadonlyProp = function (obj, propertyName, value) {
    try {
        obj[propertyName] = value;
        if (obj[propertyName] === value) {
            return value;
        }
    }
    catch (_a) {
    }
    Object.defineProperty(obj, propertyName, __assign(__assign({}, Object.getOwnPropertyDescriptor(obj, propertyName)), { value: value }));
    return value;
};
//# sourceMappingURL=overwriteReadonlyProp.js.map