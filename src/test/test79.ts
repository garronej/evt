import { Evt, StatefulReadonlyEvt } from "../lib";
import { assert } from "../tools/typeSafety";


const evtCount = Evt.create(0);
{ const evtCountReadonly: StatefulReadonlyEvt<number> = evtCount; evtCountReadonly; }

let std_out = "";

evtCount.evtChange.attach(count => std_out += count);

evtCount.state++;

evtCount.state = evtCount.state;

evtCount.postForceChange([evtCount.state + 1]);
evtCount.postForceChange([evtCount.state]);
evtCount.postForceChange();

assert(std_out === "1222");

console.log("PASS");

