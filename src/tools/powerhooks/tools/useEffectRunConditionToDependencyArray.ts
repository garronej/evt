import { assert } from "tsafe/assert";
import * as React from "react";
const { useRef } = React;

const depsMaxLength = 9;

const privateObject = {}

/**
 * Hooks for having better control on when an effect should be run.
 * 
 * function useMyEffect(effect: ()=> void; effectRunCondition: EffectRunCondition) {
 * 
 *     const { deps, doSkipEffectRun }= useEffectRunConditionToDependencyArray({ 
 *         effectRunCondition, 
 *         "hookName": useMyEffect.name 
 *     });
 * 
 *     useEffect(()=> {
 *         if( doSkipEffectRun ) return;
 * 	       effect();
 *     }, deps);
 * 
 * }
 * 
 */
export function useEffectRunConditionToDependencyArray(
	props: {
		effectRunCondition: boolean | readonly any[],
		/** For more insightful debug messages */
		hookName?: string;
	}
): { deps: readonly any[]; doSkipEffectRun: boolean; } {

	const {
		effectRunCondition,
		hookName = useEffectRunConditionToDependencyArray.name
	} = props;

	const depsRef = useRef<readonly any[]>(new Array(depsMaxLength).fill(privateObject));

	const { deps, doSkipEffectRun } = (() => {

		if (typeof effectRunCondition === "boolean") {

			return {
				"deps": effectRunCondition ?
					[{}, ...new Array(depsMaxLength - 1).fill(privateObject)] :
					depsRef.current,
				"doSkipEffectRun": !effectRunCondition
			};

		}

		assert(
			effectRunCondition.length <= depsMaxLength,
			`dependency array passed to ${hookName} can only contain at most ${depsMaxLength} elements`
		);

		const deps = [
			...effectRunCondition,
			...new Array(depsMaxLength - effectRunCondition.length).fill(privateObject)
		];

		return { deps, "doSkipEffectRun": false };

	})();

	depsRef.current = deps;

	return {
		deps,
		doSkipEffectRun /* NOTE: Only necessary for fist render */
	};

}

