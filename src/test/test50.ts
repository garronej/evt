
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";

const evtAge = new Evt<number>();


let p_: number;

evtAge.$attach(
    [(...[, prev]) => [prev + 1], 0],
    {},
    p => p_ = p
);

evtAge.post(1);
evtAge.post(1);
evtAge.post(1);


assert(p_! === 3);

console.log("PASS".green);

