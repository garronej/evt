
import { Evt } from "../lib";
import { assert } from "tsafe/assert";

const log = global.console.log;
const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

const ctx= Evt.newCtx();

const evt= Evt.create("foo");

ctx.done();

evt.attach(ctx, str=> console.log(str));

evt.post("bar");
evt.post("baz");

assert(console.stdOut === "foo");

log("PASS");


