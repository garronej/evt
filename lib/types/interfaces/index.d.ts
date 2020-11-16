/** https://docs.evt.land/api/ctx */
export declare type Ctx<Result> = import("./Ctx").Ctx<Result>;
export declare type DoneOrAborted<Result> = import("./Ctx").DoneOrAborted<Result>;
export { CtxLike } from "./CtxLike";
/**
 * Minimal interface that an object must implement to be a valid context argument
 * ( for interop between mismatching EVT versions )
 */
export declare type VoidCtxLike = import("./CtxLike").CtxLike;
export declare type Evt<T> = import("./Evt").Evt<T>;
export declare type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;
export declare type Postable<T> = import("./Postable").Postable<T>;
export declare type StatefulEvt<T> = import("./StatefulEvt").StatefulEvt<T>;
export declare type StatefulReadonlyEvt<T> = import("./StatefulReadonlyEvt").StatefulReadonlyEvt<T>;
export declare type Diff<T> = import("./StatefulReadonlyEvt").StateDiff<T>;
export declare type StatefulPostable<T> = import("./StatefulPostable").StatefulPostable<T>;
/**
 * https://docs.evt.land/api/evt/ctx
 *
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export declare type VoidCtx = import("./VoidCtx").VoidCtx;
/**
 * https://docs.evt.land/api/evt/create#why-voidevt-and-not-evt-less-than-void-greater-than
 * https://docs.evt.land/api/evt/create
 *
 * This is only an interface, not a class.
 * get an instance using Evt.create()
 * */
export declare type VoidEvt = import("./VoidEvt").VoidEvt;
