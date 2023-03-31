import { Evt } from "../lib/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.0/assert.ts";

const { mustResolve, mustReject } = getPromiseAssertionApi();

const evtText = new Evt<string>();

evtText.attachOnce(Evt.getCtx(evtText), () => { });

mustResolve({
    "promise":
        getHandlerPr(
            evtText.evtDetach,
            () => evtText.evtDetach
                .attachOnce(handler => assert(Evt.getCtx(evtText) === handler.ctx))
        )
});

evtText.post("ok");

const pr = mustReject({ "promise": evtText.waitFor(0), "delay": 150 });

mustResolve({
    "promise":
        getHandlerPr(
            evtText.evtDetach,
            () => evtText.evtDetach
                .attach(handler => assert(handler.timeout === 0))),
    "delay": 150
});

pr.then(() => console.log("PASS"));

