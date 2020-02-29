"use strict";
exports.__esModule = true;
/** Invoke a test function as if it was a typeGuard for a given type */
function typeGuard(o, matcher) {
    return matcher(o);
}
exports.typeGuard = typeGuard;
(function (typeGuard) {
    /**
     * type guard that always returns true for a given type.
     *
     * Use case:
     * declare const x: "FOO" | "BAR";
     * assert(typeGuard.dry<"BAR">(x));
     * x; <== x is of type "BAR"
     *
     * OR
     *
     * assert(!typeGuard.dry<"BAR">(x,false));
     * x; <== x is of type "FOO"
     */
    function dry(o, isMatched) {
        if (isMatched === void 0) { isMatched = true; }
        return typeGuard(o, function () { return isMatched; });
    }
    typeGuard.dry = dry;
})(typeGuard = exports.typeGuard || (exports.typeGuard = {}));
//# sourceMappingURL=typeGuard.js.map