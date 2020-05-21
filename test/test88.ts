

import { Evt } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/index.ts";


const evtText = Evt.create("foo");

evtText.state = "bar";

assert(evtText.evtChange.state === "bar" as string);

evtText.state = "baz";

assert(evtText.evtChange.state === "baz");

console.log("PASS");
