"use strict";
exports.__esModule = true;
var lib_1 = require("../lib");
var chunksOf_1 = require("../lib/util/genericOperators/chunksOf");
var inDepth_1 = require("../tools/inDepth");
var typeSafety_1 = require("../tools/typeSafety");
{
    var evt = new lib_1.Evt();
    var acc_1 = [];
    evt.$attach(chunksOf_1.chunksOf(6), function (data) { return acc_1.push(data); });
    evt.post(new Uint8Array([1, 2, 3]));
    evt.post(new Uint8Array([4, 5, 6, 7]));
    evt.post(new Uint8Array([0]));
    evt.post(new Uint8Array([1, 2]));
    evt.post(new Uint8Array([3, 4]));
    evt.post(new Uint8Array([1, 2, 3, 4, 5, 6]));
    typeSafety_1.assert(inDepth_1.same(acc_1, [
        new Uint8Array([1, 2, 3, 4, 5, 6]),
        new Uint8Array([0, 7, 1, 2, 3, 4]),
        new Uint8Array([1, 2, 3, 4, 5, 6])
    ]));
    console.log("PASS");
}
//# sourceMappingURL=test64.js.map