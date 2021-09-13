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
        detach(ctx: CtxLike): void;
        toStateless(ctx: CtxLike): {
            attach(cb: () => void): void;
        };
    };
}
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
export declare function useRerenderOnStateChange(...evts: StatefulReadonlyEvtLike[]): void;
export {};
