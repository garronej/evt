
import { StatefulEvt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.2.1/assert.ts";

const evtFoo = new StatefulEvt("init");

assert(evtFoo.toStateless().postCount === 0);

console.log("PASS");
