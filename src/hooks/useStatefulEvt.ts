
import * as React from "react";
const { useReducer } = React;

import { Evt } from "../lib";
import { useEvt } from "./useEvt";

type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike").CtxLike<Result>;
interface HandlerLike { ctx: CtxLike };
type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("../lib/Evt.merge").EvtLike<any>;

interface StatefulReadonlyEvtLike {
    evtChange: {
        evtAttach: { pipe: Pipe<(handler: HandlerLike) => void>; };
        detach(ctx: CtxLike): void;
        toStateless(): {
            attach(ctx: CtxLike, cb: () => void): void;
        }
    };
    evtChangeDiff: {
        evtAttach: { pipe: Pipe; }
    };
    evtDiff: {
        evtAttach: { pipe: Pipe; }
    };
    evtAttach: {
        pipe: Pipe;
    }
};

/**
 * https://docs.evt.land/api/react-hooks
 * 
 * To use StatefulEvt as react component state.
 * */
export function useStatefulEvt(evts: StatefulReadonlyEvtLike[]): void {

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEvt(
        ctx => {

            evts.forEach(evt => {

                const attach = () => evt.evtChange.toStateless().attach(ctx, forceUpdate);

                attach();

                Evt.merge(
                    [
                        evt.evtChange.evtAttach.pipe(ctx, handler => handler.ctx !== ctx),
                        ...[
                            evt,
                            evt.evtChangeDiff,
                            evt.evtDiff
                        ].map(evt => evt.evtAttach.pipe(ctx)),
                    ]
                ).attach(() => {

                    evt.evtChange.detach(ctx);

                    attach();

                });

            });

        },
        evts
    );

}
