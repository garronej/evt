"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var same_1 = require("./same");
var assert_1 = require("tsafe/assert");
var copy_1 = require("./copy");
var util = __importStar(require("util"));
{
    var same_2 = (0, same_1.sameFactory)({ "takeIntoAccountArraysOrdering": false }).same;
    (0, assert_1.assert)(same_2(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["a", "b"],
        ["c", "d"]
    ])));
    (0, assert_1.assert)(same_2(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["a", "b"]
    ])));
    (0, assert_1.assert)(same_2(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["b", "a"],
        ["c", "d"]
    ])));
    (0, assert_1.assert)(same_2(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
    (0, assert_1.assert)(!same_2(new Set([
        ["a", "b", "c"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
}
{
    var same_3 = (0, same_1.sameFactory)({ "takeIntoAccountArraysOrdering": true }).same;
    (0, assert_1.assert)(same_3(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["a", "b"],
        ["c", "d"]
    ])));
    (0, assert_1.assert)(same_3(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["a", "b"]
    ])));
    (0, assert_1.assert)(!same_3(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["b", "a"],
        ["c", "d"]
    ])));
    (0, assert_1.assert)(!same_3(new Set([
        ["a", "b"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
    (0, assert_1.assert)(!same_3(new Set([
        ["a", "b", "c"],
        ["c", "d"]
    ]), new Set([
        ["c", "d"],
        ["b", "a"]
    ])));
}
{
    var same_4 = (0, same_1.sameFactory)({ "takeIntoAccountArraysOrdering": false }).same;
    (0, assert_1.assert)(same_4(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(same_4(new Map([
        [["b", "a"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(same_4(new Map([
        [["c", "d"], ["3", "4"]],
        [["a", "b"], ["1", "2"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(!same_4(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]],
        [["e", "f"], ["5", "6"]],
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(!same_4(new Map([
        [["1", "2"], ["a", "b"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
}
{
    var same_5 = (0, same_1.sameFactory)({ "takeIntoAccountArraysOrdering": true }).same;
    (0, assert_1.assert)(same_5(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(!same_5(new Map([
        [["b", "a"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(same_5(new Map([
        [["c", "d"], ["3", "4"]],
        [["a", "b"], ["1", "2"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(!same_5(new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]],
        [["e", "f"], ["5", "6"]],
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
    (0, assert_1.assert)(!same_5(new Map([
        [["1", "2"], ["a", "b"]],
        [["c", "d"], ["3", "4"]]
    ]), new Map([
        [["a", "b"], ["1", "2"]],
        [["c", "d"], ["3", "4"]]
    ])));
}
{
    var obj_1 = {};
    Object.assign(obj_1, { "p": obj_1 });
    var clone_1 = {};
    Object.assign(clone_1, { "p": clone_1 });
    (0, assert_1.assert)((0, same_1.same)(obj_1, clone_1));
}
{
    var map1 = new Map();
    var map2 = new Map();
    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });
    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });
    map1.set(33, ["a", 33, new Date(12), new Set(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set(["a", [map2], 55])]);
    (0, assert_1.assert)((0, same_1.same)(map1, map2));
}
{
    var map1 = new Map();
    var map2 = new Map();
    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });
    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });
    map1.set(33, ["a", 33, new Date(12), new Set(["a", [map1], -1])]);
    map2.set(33, ["a", 33, new Date(12), new Set(["a", [map2], 55])]);
    (0, assert_1.assert)(!(0, same_1.same)(map1, map2));
}
{
    var map1 = new Map();
    var map2 = new Map();
    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });
    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });
    map1.set(33, ["a", 33, new Date(12), new Set(["a", [map1], -1])]);
    map2.set(33, ["a", 33, new Date(12), new Set(["a", [map2], 55])]);
    (0, assert_1.assert)(!(0, same_1.same)(map1, map2));
}
{
    var map1 = new Map();
    var map2 = new Map();
    map1.set({ "p": "foo" }, { "q": "x" });
    map2.set({ "p": "foo" }, { "q": "bar" });
    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });
    map1.set(33, ["a", 33, new Date(12), new Set(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set(["a", [map2], 55])]);
    (0, assert_1.assert)(!(0, same_1.same)(map1, map2));
}
{
    var map1 = new Map();
    var map2 = new Map();
    map1.set({ "p": "foo" }, { "q": "bar" });
    map2.set({ "p": "foo" }, { "q": "bar" });
    map1.set({ "p": "baz" }, { "q": 44 });
    map2.set({ "p": "baz" }, { "q": 44 });
    map1.set(33, ["a", 33, new Date(13), new Set(["a", [map1], 55])]);
    map2.set(33, ["a", 33, new Date(12), new Set(["a", [map2], 55])]);
    (0, assert_1.assert)(!(0, same_1.same)(map1, map2));
}
var obj = { "p1": "FOO", "p2": new Set(["a", "b", "c"]), "p3": ["a", "b"], "p4": undefined, "p5": null };
Object.assign(obj, { obj: obj });
var s1 = util.inspect(obj);
var clone = (0, copy_1.copy)(obj, { "freeze": true });
(0, assert_1.assert)((0, same_1.same)(obj, clone));
obj["p1"] = "changed";
obj["p2"].add("changed");
obj["p3"].push("changed");
obj["p4"] = "changed";
obj["p5"] = "changed";
(0, assert_1.assert)(util.inspect(clone) === s1);
try {
    clone.p1 = "BAR";
    (0, assert_1.assert)(false, "should have throw");
}
catch (_a) {
}
console.log("PASS in depth");
//# sourceMappingURL=test.js.map