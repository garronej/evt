import { Operator } from "../Operator";
declare type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;
declare type CtxLike<Result = any> = import("./CtxLike").CtxLike<Result>;
declare type StatefulEvt<T> = import("./StatefulEvt").StatefulEvt<T>;
declare type Evt<T> = import("./Evt").Evt<T>;
export declare type StateDiff<T> = {
    prevState: T;
    newState: T;
};
export interface StatefulReadonlyEvt<T> extends NonPostableEvt<T> {
    /** https://docs.evt.land/api/statefulevt#converting-an-evt-into-a-statefulevt */
    toStateless(ctx?: CtxLike): Evt<T>;
    readonly state: T;
    /** https://docs.evt.land/api/statefulevt#evtdiff */
    readonly evtDiff: NonPostableEvt<StateDiff<T>>;
    /** https://docs.evt.land/api/statefulevt#evtchange */
    readonly evtChange: StatefulReadonlyEvt<T>;
    /** https://docs.evt.land/api/statefulevt#evtchangediff */
    readonly evtChangeDiff: NonPostableEvt<StateDiff<T>>;
    /** https://docs.evt.land/api/statefulevt#statefulpipe */
    pipe(): StatefulEvt<T>;
    pipe<U, CtxResult>(op: Operator.fλ<T, U, CtxResult>): StatefulEvt<U>;
    pipe<U extends T>(op: (data: T) => data is U): StatefulEvt<U>;
    pipe(op: (data: T) => boolean): StatefulEvt<T>;
    pipe(ctx: CtxLike<any>): StatefulEvt<T>;
    pipe<U, CtxResult>(ctx: CtxLike<any>, op: Operator.fλ<T, U, CtxResult>): StatefulEvt<U>;
    pipe<U extends T>(ctx: CtxLike<any>, op: (data: T) => data is U): StatefulEvt<U>;
    pipe(ctx: CtxLike<any>, op: (data: T) => boolean): StatefulEvt<T>;
    pipe<B, C, CtxResultOp1, CtxResultOp2>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>): StatefulEvt<C>;
    pipe<B, C extends B, CtxResult>(op1: Operator.fλ<T, B, CtxResult>, op2: (data: B) => data is C): StatefulEvt<C>;
    pipe<B, CtxResult>(op1: Operator.fλ<T, B, CtxResult>, op2: (data: B) => boolean): StatefulEvt<B>;
    pipe<B extends T, C, CtxResult>(op1: (data: T) => data is B, op2: Operator.fλ<B, C, CtxResult>): StatefulEvt<B>;
    pipe<B, CtxResult>(op1: (data: T) => boolean, op2: Operator.fλ<T, B, CtxResult>): StatefulEvt<B>;
    pipe<B extends T, C extends B>(op1: (data: T) => data is B, op2: (data: B) => data is C): StatefulEvt<C>;
    pipe<B extends T>(op1: (data: T) => data is B, op2: (data: B) => boolean): StatefulEvt<B>;
    pipe<B extends T>(op1: (data: T) => boolean, op2: (data: T) => data is B): StatefulEvt<B>;
    pipe<T>(op1: (data: T) => boolean, op2: (data: T) => boolean): StatefulEvt<T>;
    pipe<B, C, D, CtxResultOp1, CtxResultOp2, CtxResultOp3>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>): StatefulEvt<D>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>): StatefulEvt<E>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>): StatefulEvt<E>;
    pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>, op5: Operator.fλ<E, F, CtxResultOp5>): StatefulEvt<F>;
    pipe<B, C, CtxResultOp1 = any, CtxResultOp2 = any>(op1: Operator<T, B, CtxResultOp2>, op2: Operator<B, C, CtxResultOp2>): StatefulEvt<C>;
    pipe<B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>): StatefulEvt<D>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>, op4: Operator<D, E, CtxResultOp4>): StatefulEvt<E>;
    pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>, op4: Operator<D, E, CtxResultOp4>, op5: Operator<E, F, CtxResultOp5>): StatefulEvt<F>;
    pipe(...ops: [Operator<T, any, any>, ...Operator<any, any, any>[]]): StatefulEvt<any>;
    pipe<T>(...ops: [Operator<T, any, any>, ...Operator<any, any, any>[]]): StatefulEvt<any>;
}
export {};
