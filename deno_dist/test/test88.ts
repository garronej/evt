

import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.0.1/mod.ts";


const evtText = Evt.create("foo");

evtText.state = "bar";

assert(evtText.evtChange.state === "bar" as string);

evtText.state = "baz";

assert(evtText.evtChange.state === "baz");

console.log("PASS");
