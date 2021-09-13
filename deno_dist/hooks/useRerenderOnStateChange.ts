import { useEvt } from "./useEvt.ts";

type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike.ts").CtxLike<Result>;
interface HandlerLike { ctx: CtxLike };
type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("../lib/Evt.merge.ts").EvtLike<any>;

interface StatefulReadonlyEvtLike {
    evtChange: {
        evtAttach: { pipe: Pipe<(handler: HandlerLike) => void>; };
        detach(ctx: CtxLike): void;
        toStateless(ctx: CtxLike): {
            attach(cb: () => void): void;
        }
    };
};


/**
 * https://docs.evt.land/api/react-hooks
 * 
 * To use StatefulEvt as react component state.
 * */
export function useRerenderOnStateChange(...evts: StatefulReadonlyEvtLike[]): void {
    useEvt(
        (ctx, registerSideEffect) =>
            evts.forEach(
                evt =>
                    evt.evtChange
                        .toStateless(ctx)
                        .attach(() => registerSideEffect(() => { }))
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        evts
    );
}
