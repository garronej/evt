import { Observable } from "../lib";
import { representsSameDataFactory } from "../tools/inDepthComparison";
import { diff } from "../tools/reducers";
import { assert } from "../tools/typeSafety";

const { representsSameData } = representsSameDataFactory(
    { "takeIntoAccountArraysOrdering": false }
);

const obsUsers = new Observable<string[]>(
    ["Bob", "Alice"],
    representsSameData
);

obsUsers.evtChangeDiff.attach(
    ({ newValue, previousValue }) => {

        const { added, removed } = previousValue.reduce(...diff(newValue))

        assert(representsSameData(added, ["Louis"]));
        assert(representsSameData(removed, ["Bob"]));

    }
);

//Nothing posted as representSameData(["Bob", "Alice"], ["Alice", "Bob") === true
obsUsers.onPotentialChange(["Alice", "Bob" ]);

assert(obsUsers.evtChangeDiff.postCount === 0+0 );
assert(obsUsers.evtChange.postCount === 0+0 );

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = [
    ...obsUsers.value.filter(name => name !== "Bob"),
    "Louis"
];


//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.onPotentialChange(updatedUsers);

assert(obsUsers.evtChangeDiff.postCount === 0+1 );
assert(obsUsers.evtChange.postCount === 0+1 );

console.log("PASS".green);

