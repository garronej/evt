import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp.ts";
import { importProxy } from "./importProxy.ts";
type Evt<T> = import("./types/interfaces/index.ts").Evt<T>;
import { defineAccessors } from "../tools/typeSafety/defineAccessors.ts";

export class LazyEvt<T> {

    private initialPostCount = 0;

    declare readonly evt: Evt<T>;
    declare private __evt: Evt<T>;

    private static __1: void = (() => {

        if (false) { LazyEvt.__1; }

        defineAccessors(LazyEvt.prototype, "evt", {
            "get": function (this: LazyEvt<any>) {

                if (this.__evt === undefined) {
                    this.__evt = new importProxy.Evt();
                    overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
                }

                return this.__evt;

            }
        });


    })();

    post(data: T): number {

        if (this.__evt === undefined) {

            return ++this.initialPostCount;

        }

        return this.__evt.post(data);

    }


}
