import { Evt } from "../lib/index.ts";
import { same } from "../tools/inDepth/same.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.6/assert.ts";

const evtFoo = Evt.create<{ foo: number; }>({ "foo": 33 });

const evtX= evtFoo
	.pipe([(data, prev) => same(data, prev) ? null : [data], { "foo": NaN }]);

assert(evtX.state.foo === 33);

console.log("PASS");
