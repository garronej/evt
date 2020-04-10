"use strict";
exports.__esModule = true;
/**
 *
 * Unlike undefined or null, testing o !== void
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
 * @returns true if o is undefined
 */
function matchVoid(o) {
    return o === undefined;
}
exports.matchVoid = matchVoid;
//# sourceMappingURL=matchVoid.js.map