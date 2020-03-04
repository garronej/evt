import { Evt } from "../lib";
import { assert  } from "../tools/typeSafety";

const evtText= new Evt<string>();

evtText.postSyncOnceHandled("ok");

let str= "";

evtText.attachOnce(str_=> str= str_);

assert(str === "ok");

console.log("PASS".green);
