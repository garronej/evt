"use strict";
exports.__esModule = true;
function getPrototypeChain(obj, i) {
    if (i === void 0) { i = 0; }
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return [];
    }
    //return [proto, ...getPrototypeChain(proto, i+1)];
    return [proto];
}
exports.getPrototypeChain = getPrototypeChain;
(function (getPrototypeChain) {
    function isMatched(obj, regExp) {
        return getPrototypeChain(obj)
            .map(function (_a) {
            var constructor = _a.constructor;
            return constructor.name;
        }).find(function (name) { return regExp.test(name); }) !== undefined;
    }
    getPrototypeChain.isMatched = isMatched;
})(getPrototypeChain = exports.getPrototypeChain || (exports.getPrototypeChain = {}));
//# sourceMappingURL=getPrototypeChain.js.map