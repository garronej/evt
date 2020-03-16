
import { Evt } from "./Evt";

/** https://docs.evt.land/api/voidevt */
export class VoidEvt extends Evt<void> {

    public post(): number {
        return super.post(undefined);
    }

    public async postAsyncOnceHandled() {
        return super.postAsyncOnceHandled(undefined);
    }

}