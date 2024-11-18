import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.8.5/assert.ts";;

let stdout = "";

const evt = Evt.create();

(async ()=> {

    await evt.waitFor();

    stdout+= "bar";

})();


(async () => {

    stdout += "foo";

    await evt.postAndWait();

    stdout += "baz";

    assert(stdout === "foobarbaz");

    console.log("PASS");

})();


