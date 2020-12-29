"use strict";
exports.__esModule = true;
exports.DateLike = exports.ArrayLike = exports.MapLike = exports.SetLike = exports.z_ = void 0;
var typeGuard_1 = require("../typeSafety/typeGuard");
var getPrototypeChain_1 = require("./getPrototypeChain");
exports.z_ = {
    "SetLike_match": function match(set) {
        return (typeGuard_1.typeGuard(set) &&
            typeof set.values === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(set, /Set/));
    },
    "MapLike_match": function match(map) {
        return (typeGuard_1.typeGuard(map) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(map, /Map/));
    },
    "ArrayLike_match": function match(arr) {
        return (typeGuard_1.typeGuard(arr) &&
            typeof arr.length === "number" &&
            arr.length !== 0 ?
            ("" + (arr.length - 1) in arr) :
            getPrototypeChain_1.getPrototypeChain.isMatched(arr, /Array/));
    },
    "DateLike_match": function match(date) {
        return (typeGuard_1.typeGuard(date) &&
            typeof date.getTime === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(date, /Date/));
    }
};
var SetLike;
(function (SetLike) {
    SetLike.match = exports.z_.SetLike_match;
})(SetLike = exports.SetLike || (exports.SetLike = {}));
var MapLike;
(function (MapLike) {
    MapLike.match = exports.z_.MapLike_match;
})(MapLike = exports.MapLike || (exports.MapLike = {}));
var ArrayLike;
(function (ArrayLike) {
    ArrayLike.match = exports.z_.ArrayLike_match;
})(ArrayLike = exports.ArrayLike || (exports.ArrayLike = {}));
var DateLike;
(function (DateLike) {
    DateLike.match = exports.z_.DateLike_match;
})(DateLike = exports.DateLike || (exports.DateLike = {}));
//# sourceMappingURL=types.js.map