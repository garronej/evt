import { assert } from "../tools/typeSafety";

import { Observable } from "../lib/Observable";
import { same } from "../tools/inDepth";

const names1 = [
    "alice",
    "bob",
    "louis"
];

const names2 = [
    "bob",
    "louis",
    "alice"
];

const names3 = [
    "bob",
    "louis"
];

const obsNames = new Observable<string[]>(
    names1,
    (names, newNames) => {

        if (names.length !== newNames.length) {
            return false;
        }

        return names.every(name => newNames.indexOf(name) >= 0);

    }
);

assert(same(obsNames.val, names1));

(async () => {


    obsNames.evt.waitFor(10)
        .then(
            () => assert(false, "never"),
            () => { }
        )
        ;

    assert(
        obsNames.update(names2)
        ===
        false
    );

    assert(same(obsNames.val, names1));

    await new Promise(resolve => setTimeout(resolve, 300));

    obsNames.evt.waitFor(10)
        .then(newValue => {
            assert(
                newValue === obsNames.val &&
                same(newValue,names3)
            );
        })
        ;

    obsNames.evtDiff.waitFor(10)
        .then(({ prevVal, currVal }) => {

            assert(
                currVal === obsNames.val &&
                same(prevVal,names1) &&
                same(currVal,names3)
            );

            console.log("PASS".green);

        })
        ;

    assert(
        obsNames.update(names3)
        ===
        true
    );

    assert(same(obsNames.val, names3));

})();


