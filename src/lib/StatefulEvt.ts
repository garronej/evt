import "minimal-polyfills/Object.is";
import { defineAccessors } from "../tools/typeSafety/defineAccessors";
import { LazyEvt } from "./LazyEvt";
import { LazyStatefulEvt } from "./LazyStatefulEvt";
import { importProxy } from "./importProxy";
import { invokeOperator } from "./util/invokeOperator";
import { Operator } from "./types/Operator";
import { parsePropsFromArgs } from "./Evt.parsePropsFromArgs";
import type { CtxLike } from "./types/interfaces/CtxLike";
type Diff<T> = import("./types/interfaces").Diff<T>;
type NonPostableEvt<T> = import("./types/interfaces").NonPostableEvt<T>;
type StatefulReadonlyEvt<T> = import("./types/interfaces").StatefulReadonlyEvt<T>;
import { Evt } from "./Evt";

/** https://docs.evt.land/api/statefulevt */
export type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;

class StatefulEvtImpl<T> extends Evt<T> implements StatefulEvt<T> {

    __state: T;
    declare state: T;

    constructor(initialState: T) {
        super();
        this.__state = initialState;
        this.lazyEvtChange = new LazyStatefulEvt(this.__state);
    }

    private readonly lazyEvtDiff = new LazyEvt<Diff<T>>();
    declare public readonly evtDiff: NonPostableEvt<Diff<T>>;

    private readonly lazyEvtChange: LazyStatefulEvt<T>;
    declare public readonly evtChange: StatefulReadonlyEvt<T>;

    private readonly lazyEvtChangeDiff = new LazyEvt<Diff<T>>();
    declare public readonly evtChangeDiff: NonPostableEvt<Diff<T>>;

    private static __4: void = (() => {

        if (false) { StatefulEvtImpl.__4 }

        defineAccessors(
            StatefulEvtImpl.prototype,
            "state",
            {
                "get": function (this: StatefulEvtImpl<any>) { return this.__state; },
                "set": function (this: StatefulEvtImpl<any>, state) { this.post(state); }
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

        const opResult = invokeOperator(
            this.getStatelessOp(
                parsePropsFromArgs(args, "pipe").op
            ),
            this.state
        );

        if (Operator.fλ.Result.NotMatched.match(opResult)) {

            throw new Error([
                "Cannot pipe StatefulEvt because the operator does not match",
                "it's current state. You would end up with evt.state === undefined",
                "Use evt.toStateless([ctx]).pipe(op).toStatic(initialState)",
                "to be sure the StatefulEvt does not have an undefined state"
            ].join(" "));

        }

        return evt.toStateful(opResult[0]);

    }
    
    private anyAttach(
        args: any[],
        methodName: 
        "waitFor" | "$attach" | "attach" | "$attachOnce" | "attachOnce" |
        "$attachExtract" | "attachExtract" | "$attachPrepend" | "attachPrepend" |
        "$attachOncePrepend" | "attachOncePrepend" | "$attachOnceExtract" | "attachOnceExtract"
    ){

        //@ts-ignore
        const out = super[methodName](...args);

        const { op, callback } = parsePropsFromArgs(
            args, 
            methodName === "waitFor" ? "waitFor" : "attach*"
        );

        const opResult = invokeOperator(
            this.getStatelessOp(op),
            this.state
        );

        if (Operator.fλ.Result.Matched.match(opResult)) {

            callback?.(opResult[0]);

        }

        return out;


    }

    waitFor(...args: any[]) {
        return this.anyAttach(args, "waitFor");
    }

    $attach(...args: any[]) {
        return this.anyAttach(args, "$attach");
    }

    attach(...args: any[]) {
        return this.anyAttach(args, "attach");
    }

    $attachOnce(...args: any[]) {
        return this.anyAttach(args, "$attachOnce");
    }

    attachOnce(...args: any[]) {
        return this.anyAttach(args, "attachOnce");
    }

    $attachExtract(...args: any[]) {
        return this.anyAttach(args, "$attachExtract");
    }

    attachExtract(...args: any[]) {
        return this.anyAttach(args, "attachExtract");
    }

    $attachPrepend(...args: any[]) {
        return this.anyAttach(args, "$attachPrepend");
    }

    attachPrepend(...args: any[]) {
        return this.anyAttach(args, "attachPrepend");
    }

    $attachOncePrepend(...args: any[]) {
        return this.anyAttach(args, "$attachOncePrepend");
    }

    attachOncePrepend(...args: any[]) {
        return this.anyAttach(args, "attachOncePrepend");
    }

    $attachOnceExtract(...args: any[]) {
        return this.anyAttach(args, "$attachOnceExtract");
    }

    attachOnceExtract(...args: any[]) {
        return this.anyAttach(args, "attachOnceExtract");
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
