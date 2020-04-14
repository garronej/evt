import { Evt, Ctx } from "../lib";
import { assert } from "../tools/typeSafety/assert";

assert(Evt.name === "Evt");
assert(Ctx.name === "Ctx");

console.log("PASS");