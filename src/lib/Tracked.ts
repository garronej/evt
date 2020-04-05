
import "../tools/polyfill/Object.is";
import { Evt } from "./Evt";
import /*type*/ { NonPostable } from "./types/helper/NonPostable";
import { from } from "./Tracked.from";
import { importProxy } from "./importProxy";
import { defineAccessors } from "../tools/defineAccessors";
import { id  } from "../tools/typeSafety/id";


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

/** https://docs.evt.land/api/tracked */
export class Tracked<T> implements Trackable<T> {

    /** https://docs.evt.land/api/tracked#tracked-from */
    public static from = from;

    private __val: T;
    declare public val: T;

    private static __1: void = (() => {

        if(false){ Tracked.__1; }

        defineAccessors(Tracked.prototype, "val", {
            "get": function () { return id<Tracked<any>>(this).__val; },
            "set": function (newVal: any) {

                const self: Tracked<any>= this;

                if (Object.is(self.__val, newVal)) {
                    return;
                }

                self.__setValAndPost(newVal);

            }
        });


    })();


    public forceUpdate(newVal: T): void {
        this.__setValAndPost(newVal);
    }

    private __setValAndPost(newVal: T) {

        const prevVal = this.__val;

        this.__val = newVal;

        this.__postEvtChangeDiff({ prevVal, newVal });

    }

    public readonly evtDiff: Trackable<T>["evtDiff"];
    public readonly evt: Trackable<T>["evt"];
    private readonly __postEvtChangeDiff: (data: Trackable.Diff<T>) => void;

    constructor(val: T) {

        const evtChangeDiff: Evt<Trackable.Diff<T>> = new Evt();

        this.__postEvtChangeDiff = changeDiff => evtChangeDiff.post(changeDiff);

        this.evt = evtChangeDiff.pipe(({ newVal }) => [newVal]);

        this.evtDiff = evtChangeDiff;

        this.__val = val;

    }

}

importProxy.Tracked = Tracked;


