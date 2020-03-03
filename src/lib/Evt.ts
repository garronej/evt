import { EvtOverloaded } from "./EvtOverloaded";
import { Handler, Operator } from "./types";
import { Ref } from "./Ref";
import { invokeOperator } from "./util/invokeOperator";

export class Evt<T> extends EvtOverloaded<T> {

    public static newRef() { return new Ref(); }

    /** https://garronej.github.io/ts-evt/#evtevtattach */
    public readonly evtAttach = new EvtOverloaded<Handler<T, any>>()

    protected onHandlerAdded(handler: Handler<T, any>) {
        super.onHandlerDetached(handler);
        this.evtAttach.post(handler);
    }

    public readonly evtDetach = new EvtOverloaded<Handler<T, any>>()

    protected onHandlerDetached(handler: Handler<T, any>) {
        super.onHandlerDetached(handler);
        this.evtDetach.post(handler);
    }

    public async postAsyncOnceHandled(data: T) {
        return this.__postOnceHandled({ data, "isSync": false });
    }

    public async postSyncOnceHandled(data: T) {
        return this.__postOnceHandled({ data, "isSync": true });
    }

    private __postOnceHandled(
        { data, isSync }: { data: T; isSync: boolean; }
    ): number | Promise<number> {

        if (this.isHandled(data)) {
            return this.post(data);
        }


        let resolvePr: (postCount: number) => void;
        const pr = new Promise<number>(resolve => resolvePr = resolve);

        const resolvePrAndPost = (data: T) => resolvePr(this.post(data));

        this.evtAttach.attachOnce(
            ({ op }) => !!invokeOperator(this.getStatelessOp(op), data),
            () => isSync ?
                resolvePrAndPost(data) :
                Promise.resolve().then(() => resolvePrAndPost(data))
        );

        return pr;


    }

    public pipe(): Evt<T>;

    public pipe<U>(
        op: Operator.fλ<T,U>
    ): Evt<U>;
    public pipe<U extends T>(
        op: (data: T)=> data is U
    ): Evt<U>;
    public pipe(
        op: (data: T)=> boolean
    ): Evt<T>;

    public pipe(ref: Ref): Evt<T>;

    public pipe<U>(
        ref: Ref,
        op: Operator.fλ<T,U>
    ): Evt<U>;
    public pipe<U extends T>(
        ref: Ref,
        op: (data: T)=> data is U
    ): Evt<U>;
    public pipe(
        ref: Ref,
        op: (data: T)=> boolean
    ): Evt<T>;

    public pipe<B, C>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>
    ): Evt<C>;
    public pipe<B, C extends B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => data is C,
    ): Evt<C>;
    public pipe<B>(
        op1: Operator.fλ<T, B>,
        op2: (data: B) => boolean,
    ): Evt<B>;
    public pipe<B extends T, C>(
        op1: (data: T) => data is B,
        op2: Operator.fλ<B, C>
    ): Evt<B>;
    public pipe<B>(
        op1: (data: T) => boolean,
        op2: Operator.fλ<T, B>
    ): Evt<B>;
    public pipe<B extends T, C extends B>(
        op1: (data: T) => data is B,
        op2: (data: B) => data is C,
    ): Evt<C>;
    public pipe<B extends T>(
        op1: (data: T) => data is B,
        op2: (data: B) => boolean,
    ): Evt<B>;
    public pipe<B extends T>(
        op1: (data: T) => boolean,
        op2: (data: T) => data is B
    ): Evt<B>;
    public pipe<T>(
        op1: (data: T) => boolean,
        op2: (data: T) => boolean,
    ): Evt<T>;


    public pipe<B, C, D>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>
    ): Evt<D>;

    public pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    public pipe<B, C, D, E>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>
    ): Evt<E>;

    public pipe<B, C, D, E, F>(
        op1: Operator.fλ<T, B>,
        op2: Operator.fλ<B, C>,
        op3: Operator.fλ<C, D>,
        op4: Operator.fλ<D, E>,
        op5: Operator.fλ<E, F>,
    ): Evt<F>;


    public pipe<B, C>(
        op1: Operator<T, B>,
        op2: Operator<B, C>
    ): Evt<C>;

    public pipe<B, C, D>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>
    ): Evt<D>;

    public pipe<B, C, D, E>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>,
    ): Evt<E>;

    public pipe<B, C, D, E, F>(
        op1: Operator<T, B>,
        op2: Operator<B, C>,
        op3: Operator<C, D>,
        op4: Operator<D, E>,
        op5: Operator<E, F>
    ): Evt<F>;

    public pipe(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    public pipe<T>(
        ...ops: [
            Operator<T, any>,
            ...Operator<any, any>[]
        ]
    ): Evt<any>;

    public pipe(...inputs: any[]): Evt<any> {

        const evtDelegate = new Evt<any>();
        this.__attach(
            {
                ...this.parseOverloadParams(inputs, "pipe"),
                "callback": (transformedData: any) => evtDelegate.post(transformedData)
            }
        );

        return evtDelegate;

    }


}

/** https://garronej.github.io/ts-evt/#voidevt */
export class VoidEvt extends Evt<void> {

    public post(): number {
        return super.post(undefined);
    }

    public async postAsyncOnceHandled() {
        return super.postAsyncOnceHandled(undefined);
    }

    public async postSyncOnceHandled() {
        return super.postSyncOnceHandled(undefined);
    }

}
