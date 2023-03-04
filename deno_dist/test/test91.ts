import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.4.3/assert.ts";;

let stdout = "";

const evt = Evt.create<string>();

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

(async () => {

    stdout += "foo";

    await evt.postAndWait("whatever");

    stdout += "baz";

    assert(stdout === "foobar1bar2bar3baz");

    console.log("PASS");

})();


