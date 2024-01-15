import { useEffectRunConditionToDependencyArray } from "./tools/useEffectRunConditionToDependencyArray.ts";
import React from "https://dev.jspm.io/react@18.2.0";;
import { assert } from "https://deno.land/x/tsafe@v1.6.6/assert.ts";
const { useEffect } = React;

export type Destructor = () => void;

export function useEffectIf<Deps extends readonly any[]>(
	effect: (params: { deps: Deps; }) => (void | Destructor),
	effectRunCondition: Deps | boolean
): void {

	const { deps, doSkipEffectRun } = useEffectRunConditionToDependencyArray({
		effectRunCondition,
		"hookName": useEffectIf.name
	});

	useEffect(
		() => {

			if (doSkipEffectRun) return;

			assert(effectRunCondition !== false);

			return effect({
				"deps": effectRunCondition === true ?
					[] as any : effectRunCondition
			});

		},
		deps
	);

}

/*
type Shape = { type: "circle"; radius: number; } | { type: "square"; sideLength: number; };

const shape: Shape = null as any;

useEffectIf(
	({ deps: [ radius ] })=> {
	},
	shape.type !== "circle" ? false : { "doRunOnlyOnChange": true, "deps": [shape.radius, "foo"] as const }
);
*/
