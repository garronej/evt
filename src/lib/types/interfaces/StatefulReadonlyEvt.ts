
import /*type*/ { Operator } from "../Operator";

type NonPostableEvt<T> = import("./NonPostableEvt").NonPostableEvt<T>;
type CtxLike<Result = any> = import("./CtxLike").CtxLike<Result>;
type StatefulEvt<T> = import("./StatefulEvt").StatefulEvt<T>;

export type StateDiff<T> = { prevState: T, newState: T };

export interface StatefulReadonlyEvt<T> extends NonPostableEvt<T> {

    readonly state: T;

    /** https://docs.evt.land/api/statefulevt#evtdiff */
    readonly evtDiff: NonPostableEvt<StateDiff<T>>;

    /** https://docs.evt.land/api/statefulevt#evtchange */
    readonly evtChange: NonPostableEvt<T>;


    /** https://docs.evt.land/api/statefulevt#evtchangediff */
    readonly evtChangeDiff: NonPostableEvt<StateDiff<T>>;

    /** https://docs.evt.land/api/statefulevt#statefulpipe */
    statefulPipe(): StatefulEvt<T>;

    statefulPipe<U, CtxResult>(
        op: Operator.fλ<T, U, CtxResult>
    ): StatefulEvt<U>;
    statefulPipe<U extends T>(
        op: (data: T) => data is U
    ): StatefulEvt<U>;
    statefulPipe(
        op: (data: T) => boolean
    ): StatefulEvt<T>;

    statefulPipe(ctx: CtxLike<any>): StatefulEvt<T>;

    statefulPipe<U, CtxResult>(
        ctx: CtxLike<any>,
        op: Operator.fλ<T, U, CtxResult>
    ): StatefulEvt<U>;
    statefulPipe<U extends T>(
        ctx: CtxLike<any>,
        op: (data: T) => data is U
    ): StatefulEvt<U>;
    statefulPipe(
        ctx: CtxLike<any>,
        op: (data: T) => boolean
    ): StatefulEvt<T>;

    statefulPipe<B, C, CtxResultOp1, CtxResultOp2>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>
    ): StatefulEvt<C>;
    statefulPipe<B, C extends B, CtxResult>(
        op1: Operator.fλ<T, B, CtxResult>,
        op2: (data: B) => data is C
    ): StatefulEvt<C>;
    statefulPipe<B, CtxResult>(
        op1: Operator.fλ<T, B, CtxResult>,
        op2: (data: B) => boolean
    ): StatefulEvt<B>;
    statefulPipe<B extends T, C, CtxResult>(
        op1: (data: T) => data is B,
        op2: Operator.fλ<B, C, CtxResult>
    ): StatefulEvt<B>;
    statefulPipe<B, CtxResult>(
        op1: (data: T) => boolean,
        op2: Operator.fλ<T, B, CtxResult>
    ): StatefulEvt<B>;
    statefulPipe<B extends T, C extends B>(
        op1: (data: T) => data is B,
        op2: (data: B) => data is C
    ): StatefulEvt<C>;
    statefulPipe<B extends T>(
        op1: (data: T) => data is B,
        op2: (data: B) => boolean
    ): StatefulEvt<B>;
    statefulPipe<B extends T>(
        op1: (data: T) => boolean,
        op2: (data: T) => data is B
    ): StatefulEvt<B>;
    statefulPipe<T>(
        op1: (data: T) => boolean,
        op2: (data: T) => boolean
    ): StatefulEvt<T>;


    statefulPipe<B, C, D, CtxResultOp1, CtxResultOp2, CtxResultOp3>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>
    ): StatefulEvt<D>;

    statefulPipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>
    ): StatefulEvt<E>;

    statefulPipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>
    ): StatefulEvt<E>;

    statefulPipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
        op1: Operator.fλ<T, B, CtxResultOp1>,
        op2: Operator.fλ<B, C, CtxResultOp2>,
        op3: Operator.fλ<C, D, CtxResultOp3>,
        op4: Operator.fλ<D, E, CtxResultOp4>,
        op5: Operator.fλ<E, F, CtxResultOp5>
    ): StatefulEvt<F>;


    statefulPipe<B, C, CtxResultOp1 = any, CtxResultOp2 = any>(
        op1: Operator<T, B, CtxResultOp2>,
        op2: Operator<B, C, CtxResultOp2>
    ): StatefulEvt<C>;

    statefulPipe<B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>
    ): StatefulEvt<D>;

    statefulPipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>,
        op4: Operator<D, E, CtxResultOp4>
    ): StatefulEvt<E>;

    statefulPipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(
        op1: Operator<T, B, CtxResultOp1>,
        op2: Operator<B, C, CtxResultOp2>,
        op3: Operator<C, D, CtxResultOp3>,
        op4: Operator<D, E, CtxResultOp4>,
        op5: Operator<E, F, CtxResultOp5>
    ): StatefulEvt<F>;

    statefulPipe(
        ...ops: [
            Operator<T, any, any>,
            ...Operator<any, any, any>[]
        ]
    ): StatefulEvt<any>;

    statefulPipe<T>(
        ...ops: [
            Operator<T, any, any>,
            ...Operator<any, any, any>[]
        ]
    ): StatefulEvt<any>;

}

