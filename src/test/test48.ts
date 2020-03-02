
import { Evt, EvtError } from "../lib";
import { race } from "../lib/util/race";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustReject } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": false });

const evtAge = new Evt<number>();
const evtText = new Evt<string>();

mustReject({
    "promise": race([
        evtAge,
        evtText
    ]).$attachOnce(
        () => "DETACH",
        100,
        () => assert(false)
    ),
    "expectedRejectedValue": new EvtError.Detached(),
    "delay": 50
});

evtText.post("OK");

assert(evtText.getHandlers().length === 0);
assert(evtAge.getHandlers().length === 0);

console.log("PASS".green);