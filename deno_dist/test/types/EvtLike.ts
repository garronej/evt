
import type { EvtLike, NonPostableEvtLike, Evt, NonPostableEvt } from "../../lib/index.ts";
import { assert, Equals } from "https://deno.land/x/tsafe@v1.6.0/mod.ts";
import { Reflect } from "https://deno.land/x/tsafe@v1.6.0/Reflect.ts";

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

