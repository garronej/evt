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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
exports.__esModule = true;
var typeSafety_1 = require("../typeSafety");
var index_1 = require("./index");
var every_1 = require("./every");
var partition_1 = require("./partition");
var same_1 = require("../inDepth/same");
typeSafety_1.assert((_a = ["foo", "foo", "foo"]).reduce.apply(_a, __spread(index_1.every(function (e) { return e === "foo"; }))) === true);
typeSafety_1.assert((_b = ["foo", "foo", "bar"]).reduce.apply(_b, __spread(index_1.every(function (e) { return e === "foo"; }))) === false);
typeSafety_1.assert(every_1.arrEvery([], function (e) { return e === "foo"; }) === true);
typeSafety_1.assert([].reduce.apply([], __spread(index_1.every(function (e) { return e === "foo"; }))) === true);
typeSafety_1.assert((_c = ["foo", "foo", "foo"]).reduce.apply(_c, __spread(index_1.allEqualsTo("foo"))) === true);
typeSafety_1.assert((_d = ["foo"]).reduce.apply(_d, __spread(index_1.allEqualsTo("foo"))) === true);
typeSafety_1.assert([].reduce.apply([], __spread(index_1.allEqualsTo("foo"))) === true);
typeSafety_1.assert((_e = ["foo", "bar", "foo"]).reduce.apply(_e, __spread(index_1.allEqualsTo("foo"))) === false);
typeSafety_1.assert((_f = ["bar", "bar", "foo"]).reduce.apply(_f, __spread(index_1.allEqualsTo("foo"))) === false);
typeSafety_1.assert((_g = ["bar"]).reduce.apply(_g, __spread(index_1.allEqualsTo("foo"))) === false);
typeSafety_1.assert((_h = ["foo", "foo_", "foo__"]).reduce.apply(_h, __spread(index_1.allEqualsTo("foo", function (e1, to) { return e1.startsWith(to); }))) === true);
typeSafety_1.assert((_j = ["foo", "foo_", "foo__", "_foo"]).reduce.apply(_j, __spread(index_1.allEqualsTo("foo", function (e1, to) { return e1.startsWith(to); }))) === false);
typeSafety_1.assert((_k = ["foo", "foo"]).reduce.apply(_k, __spread(index_1.allEquals())) === true);
typeSafety_1.assert((_l = ["foo"]).reduce.apply(_l, __spread(index_1.allEquals())) === true);
typeSafety_1.assert([].reduce.apply([], __spread(index_1.allEquals())) === true);
typeSafety_1.assert((_m = ["foo", "bar"]).reduce.apply(_m, __spread(index_1.allEquals())) === false);
typeSafety_1.assert((_o = ["foo", "bar", "baz"]).reduce.apply(_o, __spread(index_1.allEquals())) === false);
typeSafety_1.assert((_p = [
    ["a", "b", "c"],
    ["a", "b", "c"],
    ["a", "b", "c"]
]).reduce.apply(_p, __spread(index_1.allEquals(function (e1, e2) { return JSON.stringify(e1) === JSON.stringify(e2); }))) === true);
var areSameStringArr = function (arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};
typeSafety_1.assert((_q = [
    ["a", "b", "c"],
    ["a", "b", "c", "d"],
]).reduce.apply(_q, __spread(index_1.allEquals(areSameStringArr))) === false);
typeSafety_1.assert((_r = [["foo", "bar"], ["foo", "bar"]]).reduce.apply(_r, __spread(index_1.allEquals(function (e1, e2) {
    var _a;
    return (_a = [e1, e2].map(function (e) { return JSON.stringify(e); })).reduce.apply(_a, __spread(index_1.allEquals()));
}))) === true);
typeSafety_1.assert(areSameStringArr((_s = ["foo", "foo", "bar", "baz"]).reduce.apply(_s, __spread(index_1.removeDuplicates())), ["foo", "bar", "baz"]));
typeSafety_1.assert(areSameStringArr((_t = ["foo", "foo"]).reduce.apply(_t, __spread(index_1.removeDuplicates())), ["foo"]));
typeSafety_1.assert(areSameStringArr((_u = ["foo", "foo", "bar", "bar"]).reduce.apply(_u, __spread(index_1.removeDuplicates())), ["foo", "bar"]));
typeSafety_1.assert(areSameStringArr((_v = ["foo"]).reduce.apply(_v, __spread(index_1.removeDuplicates())), ["foo"]));
typeSafety_1.assert(areSameStringArr([].reduce.apply([], __spread(index_1.removeDuplicates())), []));
typeSafety_1.assert(JSON.stringify((_w = [["a", "b", "c"], ["a", "b", "c", "d"], ["a", "b", "c"]]).reduce.apply(_w, __spread(index_1.removeDuplicates(areSameStringArr))))
    ===
        JSON.stringify([["a", "b", "c"], ["a", "b", "c", "d"]]));
{
    var _7 = __read((_x = ["FOO", "BAR", "FOO"]).reduce.apply(_x, __spread(index_1.partition(function (e) { return e === "BAR"; }))), 2), arr1 = _7[0], arr2 = _7[1];
    typeSafety_1.assert(areSameStringArr(arr1, ["BAR"]));
    typeSafety_1.assert(areSameStringArr(arr2, ["FOO", "FOO"]));
}
{
    var _8 = __read(partition_1.arrPartition(["FOO", "BAR", "FOO"], function (e) { return e === "BAR"; }), 2), arr1 = _8[0], arr2 = _8[1];
    typeSafety_1.assert(areSameStringArr(arr1, ["BAR"]));
    typeSafety_1.assert(areSameStringArr(arr2, ["FOO", "FOO"]));
}
typeSafety_1.assert((_y = ["foo", "bar", "baz"]).reduce.apply(_y, __spread(index_1.allUniq())) === true);
typeSafety_1.assert([].reduce.apply([], __spread(index_1.allUniq())) === true);
typeSafety_1.assert((_z = ["foo", "bar", "foo"]).reduce.apply(_z, __spread(index_1.allUniq())) === false);
{
    var check = function (arr) { return arr
        .reduce.apply(arr, __spread(index_1.and([
        function (arr) { return arr.length !== 0; },
        function (arr) { return arr.reduce.apply(arr, __spread(index_1.allUniq())); },
        function (arr) { return !arr.reduce.apply(arr, __spread(index_1.includes("me"))); }
    ]))); };
    typeSafety_1.assert(check(["alice", "bob", "louis"]) === true);
    typeSafety_1.assert(check([]) === false);
    typeSafety_1.assert(check(["alice", "bob", "alice", "louis"]) === false);
    typeSafety_1.assert(check(["alice", "bob", "louis", "me"]) === false);
}
typeSafety_1.assert((_0 = ["foo", "bar", "baz", "hello"]).reduce.apply(_0, __spread(index_1.count(function (e) { return e.startsWith("b"); }))) === 2);
typeSafety_1.assert([]
    .reduce.apply([], __spread(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
]))) === true);
typeSafety_1.assert((_1 = ["a", "b", "c", "d"]).reduce.apply(_1, __spread(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
]))) === true);
typeSafety_1.assert((_2 = ["a", "b"]).reduce.apply(_2, __spread(index_1.or([
    function (arr) { return arr.length === 0; },
    function (arr) { return arr.length >= 3; }
]))) === false);
typeSafety_1.assert((_3 = ["a", "b"]).reduce.apply(_3, __spread(index_1.sameAs(["a", "b"]))) === true);
typeSafety_1.assert((_4 = ["a", "b"]).reduce.apply(_4, __spread(index_1.sameAs(["a", "bc"]))) === false);
typeSafety_1.assert((_5 = ["a", "b"]).reduce.apply(_5, __spread(index_1.sameAs(["a", "b", "c"]))) === false);
typeSafety_1.assert(same_1.same((_6 = ["bob", "alice"]).reduce.apply(_6, __spread(index_1.diff(["bob", "louis"]))), {
    "added": ["louis"],
    "removed": ["alice"]
}, { "takeIntoAccountArraysOrdering": false }));
console.log("PASS reducers");
//# sourceMappingURL=test.js.map