
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.5.2/assert.ts";

const evtText = Evt.create("foo");

try {

    evtText.pipe(text => text.startsWith("f") ? null : [text.toUpperCase()]);

    assert(false);

} catch{ }

const ctx = Evt.newCtx();

const evtTextSt = evtText.toStateless(ctx)
    .pipe(text => text.startsWith("f") ? null : [text.toUpperCase()])
    .toStateful()
    ;


assert(evtTextSt.state === undefined as any);

evtText.post("foobar");

assert(evtTextSt.state === undefined as any);

evtText.post("baz");

assert(evtTextSt.state === "BAZ" as any);

ctx.done();

evtText.post("hello");

assert(evtTextSt.state === "BAZ" as any);

console.log("PASS");

