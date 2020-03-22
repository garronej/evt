import { EvtCore } from "./EvtCore";
import { Handler } from "./types/Handler";
import { Operator } from "./types/Operator";
import { Ctx } from "./Ctx";
import { merge } from "./util/merge";
import { from } from "./util/from";
declare type VoidCtx = import("./Ctx").VoidCtx;
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
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - fλ
     *
     * ctx
     *
     * timeout?
     */
    waitFor<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, timeout?: number): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Type guard
     *
     * ctx
     *
     * timeout?
     */
    waitFor<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout?: number): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - Filter
     *
     * ctx
     *
     * timeout?
     */
    waitFor(op: (data: T) => boolean, ctx: Ctx, timeout?: number): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/waitfor
     *
     * op - fλ
     *
     * timeout?
     */
    waitFor<U>(op: Operator.fλ.Stateless<T, U>, timeout?: number): Promise<U>;
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
    waitFor(ctx: Ctx, timeout?: number): Promise<T>;
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
    $attach<U>(op: Operator.fλ<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attach<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attach<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attach(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attach<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attach(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    attach(ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
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
    attach(ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOnce<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attachOnce<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attachOnce(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOnce<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOnce(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    attachOnce(ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
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
    attachOnce(ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    $attachExtract<U>(op: Operator.fλ<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachExtract<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attachExtract<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attachExtract(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachExtract<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachExtract(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    $attachPrepend<U>(op: Operator.fλ<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachPrepend<U>(op: Operator.fλ<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attachPrepend<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attachPrepend(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachPrepend<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachPrepend(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    attachPrepend(ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
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
    attachPrepend(ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOncePrepend<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attachOncePrepend(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOncePrepend<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOncePrepend(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    attachOncePrepend(ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
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
    attachOncePrepend(ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * ctx
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, ctx: Ctx, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * timeout
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, timeout: number, callback: (transformedData: U) => void): Promise<U>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - fλ
     *
     * callback
     */
    $attachOnceExtract<U>(op: Operator.fλ.Stateless<T, U>, callback: (transformedData: U) => void): Promise<U>;
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
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, timeout: number, callback: (data: Q) => void): Promise<Q>;
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
    attachOnceExtract(op: (data: T) => boolean, ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Type guard
     *
     * ctx
     *
     * callback
     */
    attachOnceExtract<Q extends T>(op: (data: T) => data is Q, ctx: Ctx, callback: (data: Q) => void): Promise<Q>;
    /**
     * https://docs.evt.land/api/evt/attach
     *
     * op - Filter
     *
     * ctx
     *
     * callback
     */
    attachOnceExtract(op: (data: T) => boolean, ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
    attachOnceExtract(ctx: Ctx, timeout: number, callback: (data: T) => void): Promise<T>;
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
    attachOnceExtract(ctx: Ctx, callback: (data: T) => void): Promise<T>;
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
export {};
