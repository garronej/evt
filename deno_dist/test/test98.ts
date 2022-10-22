import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.1.3/assert.ts";;

let stdout = "";

const evt = Evt.create("foo");


evt.evtAttach.attach(() => { stdout += "never"; });

evt.attachOnce(text => { stdout += text });

assert( stdout === "foo" );

console.log("PASS");
