
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";
import { scan } from "../lib/util";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve, mustStayPending } = getPromiseAssertionApi();

(async () => {

    const ctx = Evt.newCtx();

    const evtText = new Evt<string>();

    mustResolve({
        "promise": ctx.getEvtDone().attach(() => { }).then(handlers => handlers.length),
        "expectedData": 1
    });

    const nothing = {};

    let last: string | {} = nothing;

    const prTest = mustResolve({
        "promise": ctx.getEvtAttach().waitFor(
            ({ handler, evt }) => (
                evt === evtText &&
                handler.ctx === ctx &&
                !handler.async &&
                !handler.once &&
                !handler.prepend &&
                handler.timeout === undefined &&
                !handler.extract
            )
        )
    });

    mustStayPending(
        ctx.getEvtAttach().waitFor(
            ({ handler, evt }) => !(
                evt === evtText &&
                handler.ctx === ctx &&
                !handler.async &&
                !handler.once &&
                !handler.prepend &&
                handler.timeout === undefined &&
                !handler.extract
            )
        )
    );


    evtText
        .pipe(ctx)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe(count => count <= 33 ? [`${count}`] : { "DETACH": ctx })
        .attach(str => last = str)
        ;

    await prTest;

    evtText.post("hello world");
    assert(last === "11");
    last = nothing

    evtText.post("hello world");
    assert(last === "22");
    last = nothing

    evtText.post("hello world");
    assert(last === "33");
    last = nothing

    evtText.post("hello world");
    assert(last === nothing);
    assert(evtText.getHandlers().length === 0);
    assert(ctx.getHandlers().length === 0);


})();

{

    const ctx = Evt.newCtx();

    const evtText = new Evt<string>();

    mustResolve({
        "promise": ctx.getEvtDone().attach(() => { }).then(handlers => handlers.length),
        "expectedData": 1
    });

    const nothing = {};

    let last: string | {} = nothing;

    evtText
        .pipe(ctx)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe(count => [`${count}`, count < 33 ? null : { "DETACH": ctx }])
        .attach(str => last = str)
        ;


    evtText.post("hello world");
    assert(last === "11");
    last = nothing

    evtText.post("hello world");
    assert(last === "22");
    last = nothing

    evtText.post("hello world");
    assert(last === "33");
    last = nothing

    assert(evtText.getHandlers().length === 0);
    assert(ctx.getHandlers().length === 0);

    evtText.post("hello world");
    assert(last === nothing);

}

setTimeout(() => console.log("PASS".green), 0);
