
import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";
import { scan } from "../lib/util";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi();

{

    const ref = Evt.newRef();

    const evtText = new Evt<string>();

    mustResolve({
        "promise": ref.evtDetached.attach(() => { }).then(handlers => handlers.length),
        "expectedData": 1
    });

    const nothing = {};

    let last: string | {} = nothing;

    evtText
        .pipe(ref)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe(count => count <= 33 ? [`${count}`] : { "DETACH": ref })
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


    evtText.post("hello world");
    assert(last === nothing);
    assert(evtText.getHandlers().length === 0);
    assert(ref.getHandlers().length === 0);

}

{

    const ref = Evt.newRef();

    const evtText = new Evt<string>();

    mustResolve({
        "promise": ref.evtDetached.attach(() => { }).then(handlers => handlers.length),
        "expectedData": 1
    });

    const nothing = {};

    let last: string | {} = nothing;

    evtText
        .pipe(ref)
        .pipe(str => [str.toUpperCase()])
        .pipe(str => str.startsWith("H"))
        .pipe(scan((charCount, str) => charCount + str.length, 0))
        .pipe(count => [`${count}`, count < 33 ? null : { "DETACH": ref }])
        .attach(str => last = str ) 
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
    assert(ref.getHandlers().length === 0);

    evtText.post("hello world");
    assert(last === nothing);

}

setTimeout(() => console.log("PASS".green), 0);
