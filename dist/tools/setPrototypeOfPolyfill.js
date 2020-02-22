"use strict";
exports.__esModule = true;
function setProtoOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
function mixinProperties(obj, proto) {
    for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
            obj[prop] = proto[prop];
        }
    }
    return obj;
}
exports.setPrototypeOf = Object.setPrototypeOf.bind(Object) ||
    ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
//# sourceMappingURL=setPrototypeOfPolyfill.js.map