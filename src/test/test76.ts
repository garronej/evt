
import { Tracked } from "../lib";
import * as inDepth from "../tools/inDepth";
import { diff } from "../tools/reducers";
import { assert } from "../tools/typeSafety";

const users= [ "Bob", "Alice" ];

const { same } = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false });

const trkUser = new Tracked<string[]>([...users]);

const update= (users: string[]) => {

    if( same( trkUser.val, users) ){
        return;
    }

    trkUser.val = inDepth.copy(users);

};



let stdout= "";

trkUser.evtDiff.attach(
    ({ newVal, prevVal }) => {

        const { added, removed } = prevVal.reduce(...diff(newVal))

        stdout+= `${added.join(", ")} joined the chat`;
        stdout+= `${removed.join(", ")} left the chat`;

    }
);


update(users); //Print nothing

users.splice(0,1); //Remove Bob from the array.

users.push("Louis");

//Prints "Louis joined the chat" "Bob left the chat"
update(users);

assert( "Louis joined the chatBob left the chat" === stdout);

console.log("PASS".green);
