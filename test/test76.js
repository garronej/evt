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
var lib_1 = require("../lib");
var inDepth = require("../tools/inDepth");
var reducers_1 = require("../tools/reducers");
var typeSafety_1 = require("../tools/typeSafety");
{
    var users = ["Bob", "Alice"];
    var same_1 = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same;
    var sevUser_1 = lib_1.Evt.create(__spread(users));
    var update = function (users) {
        if (same_1(sevUser_1.state, users)) {
            return;
        }
        sevUser_1.post(inDepth.copy(users));
    };
    var stdout_1 = "";
    sevUser_1.evtDiff.attach(function (_a) {
        var newState = _a.newState, prevState = _a.prevState;
        var _b = prevState.reduce.apply(prevState, __spread(reducers_1.diff(newState))), added = _b.added, removed = _b.removed;
        stdout_1 += added.join(", ") + " joined the chat";
        stdout_1 += removed.join(", ") + " left the chat";
    });
    update(users); //Print nothing
    users.splice(0, 1); //Remove Bob from the array.
    users.push("Louis");
    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);
    typeSafety_1.assert("Louis joined the chatBob left the chat" === stdout_1);
}
{
    var users = ["Bob", "Alice"];
    var same_2 = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same;
    var sevUser_2 = lib_1.Evt.create(__spread(users));
    var update = function (users) {
        if (same_2(sevUser_2.state, users)) {
            return;
        }
        sevUser_2.state = inDepth.copy(users);
    };
    var stdout_2 = "";
    sevUser_2.evtDiff.attach(function (_a) {
        var newState = _a.newState, prevState = _a.prevState;
        var _b = prevState.reduce.apply(prevState, __spread(reducers_1.diff(newState))), added = _b.added, removed = _b.removed;
        stdout_2 += added.join(", ") + " joined the chat";
        stdout_2 += removed.join(", ") + " left the chat";
    });
    update(users); //Print nothing
    users.splice(0, 1); //Remove Bob from the array.
    users.push("Louis");
    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);
    typeSafety_1.assert("Louis joined the chatBob left the chat" === stdout_2);
}
console.log("PASS");
//# sourceMappingURL=test76.js.map