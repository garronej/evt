import { Evt } from "../Evt";
import { Handler } from "../types/Handler";
export declare function getLazyEvtHandlerFactory<T>(): {
    getLazyEvtHandler: {
        (target: "evtAttach"): Evt<Handler<T, any, import("..").Ctx | undefined>>;
        (target: "evtDetach"): Evt<Handler<T, any, import("..").Ctx | undefined>>;
    };
    onHandler: (target: "evtAttach" | "evtDetach", handler: Handler<T, any, import("..").Ctx | undefined>) => void;
};
