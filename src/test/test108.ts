import { Evt } from "../lib";
import { same } from "../tools/inDepth/same";
import { assert } from "tsafe/assert";

const evtFoo = Evt.create<{ foo: number; }>({ "foo": 33 });

const evtX= evtFoo
	.pipe([(data, prev) => same(data, prev) ? null : [data], { "foo": NaN }]);

assert(evtX.state.foo === 33);

console.log("PASS");
