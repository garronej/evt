
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

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

