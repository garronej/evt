
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.6.4/assert.ts";

const log = console.log;

(async () => {

	const timer = setTimeout(
		()=> {
			assert(false);
		},
		3000
	);

	const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

	const evtCounter = Evt.create<number>(0);

	const intervalTimer = setInterval(
		()=> {

			evtCounter.state++;

		},
		100
	);


	
	for await (const counter of evtCounter.iter()) {

		console.log(counter);

		if( counter === 3 ){
			break;
		}

	}

	console.log("loop_end");

	assert(console.stdOut === "0123loop_end");

	clearTimeout(timer);
	clearInterval(intervalTimer);

	assert(evtCounter.getHandlers().length === 0);

	log("PASS");

})();