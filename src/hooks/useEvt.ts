import { Evt } from "../lib/Evt";
import type { Ctx } from "../lib";
import { useGuaranteedMemo } from "../tools/powerhooks/useGuaranteedMemo";
import { useEffectIf } from "../tools/powerhooks/useEffectIf";
import * as React from "react";
const { useEffect, useState, useReducer, useRef } = React;

//TODO: Find a more reliable way to test if <React.UseStrict> is used.
const isDevStrictMode = typeof process !== "object" ?
    false :
    (process?.env?.NODE_ENV ?? "production") !== "production"
    ;

/**
 * https://docs.evt.land/api/react-hooks
 * 
 * Provide a Ctx to attach handlers.
 * You should list in deps all the Evt that are
 * susceptible to change ( Evt passed as props 
 * or Evt that are react states ) that you use in the
 * factoryOrEffect callback. 
 * As for useEffect you should also list every other
 * value that you use.
 * Whenever any value in deps is changed factoryOrEffect
 * is invoked again with the new Evt and the previous handler
 * get detached.
 * All handler are also detached when the component unmount.
 * 
 * factoryOrEffect can be used for attaching handler to event
 * or to generate a new event that is a merge/pipe of other 
 * Evts.
 * 
 * BE AWARE: Unlike useEffect factoryOrEffect is called 
 * on render ( like useMemo's callback ).
 * Remember that you shouldn't update state in a component 
 * render tick (in the useMemo for example). If you you need to 
 * perform an effect on first render (attaching a stateful evt
 * for example) use registerSideEffect(()=>{ ... })
 * 
 * Demo: https://stackblitz.com/edit/evt-useevt?file=index.tsx
 */
export function useEvt<T>(
    factoryOrEffect: (
        ctx: Ctx,
        registerSideEffect: (sideEffect: () => void) => void
    ) => T,
    deps: React.DependencyList
): T {

    const ctxRef = useRef<Ctx>(null as any);

    const [registeredSideEffects] = useState<(() => void)[]>([]);

    const [, forceUpdate] = useReducer(n => n + 1, 0);

    useEffectIf(
        function callee() {

            const registeredSideEffectsCopy = [...registeredSideEffects];

            registeredSideEffectsCopy.forEach(sideEffect => sideEffect());

            registeredSideEffects.splice(0, registeredSideEffectsCopy.length);

            if (registeredSideEffects.length !== 0) {

                callee();

                return;

            }

        },
        registeredSideEffects.length !== 0
    );

    const out = useGuaranteedMemo(() => {

        ctxRef.current?.done();

        ctxRef.current = Evt.newCtx();

        return factoryOrEffect(
            ctxRef.current,
            sideEffect => {
                registeredSideEffects.push(sideEffect);
                forceUpdate();
            }
        );

    }, deps);

    useEffect(() => () => { ctxRef.current.done(); }, []);

    useClearCtxIfReactStrictModeInspectRun(isDevStrictMode, ctxRef);

    return out;

}

/**
 * When <React.StrictMode> is used in development
 * useState and useMemo get triggered a first time on a 
 * separate component instance but useEffect is not invoked.
 * 
 * To prevent leaving handlers that we attached inside the useMemo
 * callback we clear the context if useEffect(f,[])
 * is not invoked right after useState(f).
 */
function useClearCtxIfReactStrictModeInspectRun(
    isDevStrictMode: boolean,
    ctxRef: React.MutableRefObject<Ctx>
) {

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useGuaranteedMemo(() => {

        if (!isDevStrictMode) {
            return;
        }

        timerRef.current = setTimeout(
            () => ctxRef.current.done(),
            700
        );

    }, []);

    useEffect(() => {

        if (!isDevStrictMode) {
            return;
        }

        if (timerRef.current === null) {
            return;
        }

        clearTimeout(timerRef.current);

    }, []);

}
