
import { Evt, nonNullable } from "../lib/index.ts";
import { assert } from "../tools/typeSafety/index.ts";

(async ()=>{

    const evtText = Evt.create<string | undefined>();

    const prText = evtText.waitFor(nonNullable, 200);

    evtText.post(undefined);
    evtText.post("foo");

    assert(await prText === "foo");

    console.log("PASS");

})();