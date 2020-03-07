
import { Evt, Handler, Ctx } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";
import { assertRepresentsSameDataFactory } from "../tools/inDepthComparison";


const { assertRepresentsSameData } = assertRepresentsSameDataFactory({
    "takeIntoAccountArraysOrdering": false
});

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<string>();

const evtAge = new Evt<number>();

const ctx = Evt.newCtx();

evtText.attach(ctx, () => assert(false));
evtAge.attach(ctx, () => assert(false));

const handlers_ = [
    ...(evtText.getHandlers() as Handler<string, any, Ctx>[]).map(handler => ({ handler, "evt": evtText })),
    ...(evtAge.getHandlers() as Handler<string, any, Ctx>[]).map(handler => ({ handler, "evt": evtAge }))
];

mustResolve({
    "promise": ctx.getEvtDetach().attachOnce(
        handlers => assertRepresentsSameData({
            "got": handlers,
            "expected": handlers_
        })
    )
});

mustResolve({
    "promise": evtAge.getEvtDetach().attachOnce(handler => assert(handler.boundTo === ctx)),
    "delay": 0
});


ctx.detach();

assert(evtText.getHandlers().length === 0);
assert(evtAge.getHandlers().length === 0);

evtText.post("nothing");
evtAge.post(0);


console.log("PASS".green);


