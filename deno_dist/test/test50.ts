
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.5.1/assert.ts";

const evtAge = new Evt<number>();


let p_: number;

evtAge.$attach(
    [(...[, prev]) => [prev + 1], 0],
    Evt.newCtx(),
    p => p_ = p
);

evtAge.post(1);
evtAge.post(1);
evtAge.post(1);


assert(p_! === 3);

console.log("PASS");

