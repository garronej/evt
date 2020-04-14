import { Evt, compose } from "../lib";
import { assert } from "../tools/typeSafety";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";
import { getHandlerPr } from "./getHandlerPr";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

{
    //Test type only
    const evtText = new Evt<string>();

    evtText.$attach(
        compose(
            text => [text.toUpperCase(), { "DETACH": Evt.newCtx<boolean>(), "res": true }],
            text => [text.length, { "DETACH": Evt.newCtx<number>(), "res": 3 }],
            n => [`=>${n}<=`, { "DETACH": Evt.newCtx() }],
            str => [str.toUpperCase(), { "DETACH": Evt.newCtx(), "err": new Error() }],
            str => [str.toUpperCase(), { "DETACH": Evt.newCtx<boolean>(), "err": new Error() }]
        ),
        str => str.toUpperCase()
    );



}


{

    const evtText = new Evt<string>();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        text => [text, "DETACH"],
                        text => [text]
                    ),
                    text => text.toLowerCase()
                ))
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        text => [text, { "DETACH": ctx }],
                        text => [text]
                    ),
                    ctx,
                    text => text.toLowerCase()
                ))
    });

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();


    mustStayPending(
        getHandlerPr(evtText, () =>
            evtText.$attach(
                compose(
                    text => [text, "DETACH"],
                    () => null
                ),
                () => { }
            ))
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

{

    const evtText = new Evt<string>();

    const ctx = Evt.newCtx();

    mustStayPending(
        getHandlerPr(
            evtText, () =>

            evtText.$attach(
                compose(
                    text => [text, { "DETACH": ctx }],
                    str => { str.toLowerCase(); return null; }
                ),
                ctx,
                () => { }
            )
        )
    );

    evtText.post("foo");

    assert(evtText.getHandlers().length === 0)

}

console.log("PASS");

