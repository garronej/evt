
/** https://docs.evt.land/api/ctx */
export type Ctx<Result> = import("./Ctx").Ctx<Result>;
export type DoneOrAborted<Result> = import("./Ctx").DoneOrAborted<Result>;
export { CtxLike } from "./CtxLike";
/** 
 * Minimal interface that an object must implement to be a valid context argument 
 * ( for interop between mismatching EVT versions )
 */
export type VoidCtxLike = import("./CtxLike").CtxLike;
export type Evt<T> = import("./Evt").Evt<T>;
export type NonPostableEvt<T>= import("./NonPostableEvt").NonPostableEvt<T>;
export type Postable<T> = import("./Postable").Postable<T>;
export type StatefulEvt<T> = import("./StatefulEvt").StatefulEvt<T>;

export type StatefulReadonlyEvt<T>= import("./StatefulReadonlyEvt").StatefulReadonlyEvt<T>;
export type Diff<T> = import("./StatefulReadonlyEvt").StateDiff<T>;
export type StatefulPostable<T> = import("./StatefulPostable").StatefulPostable<T>;
/** 
 * https://docs.evt.land/api/evt/ctx 
 * 
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export type VoidCtx = import("./VoidCtx").VoidCtx;
/** 
 * https://docs.evt.land/api/evt/create#why-voidevt-and-not-evt-less-than-void-greater-than 
 * https://docs.evt.land/api/evt/create
 * 
 * This is only an interface, not a class.
 * get an instance using Evt.create()
 * */
export type VoidEvt = import("./VoidEvt").VoidEvt;
