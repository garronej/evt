import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

let stdout = "";

const evt = Evt.create("foo");


evt.evtAttach.attach(() => { stdout += "never"; });

evt.attachOnce(text => { stdout += text });

assert( stdout === "foo" );

console.log("PASS");
