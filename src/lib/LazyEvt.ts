import { overwriteReadonlyProp } from "../tools/typeSafety/overwriteReadonlyProp";
import { importProxy } from "./importProxy";
type Evt<T> = import("./types/interfaces/Evt").Evt<T>;
import { defineAccessors } from "../tools/typeSafety/defineAccessors";

export class LazyEvt<T> {

    private initialPostCount = 0;

    declare readonly evt: Evt<T>;
    declare private __evt: Evt<T>;

    private static __1: void = (() => {

        if (false) { LazyEvt.__1; }

        defineAccessors(LazyEvt.prototype, "evt", {
            "get": function () {
                const self: LazyEvt<any> = this;

                if (self.__evt === undefined) {
                    self.__evt = new importProxy.Evt();
                    overwriteReadonlyProp(self.__evt, "postCount", self.initialPostCount);
                }

                return self.__evt;

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