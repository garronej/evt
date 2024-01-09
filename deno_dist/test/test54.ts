import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.5/assert.ts";

const evtText = new Evt<string>();

const text = "ok";

evtText.evtAttach.attach(
    ({ op })=> evtText.isHandledByOp(op, text),
    () => evtText.post(text)
);

let str = "";

evtText.attachOnce(str_ => str = str_);

assert(str === "ok");

console.log("PASS");