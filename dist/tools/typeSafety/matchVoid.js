"use strict";
exports.__esModule = true;
var typeGuard_1 = require("./typeGuard");
/**
 *
 * To test if an object is void,
 * unlike undefined or null, testing o !== void
 * will not restrict the type.
 *
 * Example:
 *
 * declare o: { p: string; } | void;
 *
 * matchVoid(o)?null:o.p <== Type inference ok
 *
 * Match void
 * @param o type of o should be a union of type containing void
 * @returns true if o is void'ish ( null or undefined )
 */
function matchVoid(o) {
    return typeGuard_1.typeGuard(o, o === undefined || o === null);
}
exports.matchVoid = matchVoid;
//# sourceMappingURL=matchVoid.js.map