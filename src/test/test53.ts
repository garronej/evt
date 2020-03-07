
import { Evt, Handler } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing";

const { mustResolve } = getPromiseAssertionApi();

let evt = new Evt<null>();

let handler_: Handler<any, any>;

evt.getEvtAttach().attachOnce(handler => handler_ = handler);

mustResolve({
    "promise": evt.getEvtDetach().attachOnce(handler =>
        assert(handler === handler_)
    ),
    "delay": 0

});

evt.attach("foo", () => { });

evt.detach();

setTimeout(() => console.log("PASS".green), 0);
