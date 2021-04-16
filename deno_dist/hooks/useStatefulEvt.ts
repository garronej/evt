
import React from "https://dev.jspm.io/react@16.14.0";;
const { useReducer } = React;

import { Evt } from "../lib/index.ts";
import { useEvt } from "./useEvt.ts";

type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike.ts").CtxLike<Result>;
interface HandlerLike { ctx: CtxLike };
type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("../lib/Evt.merge.ts").EvtLike<any>;

interface StatefulReadonlyEvtLike {
  evtChange: {
    evtAttach: { pipe: Pipe<(handler: HandlerLike) => void>; };
    attach(ctx: CtxLike, cb: () => void): void;
    detach(ctx: CtxLike): void;
  };
  evtChangeDiff: {
    evtAttach: { pipe: Pipe; }
  };
  evtDiff: {
    evtAttach: { pipe: Pipe; }
  };
  evtAttach: { pipe: Pipe; }
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

        const attach = () => evt.evtChange.attach(ctx, forceUpdate);

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
