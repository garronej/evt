
import type { NonPostableEvtLike, StatefulEvt, StatefulReadonlyEvtLike } from "../../lib/index.ts";
import { Evt } from "../../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v1.0.0/deno_dist/mod.ts";
import type { Equals } from "https://raw.githubusercontent.com/garronej/tsafe/v1.0.0/deno_dist/mod.ts";
import { Reflect } from "https://raw.githubusercontent.com/garronej/tsafe/v1.0.0/deno_dist/Reflect.ts";

type T = {
	_brand: "T";
};

{

	const got = Evt.create();

	type Expected = Evt<void>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<T>();

	type Expected = Evt<T>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<T | undefined>();

	type Expected = Evt<T | undefined>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<T | undefined>(Reflect<T>());

	type Expected = StatefulEvt<T | undefined>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create(Reflect<T>());

	type Expected = StatefulEvt<T>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create(Reflect<T | undefined>());

	type Expected = StatefulEvt<T | undefined>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<NonPostableEvtLike<T> | undefined>();

	type Expected = Evt<T>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<NonPostableEvtLike<T>>();

	type Expected = Evt<T>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<NonPostableEvtLike<T | undefined> | undefined>();

	type Expected = Evt<T | undefined>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<StatefulReadonlyEvtLike<T> | undefined>(Reflect<T>());

	type Expected = StatefulEvt<T>;

	assert<Equals<typeof got, Expected>>();

}

{

	const got = Evt.create<StatefulReadonlyEvtLike<T | undefined> | undefined>(Reflect<T>())

	type Expected = StatefulEvt<T | undefined>;

	assert<Equals<typeof got, Expected>>();

}

