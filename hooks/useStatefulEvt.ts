
import { useReducer } from "react DENOIFY: DEPENDENCY UNMET (DEV DEPENDENCY)";
import { Evt } from "../lib/index.ts";
import { useEvt } from "./useEvt.ts";

type StatefulReadonlyEvtLike = { evtChange: import("../lib/Evt.merge.ts").EvtLike<any>; };

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
