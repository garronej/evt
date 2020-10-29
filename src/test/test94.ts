import { assert, AssertionError } from "../tools/typeSafety/assert";

try {

    assert(false, "We should never be here");

} catch (error) {

    assert(error instanceof AssertionError);

}

console.log("PASS");

