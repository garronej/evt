
import { StatefulEvt } from "../lib";
import { assert } from "tsafe/assert";

const evtFoo = new StatefulEvt("init");

assert(evtFoo.toStateless().postCount === 0);

console.log("PASS");
