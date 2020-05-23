import { Evt, Ctx } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/assert.ts";

assert(Evt.name === "Evt");
assert(Ctx.name === "Ctx");

console.log("PASS");