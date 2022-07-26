import type { EvtLikeToEvt, NonPostableEvtLike, NonPostableEvt, EvtLike, Evt, StatefulReadonlyEvtLike, StatefulReadonlyEvt, StatefulEvtLike, StatefulEvt } from "../../lib/index.ts";
import { assert, Equals } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.1/deno_dist/mod.ts";

type T = {
	_brand: "T";
};

{

	type Got = EvtLikeToEvt<NonPostableEvtLike<T>>;
	type Expected = NonPostableEvt<T>;

	assert<Equals<Got, Expected>>();

}

{

	type Got = EvtLikeToEvt<EvtLike<T>>;
	type Expected = Evt<T>;

	assert<Equals<Got, Expected>>();

}

{

	type Got = EvtLikeToEvt<StatefulReadonlyEvtLike<T>>;
	type Expected = StatefulReadonlyEvt<T>;

	assert<Equals<Got, Expected>>();

}


{

	type Got = EvtLikeToEvt<StatefulEvtLike<T>>;
	type Expected = StatefulEvt<T>;

	assert<Equals<Got, Expected>>();

}

