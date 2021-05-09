

import { Evt } from "../lib";
import { assert } from "tsafe";


const evtText = Evt.create("foo");

evtText.state = "bar";

assert(evtText.evtChange.state === "bar" as string);

evtText.state = "baz";

assert(evtText.evtChange.state === "baz");

console.log("PASS");
