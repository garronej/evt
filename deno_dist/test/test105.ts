
import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.5.1/assert.ts";

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


