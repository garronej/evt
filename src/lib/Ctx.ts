import { CtxCore } from "./CtxCore";
import { Handler } from "./types/Handler";
import { Evt } from "./Evt";
import { setPostCount } from "./EvtCore";

export class Ctx extends CtxCore {

    public static __CtxForEvtBrand = true;

    private evtDetachedInitialPostCount = 0;
    private evtDetach: Evt<Handler.WithEvt<any>[]> | undefined = undefined;

    public getEvtDetach(): NonNullable<typeof Ctx.prototype.evtDetach> {

        if (this.evtDetach === undefined) {
            this.evtDetach = new Evt();
            setPostCount(
                this.evtDetach,
                this.evtDetachedInitialPostCount
            );
        }

        return this.evtDetach;

    }

    constructor() {
        super();

        this.onDetach = handlers => {
            if (this.evtDetach === undefined) {
                this.evtDetachedInitialPostCount++
                return;
            }
            this.evtDetach.post(handlers);
        };
    }


}