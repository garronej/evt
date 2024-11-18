import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.8.5/assert.ts";
import { onlyIfChanged } from "../operators/onlyIfChanged.ts";

let alphabet = ""

const evtFoo = Evt.create<{ foo: string; }>();

evtFoo
	.pipe(onlyIfChanged())
	.attach(({ foo }) => {

		alphabet += foo;

	});

evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "a" });
evtFoo.post({ "foo": "b" });
evtFoo.post({ "foo": "b" });
evtFoo.post({ "foo": "c" });

assert(alphabet === "abc");

console.log("PASS");

