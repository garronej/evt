
import type { EvtLike, NonPostableEvtLike, Evt, NonPostableEvt } from "../../lib/index.ts";
import { assert, Equals } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.0/deno_dist/mod.ts";
import { Reflect } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.0/deno_dist/Reflect.ts";

assert<Evt<number> extends EvtLike<number> ? true : false>();
assert<Evt<number> extends NonPostableEvtLike<number> ? true : false>();
assert<NonPostableEvt<number> extends NonPostableEvtLike<number> ? true : false>();



{

	const f = Reflect< <T>(evt: EvtLike<T>) => T>();

	const got = f(Reflect<Evt<string>>())

	type Expected = string;

	assert<Equals<typeof got, Expected>>();

}

{

	const f = Reflect< <T>(evt: NonPostableEvtLike<T>) => T>();

	const got = f(Reflect<Evt<string>>())

	type Expected = string;

	assert<Equals<typeof got, Expected>>();

}

