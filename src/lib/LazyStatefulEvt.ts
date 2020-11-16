import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp";
import { importProxy } from "./importProxy";
type StatefulEvt<T> = import("./types/interfaces").StatefulEvt<T>;
import { defineAccessors } from "../tools/typeSafety/defineAccessors";

export class LazyStatefulEvt<T> {

    private initialPostCount = 0;
    private initialState: T;

    declare readonly evt: StatefulEvt<T>;
    declare private __evt: StatefulEvt<T>;

    constructor(initialState: T){
        this.initialState = initialState;
    }

    private static __1: void = (() => {

        if (false) { LazyStatefulEvt.__1; }

        defineAccessors(LazyStatefulEvt.prototype, "evt", {
            "get": function (this: LazyStatefulEvt<any>) {

                if (this.__evt === undefined) {
                    this.__evt = new importProxy.StatefulEvt(this.initialState);
                    delete this.initialState;
                    overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
                }

                return this.__evt;

            }
        });


    })();

    private __post(data: T, doWait: false): number;
    private __post(data: T, doWait: true): Promise<void>;
    private __post(data: T, doWait: boolean): number | Promise<void> {

        if (this.__evt === undefined) {

            this.initialState = data;

            return ++this.initialPostCount;


        }

        return this.__evt[doWait?"postAndWait":"post"](data);

    }

    post(data: T){
        return this.__post(data,false);
    }

    postAndWait(data: T){
        return this.__post(data, true);
    }


}