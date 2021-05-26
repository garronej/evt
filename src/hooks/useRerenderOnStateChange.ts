import { Polyfill as WeakSet } from "minimal-polyfills/WeakSet";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

import * as React from "react";
const { useReducer } = React;


type CtxLike<Result = any> = import("evt/lib/types/interfaces/CtxLike").CtxLike<Result>;
interface HandlerLike { ctx: CtxLike };
type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("evt/lib/Evt.merge").EvtLike<any>;

interface StatefulReadonlyEvtLike {
    evtChange: {
        evtAttach: { pipe: Pipe<(handler: HandlerLike) => void>; };
        detach(ctx: CtxLike): void;
        toStateless(ctx: CtxLike): {
            attach(cb: () => void): void;
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

const ctxs = new WeakSet<any>();

/**
 * https://docs.evt.land/api/react-hooks
 * 
 * To use StatefulEvt as react component state.
 * */
export function useRerenderOnStateChange(evts: StatefulReadonlyEvtLike[]): void {

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEvt(
        ctx => {

            ctxs.add(ctx);

            evts.forEach(evt => {

                const attach = () => evt.evtChange.toStateless(ctx).attach(() => forceUpdate());

                attach();

                //NOTE: We do all this funny business because we want to ensure that the handler
                //that triggers the re-render is always the last handler to be invoked.
                //What we do is we detach our handler when an other is added and synchronously re-attach it
                //Using the ctxs WeakMap we avoid infinite loop, each handler of useRerenderOnStateChange
                //trying to be the first. (happens when useRerenderOnStateChange is called multiple time on
                //an event)
                Evt.merge(
                    [
                        evt.evtChange.evtAttach.pipe(ctx, handler => !ctxs.has(handler.ctx)),
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        evts
    );

}