
import { Evt, Handler } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/index.ts";
import { getHandlerPr } from "./getHandlerPr.ts";
import { getPromiseAssertionApi } from "../tools/testing/index.ts";

const { mustResolve } = getPromiseAssertionApi();

let evt = new Evt<null>();

let handler_: Handler<any, any>;

evt.evtAttach.attachOnce(handler => handler_ = handler);

mustResolve({
    "promise":
        getHandlerPr(evt.evtDetach, () =>
            evt.evtDetach.attachOnce(handler =>
                assert(handler === handler_)
            )),
    "delay": 0

});

evt.attach(() => { });

evt.detach();

setTimeout(() => console.log("PASS"), 0);
