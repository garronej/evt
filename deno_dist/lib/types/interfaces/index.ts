
/** https://docs.evt.land/api/ctx */
export type Ctx<Result> = import("./Ctx.ts").Ctx<Result>;
export type DoneOrAborted<Result> = import("./Ctx.ts").DoneOrAborted<Result>;
export { CtxLike } from "./CtxLike.ts";
/** 
 * Minimal interface that an object must implement to be a valid context argument 
 * ( for interop between mismatching EVT versions )
 */
export type VoidCtxLike = import("./CtxLike.ts").CtxLike;
export type Evt<T> = import("./Evt.ts").Evt<T>;
export type NonPostableEvt<T>= import("./NonPostableEvt.ts").NonPostableEvt<T>;
export type Postable<T> = import("./Postable.ts").Postable<T>;
export type StatefulEvt<T> = import("./StatefulEvt.ts").StatefulEvt<T>;

export type StatefulReadonlyEvt<T>= import("./StatefulReadonlyEvt.ts").StatefulReadonlyEvt<T>;
export type Diff<T> = import("./StatefulReadonlyEvt.ts").StateDiff<T>;
export type StatefulPostable<T> = import("./StatefulPostable.ts").StatefulPostable<T>;
/** 
 * https://docs.evt.land/api/evt/ctx 
 * 
 * Only an interface (not a class), use Evt.newCtx() to get an instance.
 */
export type VoidCtx = import("./VoidCtx.ts").VoidCtx;
/** 
 * https://docs.evt.land/api/evt/create#why-voidevt-and-not-evt-less-than-void-greater-than 
 * https://docs.evt.land/api/evt/create
 * 
 * This is only an interface, not a class.
 * get an instance using Evt.create()
 * */
export type VoidEvt = import("./VoidEvt.ts").VoidEvt;
