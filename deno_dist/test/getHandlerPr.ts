
type NonPostableEvt<T> = import("../lib/index.ts").NonPostableEvt<T>;
import { arrDiff } from "../tools/reducers/diff.ts";
import { assert } from "https://deno.land/x/tsafe@v1.3.4/mod.ts";

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