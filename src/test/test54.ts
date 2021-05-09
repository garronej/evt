import { Evt } from "../lib";
import { assert } from "tsafe/assert";

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
