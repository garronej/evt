import { Observable } from "../lib";
import { representsSameDataFactory } from "../tools/inDepthObjectComparison";
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

//New array, "Bob" has been removed and "Louis" has been added.
const updatedUsers = [
    ...obsUsers.value.filter(name => name !== "Bob"),
    "Louis"
];

//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.onPotentialChange(updatedUsers);

console.log("PASS".green);

