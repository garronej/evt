
import { exclude } from "../tools/typeSafety/exclude";
import { same } from "../tools/inDepth";
import { assert } from "../tools/typeSafety/assert"


{

    const d = (["p1", "p2", "p3"] as const)
        .filter(exclude(["p1", "p2"] as const))

    assert(same(d, ["p3" as const]));

}

{

    const d = (["p1", "p2", "p3"] as const)
        .filter(exclude("p1" as const))

    assert(same(d, ["p2" as const, "p3" as const]));

}

{

    const d = (["p1", "p2", "p3", null] as const)
        .filter(exclude(null))
        ;


    assert(same(d, ["p1" as const, "p2" as const, "p3" as const]));

}

{

    const d = (["p1", "p2", "p3", null, false] as const)
        .filter(exclude([null, false] as const))

    assert(same(d, ["p1" as const, "p2" as const, "p3" as const]));

}


console.log("PASS");