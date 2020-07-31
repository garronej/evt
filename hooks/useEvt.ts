import { useState, useEffect, useMemo } from "react DENOIFY: DEPENDENCY UNMET (DEV DEPENDENCY)";

import { Evt, VoidCtx } from "../lib/index.ts";
import { safeClearTimeout, safeSetTimeout, Timer } from "../tools/safeSetTimeout.ts";

declare const process: any;

//TODO: Find a more reliable way to test if <React.UseStrict> is used.
const isDevStrictMode = process.env.NODE_ENV !== "production";

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
 */
export function useEvt<T>(
    factoryOrEffect: (ctx: VoidCtx) => T,
    deps: any[]
): T {

    const [ctx] = useState(() => Evt.newCtx());

    const out = useMemo(() => {

        ctx.done();

        return factoryOrEffect(ctx);

    }, deps);


    useEffect(() => () => { ctx.done(); }, []);

    useHackStrictMode(isDevStrictMode, ctx);

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
function useHackStrictMode(isDevStrictMode: boolean, ctx: VoidCtx) {

    let timer: Timer | undefined = undefined;

    useState(() => {

        if (!isDevStrictMode) {
            return;
        }

        timer = safeSetTimeout(
            () => ctx.done(),
            100
        );

    });

    useEffect(() => {

        if (!isDevStrictMode) {
            return;
        }

        if (timer === undefined) {
            return;
        }

        safeClearTimeout(timer);

    }, []);

}
