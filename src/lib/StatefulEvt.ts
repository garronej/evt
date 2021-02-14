import "minimal-polyfills/Object.is";
import { defineAccessors } from "../tools/typeSafety/defineAccessors";
import { LazyEvt } from "./LazyEvt";
import { LazyStatefulEvt } from "./LazyStatefulEvt";
import { importProxy } from "./importProxy";
import { parsePropsFromArgs } from "./Evt.parsePropsFromArgs";
import { Evt, onAddHandlerByEvt } from "./Evt";
import type { CtxLike, StateDiff, NonPostableEvt, StatefulReadonlyEvt } from "./types";

/** https://docs.evt.land/api/statefulevt */
export type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;

const runSideEffect = (sideEffect: ()=> void) => sideEffect();

class StatefulEvtImpl<T> extends Evt<T> implements StatefulEvt<T> {

    __state: T;
    declare state: T;

    constructor(initialState: T) {
        super();
        this.__state = initialState;
        this.lazyEvtChange = new LazyStatefulEvt(this.__state);

        onAddHandlerByEvt.set(
            this,
            (handler, handlerTrigger) => {

                const opResult = this.getInvocableOp(handler.op)(
                    this.__state,
                    undefined,
                    runSideEffect
                );

                if( !opResult ){
                    return;
                }

                handlerTrigger(opResult);

            }
        );
    }

    private readonly lazyEvtDiff = new LazyEvt<StateDiff<T>>();
    declare public readonly evtDiff: NonPostableEvt<StateDiff<T>>;

    private readonly lazyEvtChange: LazyStatefulEvt<T>;
    declare public readonly evtChange: StatefulReadonlyEvt<T>;

    private readonly lazyEvtChangeDiff = new LazyEvt<StateDiff<T>>();
    declare public readonly evtChangeDiff: NonPostableEvt<StateDiff<T>>;

    private static __4: void = (() => {

        if (false) { StatefulEvtImpl.__4 }

        defineAccessors(
            StatefulEvtImpl.prototype,
            "state",
            {
                "get": function (this: StatefulEvtImpl<any>) { return this.__state; },
                "set": function (this: StatefulEvtImpl<any>, state) { 
                    if( this.state === state ){
                        return;
                    }
                    this.post(state); 
                }
            }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtDiff",
            { "get": function (this: StatefulEvtImpl<any>) { return this.lazyEvtDiff.evt; } }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtChange",
            { "get": function (this: StatefulEvtImpl<any>) { return this.lazyEvtChange.evt; } }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtChangeDiff",
            { "get": function (this: StatefulEvtImpl<any>) { return this.lazyEvtChangeDiff.evt; } }
        );

    })();

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

    pipe(...args: any[]): StatefulEvt<any> {

        const evt = super
            .pipe(...(args as Parameters<typeof importProxy.Evt.prototype.pipe>))
            ;

        const opResult = this.getInvocableOp(parsePropsFromArgs(args, "pipe").op)(
            this.__state, 
            undefined, 
            runSideEffect
        );

        if( !opResult  ){

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
        return !!ctx ? super.pipe(ctx) : super.pipe();
    }

}

export const StatefulEvt: {
    new <T>(initialState: T): StatefulEvt<T>;
    readonly prototype: StatefulEvt<any>;
} = StatefulEvtImpl;

importProxy.StatefulEvt = StatefulEvt;

