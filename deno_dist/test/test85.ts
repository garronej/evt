import { Evt, Ctx } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.4/assert.ts";

assert(Evt.name === "Evt");
assert(Ctx.name === "Ctx");

console.log("PASS");