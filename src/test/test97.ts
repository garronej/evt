import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

let stdout = "";

const evt = Evt.create<string>("");

evt.attach(async () => {

    await new Promise(resolve => setTimeout(resolve, 100));

    stdout += "bar1"

});

evt.attachOnce(async () => {

    await new Promise(resolve => setTimeout(resolve, 100));

    stdout += "bar2";

});

evt.$attach(
    text => [text.toUpperCase],
    async () => {

        await new Promise(resolve => setTimeout(resolve, 100));

        stdout += "bar3";

    });

evt.evtChange.attach(
    async () => {

        await new Promise(resolve => setTimeout(resolve, 100));

        stdout += "bar4";

    });

(async () => {

    stdout=""

    stdout += "foo";

    await evt.postAndWait("whatever");

    stdout += "baz";

    assert(stdout === "foobar4bar1bar2bar3baz");

    console.log("PASS");

})();


