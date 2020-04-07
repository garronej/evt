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
/**
 * Assign a value to a property even if the object is freezed or if the property is not writable
 * Throw if the assignation fail ( for example if the property is non configurable write: false )
 * */
exports.overwriteReadonlyProp = function (obj, propertyName, value) {
    var _a;
    try {
        obj[propertyName] = value;
    }
    catch (_b) {
    }
    if (obj[propertyName] === value) {
        return value;
    }
    var errorDefineProperty = undefined;
    var propertyDescriptor = (_a = Object.getOwnPropertyDescriptor(obj, propertyName)) !== null && _a !== void 0 ? _a : {
        "enumerable": true,
        "configurable": true
    };
    if (!!propertyDescriptor.get) {
        throw new Error("Probably a wrong ides to overwrite " + propertyName + " getter");
    }
    try {
        Object.defineProperty(obj, propertyName, __assign(__assign({}, propertyDescriptor), { value: value }));
    }
    catch (error) {
        errorDefineProperty = error;
    }
    if (obj[propertyName] !== value) {
        throw errorDefineProperty !== null && errorDefineProperty !== void 0 ? errorDefineProperty : new Error("Can't assign");
    }
    return value;
};
//# sourceMappingURL=overwriteReadonlyProp.js.map