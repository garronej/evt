import type { EvtLikeToEvt, NonPostableEvtLike, NonPostableEvt, EvtLike, Evt, StatefulReadonlyEvtLike, StatefulReadonlyEvt, StatefulEvtLike, StatefulEvt } from "../../lib/index.ts";
import { assert, Equals } from "https://deno.land/x/tsafe@v1.2.1/mod.ts";

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

