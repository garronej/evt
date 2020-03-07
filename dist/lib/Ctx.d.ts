import { CtxCore } from "./CtxCore";
export declare class Ctx extends CtxCore {
    static __CtxForEvtBrand: boolean;
    private evtDetachedInitialPostCount;
    private evtDetach;
    getEvtDetach(): NonNullable<typeof Ctx.prototype.evtDetach>;
    constructor();
}
