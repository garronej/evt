import { assert } from "tsafe/assert";
import * as React from "react";
const { useEffect, useRef } = React;

export type Destructor = () => void;

const depsMaxLength = 7;

export function useEffectIf(
	effect: () => (void | Destructor),
	updateConditionOrDeps: boolean | readonly any[]
): void {

	const depsRef = useRef<readonly any[]>(new Array(depsMaxLength).fill(Object));

	depsRef.current = typeof updateConditionOrDeps === "boolean" ?
		updateConditionOrDeps ?
			[{}, ...new Array(depsMaxLength - 1).fill(Object)] :
			depsRef.current
		:
		(
			assert(
				updateConditionOrDeps.length <= depsMaxLength,
				`dependency array passed to ${useEffectIf.name} can only contain at most ${depsMaxLength} elements`
			),
			[
				...updateConditionOrDeps,
				...new Array(depsMaxLength - updateConditionOrDeps.length).fill(Object)
			]
		);

	useEffect(
		() => {

			//Only necessary for fist render.
			if (updateConditionOrDeps === false) {
				return;
			}

			return effect();

		},
		depsRef.current
	);

}

