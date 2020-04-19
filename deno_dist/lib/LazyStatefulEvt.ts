import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp.ts";
import { importProxy } from "./importProxy.ts";
type StatefulEvt<T> = import("./types/interfaces/index.ts").StatefulEvt<T>;
import { defineAccessors } from "../tools/typeSafety/defineAccessors.ts";

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

    post(data: T): number {

        if (this.__evt === undefined) {

            this.initialState = data;

            return ++this.initialPostCount;


        }

        return this.__evt.post(data);

    }


}