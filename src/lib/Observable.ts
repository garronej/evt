
import { Evt } from "./Evt";
import { overwriteReadonlyProp } from "../tools/overwriteReadonlyProp";
import /*type*/ { NonPostable } from "./types/helper/NonPostable";
import { importProxy } from "./importProxy";
import { from } from "./util/observableFrom";
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
    public static readonly from = from;

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
            inDepth.copy(val, { "freeze": true })
        );
    }

    constructor(
        initialValue: T,
        private readonly same: (currentValue: T, newValue: T) => boolean = inDepth.same
    ) {

        {

            const evtChangeDiff: Evt<IObservable.Diff<T>> = new Evt();

            this.evtChangeDiff_post = changeDiff => evtChangeDiff.post(changeDiff);

            this.evt = evtChangeDiff.pipe(({ currVal }) => [currVal]);

            this.evtDiff = evtChangeDiff;

        }

        this.setVal(initialValue);


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

}

importProxy.Observable = Observable;
