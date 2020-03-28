
import { Evt } from "../lib";
import { getPromiseAssertionApi } from "../tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi();

const evtText = new Evt<{ p: string }>();

const obj = { "p": "foo" };

mustResolve({
    "promise": evtText.attach(
        obj_ => obj_.p.match("foo") as any as boolean,
        obj_ => obj_ === obj
    ),
    "expectedData": obj
});


evtText.post(obj);

setTimeout(() => console.log("PASS".green), 0);