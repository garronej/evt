import { overwriteReadonlyProp } from "../../tools/overwriteReadonlyProp";
import { importProxy } from "../importProxy";
type Evt<T> = import("../Evt").Evt<T>;

export class LazyEvtFactory<T> {

    private initialPostCount = 0;
    private evt: Evt<T> | undefined = undefined;

    public getEvt() {

        if (this.evt === undefined) {
            this.evt = new importProxy.Evt();
            overwriteReadonlyProp(this.evt, "postCount", this.initialPostCount);
        }

        return this.evt;

    }

    public post(data: T) {

        if (this.evt === undefined) {

            this.initialPostCount++;
            return;

        }

        this.evt.post(data);

    }

}