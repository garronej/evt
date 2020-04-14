import { Evt } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/index.ts";

const evtText = new Evt<string>();

const text = "ok";

evtText.evtAttach.attach(
    ({ op }) => !!evtText.getStatelessOp(op)(text),
    () => evtText.post(text)
);

let str = "";

evtText.attachOnce(str_ => str = str_);

assert(str === "ok");

console.log("PASS");
