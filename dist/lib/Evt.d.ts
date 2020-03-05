import { EvtOverloaded } from "./EvtOverloaded";
import { Handler, Operator } from "./types";
import { Ctx } from "./Ctx";
import { merge } from "./util/merge";
import { fromEvent } from "./util/fromEvent";
export declare class Evt<T> extends EvtOverloaded<T> {
    static newCtx(): Ctx;
    static merge: typeof merge;
    static fromEvent: typeof fromEvent;
    /** https://garronej.github.io/ts-evt/#evtevtattach */
    readonly evtAttach: EvtOverloaded<Handler<T, any, import("./types").Bindable>>;
    protected onHandlerAdded(handler: Handler<T, any>): void;
    readonly evtDetach: EvtOverloaded<Handler<T, any, import("./types").Bindable>>;
    protected onHandlerDetached(handler: Handler<T, any>): void;
    postAsyncOnceHandled(data: T): Promise<number>;
    postSyncOnceHandled(data: T): Promise<number>;
    private __postOnceHandled;
    pipe(): Evt<T>;
    pipe<U>(op: Operator.fλ<T, U>): Evt<U>;
    pipe<U extends T>(op: (data: T) => data is U): Evt<U>;
    pipe(op: (data: T) => boolean): Evt<T>;
    pipe(ctx: Ctx): Evt<T>;
    pipe<U>(ctx: Ctx, op: Operator.fλ<T, U>): Evt<U>;
    pipe<U extends T>(ctx: Ctx, op: (data: T) => data is U): Evt<U>;
    pipe(ctx: Ctx, op: (data: T) => boolean): Evt<T>;
    pipe<B, C>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>): Evt<C>;
    pipe<B, C extends B>(op1: Operator.fλ<T, B>, op2: (data: B) => data is C): Evt<C>;
    pipe<B>(op1: Operator.fλ<T, B>, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T, C>(op1: (data: T) => data is B, op2: Operator.fλ<B, C>): Evt<B>;
    pipe<B>(op1: (data: T) => boolean, op2: Operator.fλ<T, B>): Evt<B>;
    pipe<B extends T, C extends B>(op1: (data: T) => data is B, op2: (data: B) => data is C): Evt<C>;
    pipe<B extends T>(op1: (data: T) => data is B, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T>(op1: (data: T) => boolean, op2: (data: T) => data is B): Evt<B>;
    pipe<T>(op1: (data: T) => boolean, op2: (data: T) => boolean): Evt<T>;
    pipe<B, C, D>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>): Evt<D>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Evt<E>;
    pipe<B, C, D, E>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>): Evt<E>;
    pipe<B, C, D, E, F>(op1: Operator.fλ<T, B>, op2: Operator.fλ<B, C>, op3: Operator.fλ<C, D>, op4: Operator.fλ<D, E>, op5: Operator.fλ<E, F>): Evt<F>;
    pipe<B, C>(op1: Operator<T, B>, op2: Operator<B, C>): Evt<C>;
    pipe<B, C, D>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>): Evt<D>;
    pipe<B, C, D, E>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>): Evt<E>;
    pipe<B, C, D, E, F>(op1: Operator<T, B>, op2: Operator<B, C>, op3: Operator<C, D>, op4: Operator<D, E>, op5: Operator<E, F>): Evt<F>;
    pipe(...ops: [Operator<T, any>, ...Operator<any, any>[]]): Evt<any>;
    pipe<T>(...ops: [Operator<T, any>, ...Operator<any, any>[]]): Evt<any>;
}
/** https://garronej.github.io/ts-evt/#voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
    postSyncOnceHandled(): Promise<number>;
}
