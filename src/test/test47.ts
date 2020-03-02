
import { Evt } from "../lib";
import { race }  from "../lib/util/race";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustStayPending } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": false });

const evtAge = new Evt<number>();
const evtText = new Evt<string>();

mustStayPending(
    race([
        evtAge,
        evtText
    ]).$attachOnce(
        () => "DETACH",
        () => assert(false)
    )
);

evtText.post("OK");

assert(evtText.getHandlers().length === 0);
assert(evtAge.getHandlers().length === 0);

console.log("PASS".green);