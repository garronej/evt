import { assert, AssertionError } from "https://deno.land/x/tsafe@v1.5.1/mod.ts";

try {

    assert(false, "We should never be here");

} catch (error) {

    assert(error instanceof AssertionError);

}

console.log("PASS");

