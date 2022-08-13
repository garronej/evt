import { Evt } from "../lib/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v1.0.0/deno_dist/assert.ts";;

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


