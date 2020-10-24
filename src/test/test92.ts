import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

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


