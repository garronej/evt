import { Evt } from "../lib";
import { assert } from "tsafe/assert";
import { onlyIfChanged } from "../lib/util/genericOperators/onlyIfChanged";

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

