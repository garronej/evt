
import { useReducer } from "react";
import { Evt } from "../lib";
import { useEvt } from "./useEvt";

type StatefulReadonlyEvtLike = { evtChange: import("../lib/Evt.merge").EvtLike<any>; };

/**Use StatefulEvt as react component state */
export function useStatefulEvt(evts: StatefulReadonlyEvtLike[]): void {

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEvt(
    ctx => {

      Evt.merge(ctx, evts.map(evt => evt.evtChange))
        .attach(() => {
          Promise.resolve().then(() => {

            if (ctx.getHandlers().length === 0) {
              return;
            }

            forceUpdate()

          });


        });

    },
    evts
  );

}
