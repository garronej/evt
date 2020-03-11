import { Evt } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";
import { assert } from "../tools/typeSafety";

const { mustResolve, mustReject } = getPromiseAssertionApi();

const evtText = new Evt<string>();

evtText.attachOnce(Evt.getCtx(evtText), () => { });

mustResolve({
    "promise": evtText.getEvtDetach()
        .attachOnce(handler => assert(Evt.getCtx(evtText) === handler.ctx))
});

evtText.post("ok");

const pr = mustReject({ "promise": evtText.waitFor(0), "delay": 150 });

mustResolve({
    "promise": evtText.getEvtDetach()
        .attach(handler => assert(handler.timeout === 0)),
    "delay": 150
});

pr.then(() => console.log("PASS".green));

