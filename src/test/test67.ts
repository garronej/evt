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
            (...[text, , isPost]) => (
                isPost && Evt.newCtx<boolean>().done(true),
                [text.toUpperCase()]
            ),
            (...[text, , isPost]) => (
                isPost && Evt.newCtx<number>().done(3),
                [text.length]
            ),
            (...[n, , isPost]) => (
                isPost && Evt.newCtx(),
                [`=>${n}<=`]
            ),
            (...[str, , isPost]) => (
                isPost && Evt.newCtx().abort(new Error()),
                [str.toUpperCase()]
            ),
            (...[str, , isPost]) => (
                isPost && Evt.newCtx<boolean>().abort(new Error()),
                [str.toUpperCase()]
            )
        ),
        str => str.toUpperCase()
    );

}


{

    const evtText = new Evt<string>();

    const ctx= Evt.newCtx();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        (...[text,,isPost])=>(isPost && ctx.done(), [text]),
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

    const ctx = Evt.newCtx();

    mustResolve({
        "promise":
            getHandlerPr(evtText, () =>
                evtText.$attach(
                    compose(
                        (...[text, , isPost]) => (isPost && ctx.done(), [text]),
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

    const ctx = Evt.newCtx();

    mustStayPending(
        getHandlerPr(evtText, () =>
            evtText.$attach(
                compose(
                    (...[text, , isPost]) => (isPost && ctx.done(), [text]),
                    () => null
                ),
                ctx,
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
                    (...[text, , isPost]) => (isPost && ctx.done(), [text]),
                    str => (str.toLowerCase(), null)
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

