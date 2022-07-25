import type { UnpackEvt, Evt, EvtLike, StatefulEvt } from "../../lib";
import { assert, Equals } from "tsafe";

{

	type Got = UnpackEvt<Evt<string>>;

	type Expected = string;

	assert<Equals<Got, Expected>>();

}

{

	type Got = UnpackEvt<Evt<string | undefined>>;

	type Expected = string | undefined;

	assert<Equals<Got, Expected>>();

}

{

	type Got = UnpackEvt<Evt<string> | undefined>;

	type Expected = string;

	assert<Equals<Got, Expected>>();

}

{

	type Got = UnpackEvt<EvtLike<string>>;

	type Expected = string;

	assert<Equals<Got, Expected>>();

}

{

	type Got = UnpackEvt<{
		evtText: Evt<string>;
		evtCount: StatefulEvt<number>;
		type: "FOO"
	}>;

	type Expected = {
		evtText: string;
		evtCount: number;
		type: "FOO"
	};

	assert<Equals<Got, Expected>>();

}







