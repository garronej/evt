
import { Evt, Handler, Ref } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";
import { assertRepresentsSameDataFactory } from "../tools/inDepthObjectComparison";


const { assertRepresentsSameData } = assertRepresentsSameDataFactory({
    "takeIntoAccountArraysOrdering": false
});

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<string>();

const evtAge = new Evt<number>();

const ref = Evt.newRef();

evtText.attach(ref, () => assert(false));
evtAge.attach(ref, () => assert(false));

const handlers_ = [
    ...(evtText.getHandlers() as Handler<string, any, Ref>[]).map(handler => ({ handler, "evt": evtText })),
    ...(evtAge.getHandlers() as Handler<string, any, Ref>[]).map(handler => ({ handler, "evt": evtAge }))
];

mustResolve({
    "promise": ref.evtDetached.attachOnce(
        handlers => assertRepresentsSameData({
            "got": handlers,
            "expected": handlers_
        })
    )
});

mustResolve({
    "promise": evtAge.evtDetach.attachOnce(handler => assert(handler.boundTo === ref)),
    "delay": 0
});


ref.detach();


evtText.post("nothing");
evtAge.post(0);


console.log("PASS".green);


