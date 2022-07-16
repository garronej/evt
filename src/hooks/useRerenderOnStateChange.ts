import { useEvt } from "./useEvt";
import * as React from "react";
const { useState } = React;

type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike").CtxLike<Result>;

interface StatefulReadonlyEvtLike {
    state: unknown;
    attach: (ctx: CtxLike, cb: (state: unknown)=> void)=> void;
};

/**
 * https://docs.evt.land/react-hooks#usererenderonstatechange
 * 
 * To use StatefulEvt as react component state.
 * */
export function useRerenderOnStateChange(evt: StatefulReadonlyEvtLike): void {

    //NOTE: We use function in case the state is a function
    const [, setState] = useState(() => evt.state);

    useEvt(
        ctx =>
            evt.attach(ctx, state => setState(() => state)),
        [evt]
    );
}
