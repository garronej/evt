
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.1.1/assert.ts";;

const evtClick = Evt.create();

const evtClickCount = evtClick
    .pipe([(...[, count]) => [count + 1], 0])
    .toStateful(0)
    ;

evtClick.post();
evtClick.post();
evtClick.post();

assert(evtClickCount.state === 3);

console.log("PASS");

