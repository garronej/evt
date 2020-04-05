"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var compose_1 = require("../compose");
var concatUint8Array_1 = require("../../../tools/concatUint8Array");
/** Output Uint8Array of fixed size*/
exports.chunksOf = function (byteLength) {
    return compose_1.compose([
        function (chunk_, prev) {
            var _a = __read(prev.rest !== undefined ?
                [concatUint8Array_1.concatUint8Array([chunk_, prev.rest]), 0, []]
                :
                    [chunk_, prev.currByteLength, prev.chunks], 3), chunk = _a[0], previousByteLength = _a[1], chunks = _a[2];
            var currByteLength = previousByteLength + chunk.byteLength;
            return [
                {
                    currByteLength: currByteLength,
                    "chunks": __spread(chunks, [chunk]),
                    "rest": currByteLength >= byteLength ?
                        chunk.slice(byteLength - currByteLength)
                        :
                            undefined
                }
            ];
        },
        {
            "currByteLength": 0,
            "chunks": [],
            "rest": undefined
        }
    ], function (_a) {
        var rest = _a.rest, chunks = _a.chunks;
        return rest !== undefined ?
            [concatUint8Array_1.concatUint8Array(chunks, byteLength)] :
            null;
    });
};
//# sourceMappingURL=chunksOf.js.map