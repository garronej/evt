import { Evt, TimeoutEvtError } from '../lib/index.ts';
import { assert } from "https://deno.land/x/tsafe@v1.5.1/assert.ts";

const log = console.log;

const timer = setTimeout(
	() => {
		assert(false);
	},
	400
);

{

const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

const evtStr = Evt.create<string>();

setTimeout(
	async () => {

		evtStr.post("one");
		await new Promise((reduce) => setTimeout(reduce, 50));
		evtStr.post("two");
		await new Promise((reduce) => setTimeout(reduce, 50));
		evtStr.post("three");

		//While we wait here the async iterator will timeout
		await new Promise((reduce) => setTimeout(reduce, 200));

		evtStr.post("four");
		evtStr.post("five");

	}, 0
);


(async () => {
	const ctx = Evt.newCtx();

	for await (const str of evtStr.iter(ctx, 100)) {
		console.log(str);
	}

	if (ctx.completionStatus?.error instanceof TimeoutEvtError) {
		console.log("We exited the loop because of a timeout");
	}

	assert(console.stdOut === "onetwothreeWe exited the loop because of a timeout");

	clearTimeout(timer);

	assert(evtStr.getHandlers().length === 0);

	log("PASS");

})();

}
