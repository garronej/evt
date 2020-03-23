import { EvtCore } from "./EvtCore";
import { Handler } from "./types/Handler";
import { Operator } from "./types/Operator";
import { Ctx } from "./Ctx";
import { merge } from "./util/merge";
import { from } from "./util/from";
declare type VoidCtx = import("./Ctx").VoidCtx;
declare type CtxLike<Result> = import("./Ctx").CtxLike<Result>;
/** https://docs.evt.land/api/evt */
export declare class Evt<T> extends EvtCore<T> {
    /**
     * https://docs.evt.land/api/evt/newctx
     *
     * return a new Ctx instance
     * */
    static newCtx(): VoidCtx;
    static newCtx<T>(): Ctx<T>;
    /**
     * https://docs.evt.land/api/evt/getctx
     *
     * Evt.weakCtx(obj) always return the same instance of VoidCtx for a given object.
     * No strong reference to the object is created
     * when the object is no longer referenced it's associated Ctx will be freed from memory.
     */
    static readonly getCtx: (obj: object) => import("./Ctx").VoidCtx;
    /** https://docs.evt.land/api/evt/merge */
    static merge: typeof merge;
    /** https://docs.evt.land/api/evt/from */
    static from: typeof from;
    /** https://docs.evt.land/api/evt/getevtattachdetach */
    readonly getEvtAttach: () => Evt<Handler<T, any>>;
    /** https://docs.evt.land/api/evt/getevtattachdetach */
    readonly getEvtDetach: () => Evt<Handler<T, any>>;
    constructor();
    /** https://docs.evt.land/api/evt/post */
    postAsyncOnceHandled(data: T): number | Promise<number>;
    private __parseOverloadParams;
    /** https://docs.evt.land/api/evt/pipe */
    pipe(): Evt<T>;
    pipe<U, CtxResult>(op: Operator.fλ<T, U, CtxResult>): Evt<U>;
    pipe<U extends T>(op: (data: T) => data is U): Evt<U>;
    pipe(op: (data: T) => boolean): Evt<T>;
    pipe(ctx: CtxLike<any>): Evt<T>;
    pipe<U, CtxResult>(ctx: CtxLike<any>, op: Operator.fλ<T, U, CtxResult>): Evt<U>;
    pipe<U extends T>(ctx: CtxLike<any>, op: (data: T) => data is U): Evt<U>;
    pipe(ctx: CtxLike<any>, op: (data: T) => boolean): Evt<T>;
    pipe<B, C, CtxResultOp1, CtxResultOp2>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>): Evt<C>;
    pipe<B, C extends B, CtxResult>(op1: Operator.fλ<T, B, CtxResult>, op2: (data: B) => data is C): Evt<C>;
    pipe<B, CtxResult>(op1: Operator.fλ<T, B, CtxResult>, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T, C, CtxResult>(op1: (data: T) => data is B, op2: Operator.fλ<B, C, CtxResult>): Evt<B>;
    pipe<B, CtxResult>(op1: (data: T) => boolean, op2: Operator.fλ<T, B, CtxResult>): Evt<B>;
    pipe<B extends T, C extends B>(op1: (data: T) => data is B, op2: (data: B) => data is C): Evt<C>;
    pipe<B extends T>(op1: (data: T) => data is B, op2: (data: B) => boolean): Evt<B>;
    pipe<B extends T>(op1: (data: T) => boolean, op2: (data: T) => data is B): Evt<B>;
    pipe<T>(op1: (data: T) => boolean, op2: (data: T) => boolean): Evt<T>;
    pipe<B, C, D, CtxResultOp1, CtxResultOp2, CtxResultOp3>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>): Evt<D>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>): Evt<E>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>): Evt<E>;
    pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(op1: Operator.fλ<T, B, CtxResultOp1>, op2: Operator.fλ<B, C, CtxResultOp2>, op3: Operator.fλ<C, D, CtxResultOp3>, op4: Operator.fλ<D, E, CtxResultOp4>, op5: Operator.fλ<E, F, CtxResultOp5>): Evt<F>;
    pipe<B, C, CtxResultOp1 = any, CtxResultOp2 = any>(op1: Operator<T, B, CtxResultOp2>, op2: Operator<B, C, CtxResultOp2>): Evt<C>;
    pipe<B, C, D, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>): Evt<D>;
    pipe<B, C, D, E, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>, op4: Operator<D, E, CtxResultOp4>): Evt<E>;
    pipe<B, C, D, E, F, CtxResultOp1 = any, CtxResultOp2 = any, CtxResultOp3 = any, CtxResultOp4 = any, CtxResultOp5 = any>(op1: Operator<T, B, CtxResultOp1>, op2: Operator<B, C, CtxResultOp2>, op3: Operator<C, D, CtxResultOp3>, op4: Operator<D, E, CtxResultOp4>, op5: Operator<E, F, CtxResultOp5>): Evt<F>;
    pipe(...ops: [Operator<T, any, any>, ...Operator<any, any, any>[]]): Evt<any>;
    pipe<T>(...ops: [Operator<T, any, any>, ...Operator<any, any, any>[]]): Evt<any>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - fλ
     *
     * ctx
     *
     * timeout?
     */
    waitFor<U, CtxResult>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, timeout?: number): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout?
     */
    waitFor<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout?: number): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Filter
     *
     * ctx
     *
     * timeout?
     */
    waitFor(op: (data: T) => boolean, ctx: CtxLike<any>, timeout?: number): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - fλ
     *
     * timeout?
     */
    waitFor<U, CtxResult>(op: Operator.fλ.Stateless<T, U, CtxResult>, timeout?: number): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Type guard
     *
     * timeout?
     */
    waitFor<Q extends T>(op: (data: T) => data is Q, timeout?: number): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Filter
     *
     * timeout?
     */
    waitFor(op: (data: T) => boolean, timeout?: number): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * ctx
     *
     * timeout?
     */
    waitFor(ctx: CtxLike<any>, timeout?: number): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * timeout?
     */
    waitFor(timeout?: number): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attach<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attach<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attach<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attach<U, R>(op: Operator.fλ<T, U, R>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attach(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attach(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attach(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attach(ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attach(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * callback
     */
    attach(ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * timeout
     *
     * callback
     */
    attach(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * callback
     */
    attach(callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOnce<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOnce<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOnce(ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * callback
     */
    attachOnce(ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * timeout
     *
     * callback
     */
    attachOnce(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * callback
     */
    attachOnce(callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U, CtxResult>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachExtract<U, CtxResult>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<any>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachExtract<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachPrepend<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, ctx: CtxLike<any>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachPrepend<U, CtxResult = any>(op: Operator.fλ<T, U, CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachPrepend(ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * callback
     */
    attachPrepend(ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * timeout
     *
     * callback
     */
    attachPrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * callback
     */
    attachPrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOncePrepend<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOncePrepend<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * callback
     */
    attachOncePrepend(ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * timeout
     *
     * callback
     */
    attachOncePrepend(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * callback
     */
    attachOncePrepend(callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOnceExtract<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, ctx: CtxLike<any>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOnceExtract<U, CtxResult = any>(op: Operator.fλ.Stateless<T, U, CtxResult>, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, ctx: CtxLike<any>, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, timeout: number, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * timeout
     */
    attachOnceExtract(ctx: CtxLike<any>, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * ctx
     *
     * callback
     */
    attachOnceExtract(ctx: CtxLike<any>, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * timeout
     *
     * callback
     */
    attachOnceExtract(timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * callback
     */
    attachOnceExtract(callback: (data: T) => void): Promise<T>;
}
/** https://docs.evt.land/api/voidevt */
export declare class VoidEvt extends Evt<void> {
    post(): number;
    postAsyncOnceHandled(): Promise<number>;
}
export {};
