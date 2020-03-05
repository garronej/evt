

import { representsSameDataFactory } from "./representsSameData";
import { assert } from "../typeSafety/assert";

{

    const { representsSameData } = representsSameDataFactory({ "takeIntoAccountArraysOrdering": false });

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ])
        )
    );

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["a", "b"]
            ])
        )
    );

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["b", "a"],
                ["c", "d"]
            ])
        )
    );

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

    assert(
        !representsSameData(
            new Set<string[]>([
                ["a", "b", "c"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

}

{

    const { representsSameData } = representsSameDataFactory({ "takeIntoAccountArraysOrdering": true });

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ])
        )
    );

    assert(
        representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["a", "b"]
            ])
        )
    );

    assert(
        !representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["b", "a"],
                ["c", "d"]
            ])
        )
    );

    assert(
        !representsSameData(
            new Set<string[]>([
                ["a", "b"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

    assert(
        !representsSameData(
            new Set<string[]>([
                ["a", "b", "c"],
                ["c", "d"]
            ]),
            new Set<string[]>([
                ["c", "d"],
                ["b", "a"]
            ])
        )
    );

}

{

    const { representsSameData } = representsSameDataFactory({ "takeIntoAccountArraysOrdering": false });

    assert(
        representsSameData(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        representsSameData(
            new Map<string[], string[]>([
                [["b", "a"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        representsSameData(
            new Map<string[], string[]>([
                [["c", "d"], ["3", "4"]],
                [["a", "b"], ["1", "2"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !representsSameData(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]],
                [["e", "f"], ["5", "6"]],
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !representsSameData(
            new Map<string[], string[]>([
                [["1", "2"], ["a", "b"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );


}

{

    const { representsSameData } = representsSameDataFactory({ "takeIntoAccountArraysOrdering": true });

    assert(
        representsSameData(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !representsSameData(
            new Map<string[], string[]>([
                [["b", "a"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        representsSameData(
            new Map<string[], string[]>([
                [["c", "d"], ["3", "4"]],
                [["a", "b"], ["1", "2"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !representsSameData(
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]],
                [["e", "f"], ["5", "6"]],
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );

    assert(
        !representsSameData(
            new Map<string[], string[]>([
                [["1", "2"], ["a", "b"]],
                [["c", "d"], ["3", "4"]]
            ]),
            new Map<string[], string[]>([
                [["a", "b"], ["1", "2"]],
                [["c", "d"], ["3", "4"]]
            ]),
        )
    );


}


console.log("PASS");

