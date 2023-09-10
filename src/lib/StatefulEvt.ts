// @denoify-line-ignore
import "minimal-polyfills/Object.is";
import { LazyEvt } from "./LazyEvt";
import { LazyStatefulEvt } from "./LazyStatefulEvt";
import { importProxy } from "./importProxy";
import { Evt, onAddHandlerByEvt } from "./Evt";
import type { CtxLike, StateDiff, NonPostableEvt, StatefulReadonlyEvt } from "./types";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";

/** https://docs.evt.land/api/statefulevt */
export type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;

const runSideEffect = (sideEffect: ()=> void) => sideEffect();

class StatefulEvtImpl<T> extends Evt<T> implements StatefulEvt<T> {

    __state: T;
    get state(): T { return this.__state; }
    set state(value: T) {
        if (this.state === value) return; 
        this.post(value);
    }

    constructor(initialState: T) {
        super();
        this.__state = initialState;
        this.lazyEvtChange = new LazyStatefulEvt(this.__state);

        onAddHandlerByEvt.set(
            this,
            (handler, handlerTrigger) => {

                if( handler.extract ){
                    return;
                }

                let sideEffect= id<(()=> void) | undefined>(undefined);


                const opResult = this.getInvocableOp(handler.op)(
                    this.__state,
                    this.setOpResultForPipe !== undefined ? (sideEffect_=>sideEffect =sideEffect_) : runSideEffect
                );

                if( this.setOpResultForPipe !== undefined ){
                    this.setOpResultForPipe(opResult);
                    if( sideEffect !== undefined ){
                        sideEffect();
                    }
                }

                if (!opResult) {
                    return;
                }

                handlerTrigger(opResult);

            }
        );
    }

    private readonly lazyEvtDiff = new LazyEvt<StateDiff<T>>();
    get evtDiff(): NonPostableEvt<StateDiff<T>> { return this.lazyEvtDiff.evt; }

    private readonly lazyEvtChange: LazyStatefulEvt<T>;
    get evtChange(): StatefulReadonlyEvt<T> { return this.lazyEvtChange.evt; }

    private readonly lazyEvtChangeDiff = new LazyEvt<StateDiff<T>>();
    get evtChangeDiff(): NonPostableEvt<StateDiff<T>> { return this.lazyEvtChangeDiff.evt; }

    post(data: T): number {
        return this.__post(data, false, false);
    }

    postForceChange(wData?: readonly [T]): number {
        return this.__post(!!wData ? wData[0] : this.state, true, false);
    }

    postAndWait(data: T) {
        return this.__post(data, false, true);
    }

    private __post(data: T, forceChange: boolean, doWait: false): number;
    private __post(data: T, forceChange: boolean, doWait: true): Promise<void>;
    private __post(data: T, forceChange: boolean, doWait: boolean): number | Promise<void> {

        const prevState = this.state;

        this.__state = data;

        const diff = { prevState, "newState": this.state };

        const postVariantName = doWait ? "postAndWait" : "post";

        const prs: Promise<void>[] = [];

        const r1 = this.lazyEvtDiff[postVariantName](diff);

        if (doWait) {
            prs.push(r1 as any);
        }

        if (forceChange || !Object.is(prevState, this.state)) {
            const r2 = this.lazyEvtChange[postVariantName](this.state);
            const r3 = this.lazyEvtChangeDiff[postVariantName](diff);

            if (doWait) {
                prs.push(r2 as any, r3 as any);
            }

        }

        const r4 = super[postVariantName](data);

        return doWait ?
            (prs.push(r4 as any), Promise.all(prs).then(() => { })) :
            r4;

    }

    private setOpResultForPipe: ((opResult: readonly [any] | null) => void) | undefined;

    pipe(...args: any[]): StatefulEvt<any> {

        let opResult: readonly [any] | null | undefined = undefined;

        this.setOpResultForPipe = opResult_ => opResult = opResult_;

        const evt = super
            .pipe(...(args as Parameters<typeof importProxy.Evt.prototype.pipe>))
            ;

        assert(opResult !== undefined);

        this.setOpResultForPipe = undefined;

        if (!opResult) {

            throw new Error([
                "Cannot pipe StatefulEvt because the operator does not match",
                "it's current state. You would end up with evt.state === undefined",
                "Use evt.toStateless([ctx]).pipe(op).toStatic(initialState)",
                "to be sure the StatefulEvt does not have an undefined state"
            ].join(" "));

        }

        return evt.toStateful(opResult[0]);

    }

    toStateless(ctx?: CtxLike): Evt<any> {

        const onAddHandler=  onAddHandlerByEvt.get(this)!;

        onAddHandlerByEvt.delete(this);

        const out= !!ctx ? super.pipe(ctx) : super.pipe();

        onAddHandlerByEvt.set(this, onAddHandler);

        return out;
    }

}

export const StatefulEvt: {
    new <T>(initialState: T): StatefulEvt<T>;
    readonly prototype: StatefulEvt<any>;
} = StatefulEvtImpl;

importProxy.StatefulEvt = StatefulEvt;

