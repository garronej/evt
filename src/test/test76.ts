
import { ObservableInDepth, inDepth } from "../lib";
import { diff } from "../tools/reducers";
import { assert } from "../tools/typeSafety";

const users= [ "Bob", "Alice" ];

const obsUsers = new ObservableInDepth<string[]>(
    users,
    inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false }).same
);

let stdout= "";

obsUsers.evtDiff.attach(
    ({ currVal, prevVal }) => {

        const { added, removed } = prevVal.reduce(...diff(currVal))

        stdout+= `${added.join(", ")} joined the chat`;
        stdout+= `${removed.join(", ")} left the chat`;

    }
);

obsUsers.update(users); //Print nothing

users.splice(0,1); //Remove Bob from the array.

users.push("Louis");

//Prints "Louis joined the chat" "Bob left the chat"
obsUsers.update(users);

assert( "Louis joined the chatBob left the chat" === stdout);

console.log("PASS".green);
