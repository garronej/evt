
import { Evt, TimeoutEvtError } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.0/deno_dist/assert.ts";

const log = global.console.log;

(async () => {

	const timer = setTimeout(
		()=> {
			assert(false);
		},
		500
	);

	const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

	const evtStr = Evt.create<string>();

	const it = evtStr.getAsyncIterable(60);

	setTimeout(
		()=>{
			evtStr.post("one");
			evtStr.post("two");
			evtStr.post("three");
			it.ctx.done();
		},
		0
	);

	it.ctx.evtDoneOrAborted.attachOnce(event=> {

		if( event.type === "ABORTED" ){

			const { error }= event;

			if( error instanceof TimeoutEvtError ){
				console.log("TIMEOUT");
			}else{
				console.log(`Aborter: ${error.message}`);
			}

			return;
			
		}

		console.log("DONE");

	});

	for await (const str of it) {

		await new Promise(resolve=> setTimeout(resolve,100));

		console.log(str);

	}

	console.log("loop_end");
	assert(console.stdOut === "DONEonetwothreeloop_end");

	clearTimeout(timer);

	assert(evtStr.getHandlers().length === 0);

	log("PASS");

})();