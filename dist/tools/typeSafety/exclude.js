"use strict";
exports.__esModule = true;
/** Return a function to use as Array.prototype.filter argument
 * to exclude one or many primitive value element from the array.
 * Ex: ([ "a", "b" ] as const).filter(exclude("a") return "b"[]
 */
function exclude(target) {
    var test = target instanceof Object ?
        (function (element) { return target.indexOf(element) < 0; }) :
        (function (element) { return element !== target; });
    return function (str) {
        return test(str);
    };
}
exports.exclude = exclude;
//# sourceMappingURL=exclude.js.map