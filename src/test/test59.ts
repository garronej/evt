
import { Evt, to } from "../lib";
import { assert } from "../tools/typeSafety";

const evt = new Evt<
    ["text", string] |
    ["time", number]
>();

let text_: string = "";

evt.$attach(to("text"), text => text_ = text);

let time_: number = NaN;

evt.$attachOnce(to("time"), time => time_ = time);

evt.post(["text", "hi!"]);
evt.post(["time", 123]);
evt.post(["time", 1234]);

assert(text_ === "hi!");
assert(time_ === 123);

console.log("PASS".green);
