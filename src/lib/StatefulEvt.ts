import "../tools/polyfill/Object.is";
import { id } from "../tools/typeSafety/id";
import { defineAccessors } from "../tools/defineAccessors";
import { LazyEvt } from "./LazyEvt";
import { importProxy } from "./importProxy";
import { invokeOperator } from "./util/invokeOperator";
import { Operator } from "./types/Operator";
import { parsePropsFromArgs } from "./Evt.parsePropsFromArgs";
type Diff<T> = import("./types/interfaces").Diff<T>;
type NonPostableEvt<T> = import("./types/interfaces").NonPostableEvt<T>;
import { Evt } from "./Evt";

export type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;

class StatefulEvtImpl<T> extends Evt<T> implements StatefulEvt<T> {

    __state: T;
    declare state: T;

    constructor(initialState: T) {
        super();
        this.__state = initialState;
    }

    private readonly lazyEvtDiff = new LazyEvt<Diff<T>>();
    declare public readonly evtDiff: NonPostableEvt<Diff<T>>;

    private readonly lazyEvtChange = new LazyEvt<T>();
    declare public readonly evtChange: NonPostableEvt<T>;

    private readonly lazyEvtChangeDiff = new LazyEvt<Diff<T>>();
    declare public readonly evtChangeDiff: NonPostableEvt<Diff<T>>;

    private static __4: void = (() => {

        if (false) { StatefulEvtImpl.__4 }

        defineAccessors(
            StatefulEvtImpl.prototype,
            "state",
            {
                "get": function () { return id<StatefulEvtImpl<any>>(this).__state; },
                "set": function (state) { id<StatefulEvtImpl<any>>(this).post(state); }
            }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtDiff",
            { "get": function () { return id<StatefulEvtImpl<any>>(this).lazyEvtDiff.evt; } }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtChange",
            { "get": function () { return id<StatefulEvtImpl<any>>(this).lazyEvtChange.evt; } }
        );

        defineAccessors(
            StatefulEvtImpl.prototype,
            "evtChangeDiff",
            { "get": function () { return id<StatefulEvtImpl<any>>(this).lazyEvtChangeDiff.evt; } }
        );

    })();

    post(data: T): number {
        return this.__post(data, false);
    }

    postForceChange(wData?: readonly [T]): number {
        return this.__post( !!wData ? wData[0] : this.state, true);
    }

    private __post(data: T, forceChange: boolean): number {

        const prevState = this.state;

        this.__state = data;

        const diff = { prevState, "newState": this.state };

        this.lazyEvtDiff.post(diff);

        if (forceChange || !Object.is(prevState, this.state)) {
            this.lazyEvtChange.post(this.state);
            this.lazyEvtChangeDiff.post(diff);
        }

        return super.post(data);

    }


    statefulPipe(...args: any[]): StatefulEvt<any> {

        const evt = this
            .pipe(...(args as Parameters<typeof StatefulEvtImpl.prototype.pipe>))
            ;

        const opResult = invokeOperator(
            this.getStatelessOp(
                parsePropsFromArgs(args, "pipe").op
            ),
            this.state
        );

        if (Operator.fλ.Result.NotMatched.match(opResult)) {

            throw new Error([
                "Operator do not match current state",
                "use evt.pipe([ctx], op).toStatic(initialState)",
                "to be sure the StatefulEvt is correctly initialized"
            ].join(" "));

        }

        return evt.toStateful(opResult[0]);

    }

}

/** https://docs.evt.land/api/statefulevt */
export const StatefulEvt: {
    new <T>(initialState: T): StatefulEvt<T>;
    readonly prototype: StatefulEvt<any>;
} = StatefulEvtImpl;

importProxy.StatefulEvt = StatefulEvt;
