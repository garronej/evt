"use strict";
exports.__esModule = true;
var representsSameData_1 = require("./representsSameData");
var assert_1 = require("../typeSafety/assert");
{
    var representsSameData = representsSameData_1.representsSameDataFactory({ "takeIntoAccountArraysOrdering": false }).representsSameData;
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["a", "b"],
        ["c", "d"]
    ])));
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["a", "b"]
    ])));
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["b", "a"],
        ["c", "d"]
    ])));
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
    assert_1.assert(!representsSameData(new Set([
        ["a", "b", "c"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
}
{
    var representsSameData = representsSameData_1.representsSameDataFactory({ "takeIntoAccountArraysOrdering": true }).representsSameData;
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["a", "b"],
        ["c", "d"]
    ])));
    assert_1.assert(representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["a", "b"]
    ])));
    assert_1.assert(!representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["b", "a"],
        ["c", "d"]
    ])));
    assert_1.assert(!representsSameData(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
    assert_1.assert(!representsSameData(new Set([
        ["a", "b", "c"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
}
{
    var representsSameData = representsSameData_1.representsSameDataFactory({ "takeIntoAccountArraysOrdering": false }).representsSameData;
    assert_1.assert(representsSameData(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(representsSameData(new Map([
        [["b", "a"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(representsSameData(new Map([
        [["c", "d"], ["3", "4"]],
        [["a", "b"], ["1", "2"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(!representsSameData(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]],
        [["e", "f"], ["5", "6"]],
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(!representsSameData(new Map([
        [["1", "2"], ["a", "b"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
}
{
    var representsSameData = representsSameData_1.representsSameDataFactory({ "takeIntoAccountArraysOrdering": true }).representsSameData;
    assert_1.assert(representsSameData(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(!representsSameData(new Map([
        [["b", "a"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(representsSameData(new Map([
        [["c", "d"], ["3", "4"]],
        [["a", "b"], ["1", "2"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(!representsSameData(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]],
        [["e", "f"], ["5", "6"]],
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    assert_1.assert(!representsSameData(new Map([
        [["1", "2"], ["a", "b"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
}
console.log("PASS");
//# sourceMappingURL=test.js.map