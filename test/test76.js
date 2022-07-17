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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var inDepth = __importStar(require("../tools/inDepth"));
var reducers_1 = require("../tools/reducers");
var assert_1 = require("tsafe/assert");
{
    var users = ["Bob", "Alice"];
    var same_1 = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same;
    var sevUser_1 = lib_1.Evt.create(__spreadArray([], __read(users), false));
    var update = function (users) {
        if (same_1(sevUser_1.state, users)) {
            return;
        }
        sevUser_1.post(inDepth.copy(users));
    };
    var stdout_1 = "";
    sevUser_1.evtDiff.attach(function (_a) {
        var newState = _a.newState, prevState = _a.prevState;
        var _b = prevState.reduce.apply(prevState, __spreadArray([], __read((0, reducers_1.diff)(newState)), false)), added = _b.added, removed = _b.removed;
        stdout_1 += "".concat(added.join(", "), " joined the chat");
        stdout_1 += "".concat(removed.join(", "), " left the chat");
    });
    update(users); //Print nothing
    users.splice(0, 1); //Remove Bob from the array.
    users.push("Louis");
    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);
    (0, assert_1.assert)("Louis joined the chatBob left the chat" === stdout_1);
}
{
    var users = ["Bob", "Alice"];
    var same_2 = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same;
    var sevUser_2 = lib_1.Evt.create(__spreadArray([], __read(users), false));
    var update = function (users) {
        if (same_2(sevUser_2.state, users)) {
            return;
        }
        sevUser_2.state = inDepth.copy(users);
    };
    var stdout_2 = "";
    sevUser_2.evtDiff.attach(function (_a) {
        var newState = _a.newState, prevState = _a.prevState;
        var _b = prevState.reduce.apply(prevState, __spreadArray([], __read((0, reducers_1.diff)(newState)), false)), added = _b.added, removed = _b.removed;
        stdout_2 += "".concat(added.join(", "), " joined the chat");
        stdout_2 += "".concat(removed.join(", "), " left the chat");
    });
    update(users); //Print nothing
    users.splice(0, 1); //Remove Bob from the array.
    users.push("Louis");
    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);
    (0, assert_1.assert)("Louis joined the chatBob left the chat" === stdout_2);
}
console.log("PASS");
//# sourceMappingURL=test76.js.map