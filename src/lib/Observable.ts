
import { Evt } from "./Evt";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import /*type*/ { NonPostable } from "./types/helper/NonPostable";
import { importProxy } from "./importProxy";
import * as staticFrom from "./util/observableFrom";
import "../tools/polyfill/Object.is";
import * as inDepth from "../tools/inDepth";

/** 
 * https://docs.evt.land/api/observable
 * 
 * Interface to be exposed to users that should 
 * have read only access on the observable 
 * */
export interface IObservable<T> {
    readonly val: T;
    /** when value changed post the new value */
    readonly evt: NonPostable<Evt<T>>;
    /** when value changed post the new value and the value it previously replaced */
    readonly evtDiff: NonPostable<Evt<IObservable.Diff<T>>>;
};

export namespace IObservable {
    export type Diff<T> = {
        currVal: T;
        prevVal: T;
    }
}


/** https://docs.evt.land/api/observable */
export class Observable<T> implements IObservable<T> {

    /*** https://docs.evt.land/api/observable#observable-from */
    public static readonly from = staticFrom.from;

    private readonly evtChangeDiff_post: (data: IObservable.Diff<T>) => void;

    public readonly evtDiff: IObservable<T>["evtDiff"];
    public readonly evt: IObservable<T>["evt"];

    //NOTE: Not really readonly but we want to prevent user from setting the value
    //manually and we cant user accessor because we target es3.
    public readonly val!: T;

    private setVal(val: T): T {
        return overwriteReadonlyProp(
            this,
            "val",
            this.copy ? this.copy(val) : val
        );
    }

    constructor(
        val: T,
        public readonly same: (val1: T, val2: T) => boolean = Object.is,
        public readonly copy?: (val: T) => T
    ) {

        {

            const evtChangeDiff: Evt<IObservable.Diff<T>> = new Evt();

            this.evtChangeDiff_post = changeDiff => evtChangeDiff.post(changeDiff);

            this.evt = evtChangeDiff.pipe(({ currVal }) => [currVal]);

            this.evtDiff = evtChangeDiff;

        }

        this.setVal(val);


    }

    /** Return true if the value have been changed */
    public update(val: T): boolean {

        if (this.same(this.val, val)) {
            return false;
        }

        const prevVal = this.val;

        this.evtChangeDiff_post({ prevVal, "currVal": this.setVal(val) });

        return true;

    }


    public forceUpdate(valWrap?: [T]): void {


        if (valWrap === undefined) {

            this.evtChangeDiff_post({
                "prevVal": this.val,
                "currVal": this.val
            });

        } else {

            const [val] = valWrap;

            if (this.same(this.val, val)) {
                this.forceUpdate();
                return;
            }

            this.update(val);

        }

    }

}

importProxy.Observable = Observable;

export class ObservableInDepth<T> extends Observable<T> {

    /*** https://docs.evt.land/api/observable#observable-from */
    public static readonly from = staticFrom.inDepth.from;

    constructor(
        val: T,
        same?: (val1: T, val2: T) => boolean
    ) {
        super(val, same ?? inDepth.same, inDepth.copy);
    }

}

importProxy.ObservableInDepth = ObservableInDepth;
