
type NonPostableEvt<T> = import("../lib").NonPostableEvt<T>;
import { arrDiff } from "../tools/reducers/diff";
import { assert } from "tsafe";

/** For tests that used the legacy attach returned Promise */
export function getHandlerPr(evt: NonPostableEvt<any>, run: ()=> void): Promise<any>{

    const handlersBefore= evt.getHandlers();

    const x= run() as any;

    assert(!("then" in x));

    const handlersAfter = evt.getHandlers();

    const o =arrDiff(
        handlersBefore,
        handlersAfter
    );

    return o.added[0].promise;

}