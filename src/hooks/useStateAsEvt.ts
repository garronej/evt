
import * as React from "react";
const { useEffect } = React;
import type { StatefulReadonlyEvt } from "../lib";
import { useGuaranteedMemo } from "../tools/powerhooks/useGuaranteedMemo";
import { capitalize } from "../tools/tsafe/capitalize";
import { Evt } from "../lib";

export function useStateAsEvt<T, Name extends string>(wrappedState: Record<Name, T>): Record<`evt${Capitalize<Name>}`, StatefulReadonlyEvt<T>> {

	const name = Object.keys(wrappedState)[0];
	const state = (wrappedState as any)[name];

	const evtState = useGuaranteedMemo(() => Evt.create(state), []);

	useEffect(
		() => { evtState.state = state; },
		[state]
	);

	return {
		[`evt${capitalize(name)}`]: evtState
	} as any;

}
