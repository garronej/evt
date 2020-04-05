"use strict";
exports.__esModule = true;
var typeGuard_1 = require("../typeSafety/typeGuard");
var getPrototypeChain_1 = require("./getPrototypeChain");
var SetLike;
(function (SetLike) {
    function match(set) {
        return (typeGuard_1.typeGuard(set) &&
            typeof set.values === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(set, /Set/));
    }
    SetLike.match = match;
})(SetLike = exports.SetLike || (exports.SetLike = {}));
var MapLike;
(function (MapLike) {
    function match(map) {
        return (typeGuard_1.typeGuard(map) &&
            typeof map.keys === "function" &&
            typeof map.get === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(map, /Map/));
    }
    MapLike.match = match;
})(MapLike = exports.MapLike || (exports.MapLike = {}));
var ArrayLike;
(function (ArrayLike) {
    function match(arr) {
        return (typeGuard_1.typeGuard(arr) &&
            typeof arr.length === "number" &&
            arr.length !== 0 ?
            ("" + (arr.length - 1) in arr) :
            getPrototypeChain_1.getPrototypeChain.isMatched(arr, /Array/));
    }
    ArrayLike.match = match;
})(ArrayLike = exports.ArrayLike || (exports.ArrayLike = {}));
var DateLike;
(function (DateLike) {
    function match(date) {
        return (typeGuard_1.typeGuard(date) &&
            typeof date.getTime === "function" &&
            getPrototypeChain_1.getPrototypeChain.isMatched(date, /Date/));
    }
    DateLike.match = match;
})(DateLike = exports.DateLike || (exports.DateLike = {}));
//# sourceMappingURL=types.js.map