import { Evt, compose } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

{

    const evtText = new Evt<string>();

    mustResolve({
        "promise": evtText.$attach(
            compose(
                text => [text, "DETACH"],
                text => [text]
            ),
            text => { }
        )
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustResolve({
        "promise": evtText.$attach(
            compose(
                text => [text, {"DETACH": ctx }],
                text => [text]
            ),
            ctx,
            text => { }
        )
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();


    mustStayPending(
        evtText.$attach(
            compose(
                text => [text, "DETACH"],
                () => null
            ),
            text => { }
        )
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustStayPending(
        evtText.$attach(
            compose(
                text => [text, { "DETACH": ctx }],
                str => null
            ),
            ctx,
            text => { }
        )
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

console.log("PASS".green);

