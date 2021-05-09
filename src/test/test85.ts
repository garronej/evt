import { Evt, Ctx } from "../lib";
import { assert } from "tsafe/assert";

assert(Evt.name === "Evt");
assert(Ctx.name === "Ctx");

console.log("PASS");