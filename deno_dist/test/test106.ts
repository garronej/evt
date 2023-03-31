
import { Evt, TimeoutEvtError } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.0/assert.ts";

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
		async ()=>{
			evtStr.post("one");
			await new Promise(resolve => setTimeout(resolve, 50));
			evtStr.post("two");
			await new Promise(resolve => setTimeout(resolve, 50));
			evtStr.post("three");
			await new Promise(resolve => setTimeout(resolve, 200));
			evtStr.post("three");
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

	for await (const str of evtStr.iter(ctx, 150)) {

		await new Promise(resolve=> setTimeout(resolve,100));

		console.log(str);

	}

	console.log("loop_end");

	if( ctx.completionStatus?.error instanceof TimeoutEvtError ){
		console.log("the loop was terminated because of timeout");
	}

	assert(console.stdOut === "onetwoTIMEOUTthreeloop_endthe loop was terminated because of timeout");

	clearTimeout(timer);

	assert(evtStr.getHandlers().length === 0);

	log("PASS");

})();