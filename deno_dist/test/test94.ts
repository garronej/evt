import { assert, AssertionError } from "https://raw.githubusercontent.com/garronej/tsafe/v0.10.0/deno_dist/mod.ts";

try {

    assert(false, "We should never be here");

} catch (error) {

    assert(error instanceof AssertionError);

}

console.log("PASS");

