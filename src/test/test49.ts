
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";
import { assertRepresentsSameDataFactory } from "../tools/inDepthObjectComparison";

const { assertRepresentsSameData } = assertRepresentsSameDataFactory({
    "takeIntoAccountArraysOrdering": false
});

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<string>();

const evtAge = new Evt<number>();

const boundTo = Evt.createHandlerGroup();

evtText.attach(boundTo, () => assert(false));
evtAge.attach(boundTo, () => assert(false));

const handlers_ = [
    ...evtText.getHandlers(),
    ...evtAge.getHandlers()
];

mustResolve({
    "promise": boundTo.evtDetached.attachOnce(
        handlers => assertRepresentsSameData({
            "got": handlers,
            "expected": handlers_
        })
    )
});

mustResolve({
    "promise": evtAge.evtDetach.attachOnce(handler => assert(handler.boundTo === boundTo)),
    "delay": 0
});


boundTo.detach();


evtText.post("nothing");
evtAge.post(0);


console.log("PASS".green);


