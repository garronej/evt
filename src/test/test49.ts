

import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustResolve } = getPromiseAssertionApi();


const evtText = new Evt<string>();

const evtAge = new Evt<number>();

const boundTo = Evt.createHandlerGroup();

evtText.attach(boundTo, () => assert(false));
evtAge.attach(boundTo, () => assert(false));

mustResolve({
    "promise": evtAge.evtDetach.attachOnce(handler => assert(handler.boundTo === boundTo)),
    "delay": 0
});


boundTo.detach();


evtText.post("nothing");
evtAge.post(0);


console.log("PASS".green);


