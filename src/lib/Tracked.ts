
import "../tools/polyfill/Object.is";
import { Evt } from "./Evt";
import /*type*/ { NonPostable } from "./types/helper/NonPostable";
import { from } from "./util/Tracked.from";
import { importProxy } from "./importProxy";


export interface Trackable<T> {
    readonly val: T;
    evt: NonPostable<Evt<T>>;
    evtDiff: NonPostable<Evt<Trackable.Diff<T>>>;
}

export namespace Trackable {

    export type Diff<T> = {
        prevVal: T;
        newVal: T;
    }

}


export class Tracked<T> implements Trackable<T> {

    public static from = from;

    private _val: T;

    public get val(): T {
        return this._val;
    }

    public set val(newVal: T) {

        if (Object.is(this._val, newVal)) {
            return;
        }

        this._setValAndPost(newVal);

    }

    public forceUpdate(newVal: T): void {
        this._setValAndPost(newVal);
    }

    private _setValAndPost(newVal: T) {

        const prevVal = this._val;

        this._val = newVal;

        this._postEvtChangeDiff({ prevVal, newVal });

    }

    public readonly evtDiff: Trackable<T>["evtDiff"];
    public readonly evt: Trackable<T>["evt"];
    private readonly _postEvtChangeDiff: (data: Trackable.Diff<T>) => void;

    constructor(val: T) {

        {

            const evtChangeDiff: Evt<Trackable.Diff<T>> = new Evt();

            this._postEvtChangeDiff = changeDiff => evtChangeDiff.post(changeDiff);

            this.evt = evtChangeDiff.pipe(({ newVal }) => [newVal]);

            this.evtDiff = evtChangeDiff;

        }

        this._val = val;


    }

}

importProxy.Tracked = Tracked;


