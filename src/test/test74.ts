import { Observable } from "../lib";
import { diff } from "../tools/reducers";
import { assert } from "../tools/typeSafety";
import { same } from "../tools/inDepth";
import { id } from "../tools/typeSafety";

const obsUsers = new Observable(new Set(["Bob", "Alice"]));

obsUsers.evtDiff.attach(
    ({ currVal, prevVal }) => {

        const { added, removed } = Array.from(prevVal).reduce(...diff(Array.from(currVal)))

        assert(same(added, ["Louis"]));
        assert(same(removed, ["Bob"]));

    }
);

//Nothing posted as representSameData(["Bob", "Alice"], ["Alice", "Bob") === true
obsUsers.update(new Set(["Alice", "Bob"]));

assert(obsUsers.evtDiff.postCount === id<number>(0));
assert(obsUsers.evtDiff.postCount === id<number>(0));

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = new Set([
    ...Array.from(obsUsers.val).filter(name => name !== "Bob"),
    "Louis"
]);


//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.update(updatedUsers);

assert(obsUsers.evtDiff.postCount === id<number>(1));
assert(obsUsers.evt.postCount === id<number>(1));

console.log("PASS".green);

