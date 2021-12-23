"use strict";
exports.__esModule = true;
exports.safeClearTimeout = exports.safeSetTimeout = void 0;
exports.safeSetTimeout = function (callback, ms) { return setTimeout(callback, ms); };
exports.safeClearTimeout = function (timer) { return clearTimeout(timer); };
//# sourceMappingURL=safeSetTimeout.js.map