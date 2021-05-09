
import { Evt, nonNullable } from "../lib";
import { assert } from "tsafe";

(async ()=>{

    const evtText = Evt.create<string | undefined>();

    const prText = evtText.waitFor(nonNullable(), 200);

    evtText.post(undefined);
    evtText.post("foo");

    assert(await prText === "foo");

    console.log("PASS");

})();