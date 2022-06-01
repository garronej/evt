declare type CtxLike<Result = any> = import("../lib/types/interfaces/CtxLike").CtxLike<Result>;
interface StatefulReadonlyEvtLike {
    state: unknown;
    attach: (ctx: CtxLike, cb: (state: unknown) => void) => void;
}
/**
 * https://docs.evt.land/api/react-hooks
 *
 * To use StatefulEvt as react component state.
 * */
export declare function useRerenderOnStateChange(evt: StatefulReadonlyEvtLike): void;
export {};
