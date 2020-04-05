"use strict";
exports.__esModule = true;
exports.concatUint8Array = function (chunks, byteLength) {
    byteLength = byteLength !== null && byteLength !== void 0 ? byteLength : chunks.reduce(function (prev, _a) {
        var byteLength = _a.byteLength;
        return prev + byteLength;
    }, 0);
    return chunks.reduce(function (_a, chunk) {
        var out = _a.out, n = _a.n;
        out.set(chunk.slice(0, Math.min(chunk.byteLength, byteLength - n)), n);
        return {
            out: out,
            "n": n + chunk.length
        };
    }, { "out": new Uint8Array(byteLength), "n": 0 }).out;
};
//# sourceMappingURL=concatUint8Array.js.map