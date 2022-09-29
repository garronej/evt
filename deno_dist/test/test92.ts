import { Evt } from "../lib/index.ts";
import { assert } from "https://deno.land/x/tsafe@v1.1.1/assert.ts";;

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


