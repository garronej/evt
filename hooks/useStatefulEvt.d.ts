declare type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike").CtxLike<Result>;
interface HandlerLike {
    ctx: CtxLike;
}
declare type Pipe<Cb = () => void> = (ctx: CtxLike, cb?: Cb) => import("../lib/Evt.merge").EvtLike<any>;
interface StatefulReadonlyEvtLike {
    evtChange: {
        evtAttach: {
            pipe: Pipe<(handler: HandlerLike) => void>;
        };
        attach(ctx: CtxLike, cb: () => void): void;
        detach(ctx: CtxLike): void;
    };
    evtChangeDiff: {
        evtAttach: {
            pipe: Pipe;
        };
    };
    evtDiff: {
        evtAttach: {
            pipe: Pipe;
        };
    };
    evtAttach: {
        pipe: Pipe;
    };
}
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
export declare function useStatefulEvt(evts: StatefulReadonlyEvtLike[]): void;
export {};
