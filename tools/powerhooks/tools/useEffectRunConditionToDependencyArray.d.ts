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
export declare function useEffectRunConditionToDependencyArray(props: {
    effectRunCondition: boolean | readonly any[];
    /** For more insightful debug messages */
    hookName?: string;
}): {
    deps: readonly any[];
    doSkipEffectRun: boolean;
};
