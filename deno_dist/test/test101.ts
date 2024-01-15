
import { Evt, TimeoutEvtError } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.6/assert.ts";

const log = console.log;

(async () => {

	const timer = setTimeout(
		()=> {
			assert(false);
		},
		4000
	);

	const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

	const evtStr = Evt.create<string>();

	const ctx = Evt.newCtx();

	setTimeout(
		()=>{
			evtStr.post("one");
			evtStr.post("two");
			evtStr.post("three");
			ctx.done();
		},
		0
	);

	ctx.evtDoneOrAborted.attachOnce(event=> {

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

	for await (const str of evtStr.iter(ctx, 60)) {

		await new Promise(resolve=> setTimeout(resolve,100));

		console.log(str);

	}

	console.log("loop_end");
	assert(console.stdOut === "DONEonetwothreeloop_end");

	clearTimeout(timer);

	assert(evtStr.getHandlers().length === 0);

	log("PASS");

})();