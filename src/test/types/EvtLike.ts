
import type { EvtLike, NonPostableEvtLike, Evt, NonPostableEvt } from "../../lib";
import { assert, Equals } from "tsafe";
import { Reflect } from "tsafe/Reflect";

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

