import { Observable, inDepth } from "../lib";
import { diff } from "../tools/reducers";
import { assert } from "../tools/typeSafety";
import { id } from "../tools/typeSafety";

const obsUsers = new Observable<string[]>(
    ["Bob", "Alice"], 
    inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same
);

obsUsers.evtDiff.attach(
    ({ currVal, prevVal }) => {

        const { added, removed } = prevVal.reduce(...diff(currVal))

        assert(inDepth.same(added, ["Louis"]));
        assert(inDepth.same(removed, ["Bob"]));

    }
);

//Nothing posted as representSameData(["Bob", "Alice"], ["Alice", "Bob") === true
obsUsers.update(["Alice", "Bob"]);

assert(obsUsers.evtDiff.postCount === id<number>(0) );
assert(obsUsers.evtDiff.postCount === id<number>(0) );

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = [
    ...obsUsers.val.filter(name => name !== "Bob"),
    "Louis"
];


//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.update(updatedUsers);

assert(obsUsers.evtDiff.postCount === id<number>(1) );
assert(obsUsers.evt.postCount === id<number>(1));

console.log("PASS".green);

