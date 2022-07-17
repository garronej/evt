
import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.0/deno_dist/assert.ts";

const log = console.log;

{

	const console = { "log": (str: string | number) => console.stdOut += `${str}`, "stdOut": "" };

	const ctx = Evt.newCtx();

	const evt = Evt.create("foo");

	ctx.done();

	evt.attach(ctx, str => console.log(str));

	evt.post("bar");
	evt.post("baz");

	assert(console.stdOut === "foo");

	log("PASS");

}


