import { overwriteReadonlyProp } from "tsafe/lab/overwriteReadonlyProp";
import { importProxy } from "./importProxy";
import type { Evt } from "./types";

export class LazyEvt<T> {

    private initialPostCount = 0;

    get evt(): Evt<T> {

        if (this.__evt === undefined) {
            this.__evt = new importProxy.Evt();
            overwriteReadonlyProp(this.__evt, "postCount", this.initialPostCount);
        }

        return this.__evt;

    }

    declare private __evt: Evt<T>;

    private __post(data: T, doWait: false): number;
    private __post(data: T, doWait: true): Promise<void>;
    private __post(data: T, doWait: boolean): number | Promise<void> {

        if (this.__evt === undefined) {

            return ++this.initialPostCount;

        }

        return this.__evt[doWait ? "postAndWait" : "post"](data);

    }

    post(data: T) {
        return this.__post(data, false);
    }

    postAndWait(data: T) {
        return this.__post(data, true);
    }

}
