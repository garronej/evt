
import { ObservableImpl } from "../lib";

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

const obsNames = new ObservableImpl<string[]>(
    names1,
    (names, newNames) => {

        if (names.length !== newNames.length) {
            return false;
        }

        return names.every(name => newNames.indexOf(name) >= 0);

    }
);

console.assert(obsNames.value === names1);


(async () => {


    obsNames.evtChange.waitFor(10)
        .then(() => console.assert(false, "never"))
        .catch(() => { });

    console.assert(
        obsNames.onPotentialChange(names2)
        ===
        false
    );

    console.assert(obsNames.value === names1);

    await new Promise(resolve => setTimeout(resolve, 300));

    obsNames.evtChange.waitFor(10)
        .then(({ previousValue, newValue }) => {

            console.assert(
                newValue == obsNames.value &&
                previousValue === names1 &&
                newValue === names3
            );

            console.log("PASS".green);

        })
        ;

    console.assert(
        obsNames.onPotentialChange(names3)
        ===
        true
    );

    console.assert(obsNames.value === names3);

})();


