
import { Evt } from "../Evt";
import { setPostCount } from "../EvtCore";
import { Handler } from "../types/Handler";
import { id } from "../../tools/typeSafety/id";

export function getLazyEvtHandlerFactory<T>() {

    const initialPostCount = {
        "evtAttach": 0,
        "evtDetach": 0
    };

    const evts = {
        "evtAttach": id<Evt<Handler<T, any>> | undefined>(undefined),
        "evtDetach": id<Evt<Handler<T, any>> | undefined>(undefined)
    };

    function getLazyEvtHandler(target: "evtAttach"): NonNullable<typeof evts["evtAttach"]>;
    function getLazyEvtHandler(target: "evtDetach"): NonNullable<typeof evts["evtDetach"]>;
    function getLazyEvtHandler(target: "evtAttach" | "evtDetach"): NonNullable<
        typeof evts["evtAttach"] |
        typeof evts["evtDetach"]
    > {

        if (evts[target] === undefined) {
            evts[target] = new Evt();
            setPostCount(
                evts[target]!,
                initialPostCount[target]
            );
        }

        return evts[target]!;

    }

    function onHandler(
        target: "evtAttach" | "evtDetach",
        handler: Handler<T, any>
    ) {

        if (evts[target] === undefined) {
            initialPostCount[target]++;
            return;
        }

        evts[target]!.post(handler);

    }


    return { getLazyEvtHandler, onHandler };


}