export * from "./helper";
export * from "./interfaces";

export * from "./EventTargetLike";

/*
import * as ns1 from "./EventTargetLike";

export type EventTargetLike<T> = ns1.EventTargetLike<T>;

export namespace EventTargetLike {
    export type HTMLElement = ns1.EventTargetLike.HTMLElement;
    export type Window = ns1.EventTargetLike.Window;
    export type Document = ns1.EventTargetLike.Document;
    export type RxJSSubject<T> = ns1.EventTargetLike.RxJSSubject<T>;
    export namespace RxJSSubject {
        export type Subscription = ns1.EventTargetLike.RxJSSubject.Subscription;
        export const match = ns1.EventTargetLike.RxJSSubject.match;
    }
    export type NodeStyleEventEmitter = ns1.EventTargetLike.NodeStyleEventEmitter;
    export namespace NodeStyleEventEmitter {
        export type Regular = ns1.EventTargetLike.NodeStyleEventEmitter.Regular;
        export type Compat = ns1.EventTargetLike.NodeStyleEventEmitter.Compat;
        export declare type NodeEventHandler = ns1.EventTargetLike.NodeStyleEventEmitter.NodeEventHandler;
        export const match = ns1.EventTargetLike.NodeStyleEventEmitter.match;
    }
    export type JQueryStyleEventEmitter = ns1.EventTargetLike.JQueryStyleEventEmitter;
    export namespace JQueryStyleEventEmitter {
        export const match = ns1.EventTargetLike.JQueryStyleEventEmitter.match;
    }
    export type HasEventTargetAddRemove<E> = ns1.EventTargetLike.HasEventTargetAddRemove<E>;
    export namespace HasEventTargetAddRemove {
        export type Options = ns1.EventTargetLike.HasEventTargetAddRemove.Options;
        export const match = ns1.EventTargetLike.HasEventTargetAddRemove.match;
    }
    export const canBe = ns1.EventTargetLike.canBe;
}
*/

/*
import * as ns2 from "./EvtError";

export type EvtError = ns2.EvtError;

export namespace EvtError {

    export type Timeout = typeof ns2.EvtError.Timeout["prototype"];

    export const Timeout: {
        new(timeout: number): Timeout;
        readonly prototype: Timeout;
    } = ns2.EvtError.Timeout;

    export type Detached = typeof ns2.EvtError.Detached["prototype"];

    export const Detached: {
        new(): Detached;
        readonly prototype: Detached;
    } = ns2.EvtError.Detached;

}
*/

export * from "./EvtError";

export * from "./Handler";

//type CtxLike<Result> = import("../types/interfaces").CtxLike<Result>;
//
//
///** https://docs.evt.land/api/handler */
//export type Handler<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> =
//    import("./Handler").Handler<T, U, CtxProp>;
//
//export namespace Handler {
//
//    /** Handlers params that come from the arguments passed to the method invoked */
//    export type PropsFromArgs<T, U, CtxProp extends CtxLike<any> | undefined = CtxLike<any> | undefined> =
//        import("./Handler").Handler.PropsFromArgs<T, U, CtxProp>;
//
//    /** 
//     * Handlers params that are implicitly specified by the method used: 
//     * attachOnce => once
//     * attachOncePrepend => once + prepend
//     * waitFor => once + async
//     * ...
//     */
//    export type PropsFromMethodName =
//        import("./Handler").Handler.PropsFromMethodName;
//
//    export namespace PropsFromMethodName {
//
//        export type Sync =
//            import("./Handler").Handler.PropsFromMethodName.Sync;
//
//        export type Async =
//            import("./Handler").Handler.PropsFromMethodName.Async;
//
//    }
//
//    export type WithEvt<T, CtxResult> =
//        import("./Handler").Handler.WithEvt<T, CtxResult>;
//
//
//}

import * as dom from "./lib.dom"; export { dom };

export * from "./Operator";

/*
import * as ns3 from "./Operator";

export type Operator<T, U, CtxResult = any> = ns3.Operator<T, U, CtxResult>;
export namespace Operator {

    export type fλ<T, U, CtxResult = any> = ns3.Operator.fλ<T, U, CtxResult>;

    export namespace fλ {

        export type Stateless<T, U, CtxResult = any> = ns3.Operator.fλ.Stateless<T, U, CtxResult>;
        export type Stateful<T, U, CtxResult = any> = ns3.Operator.fλ.Stateful<T,U,CtxResult>;
        export namespace Stateful {
            export const match = ns3.Operator.fλ.Stateful.match;
        }

        export type Result<U, CtxResult = any> = ns3.Operator.fλ.Result<U,CtxResult>;

        export namespace Result {
            export const match = ns3.Operator.fλ.Result.match;
            export const getDetachArg= ns3.Operator.fλ.Result.getDetachArg;
            export type NotMatched<CtxResult = any> = ns3.Operator.fλ.Result.NotMatched<CtxResult>;
            export namespace NotMatched {
                export const match = ns3.Operator.fλ.Result.NotMatched.match;
            }

            export type Matched<U, CtxResult= any> = ns3.Operator.fλ.Result.Matched<U, CtxResult>;

            export namespace Matched {

                export type NoDetachArg<U> = ns3.Operator.fλ.Result.Matched.NoDetachArg<U>;
                export type WithDetachArg<U, CtxResult = any> = ns3.Operator.fλ.Result.Matched.WithDetachArg<U, CtxResult>;
                export const match = ns3.Operator.fλ.Result.Matched.match;

            }

            export type Detach<CtxResult = any> = ns3.Operator.fλ.Result.Detach<CtxResult>;
            export namespace Detach {

                export type FromEvt = ns3.Operator.fλ.Result.Detach.FromEvt;

                export namespace FromEvt {
                    export const match = ns3.Operator.fλ.Result.Detach.FromEvt.match;
                }

                export type WithCtxArg<CtxResult = any> = ns3.Operator.fλ.Result.Detach.WithCtxArg<CtxResult>;

                export namespace WithCtxArg {


                    export type Void = ns3.Operator.fλ.Result.Detach.WithCtxArg.Void;
                    export type Arg<CtxResult> = ns3.Operator.fλ.Result.Detach.WithCtxArg.Arg<CtxResult>;
                    export const match = ns3.Operator.fλ.Result.Detach.WithCtxArg.match;

                }

                export const match = ns3.Operator.fλ.Result.Detach.match;

            }

        }

    }

    export type Stateless<T, U, CtxResult = any> = ns3.Operator.Stateless<T, U, CtxResult>;

}
*/
