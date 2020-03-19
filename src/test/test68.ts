import { Evt } from "../lib";
import { assert } from "../tools/typeSafety/assert";

let warn_str = "";

Object.defineProperty(console, "warn", {
    "value": (str: string) => warn_str += str + "\n"
});

const evt = new Evt();


for (let i = 1; i <= 60; i++) {

    if (i === 27) {

        evt.enableTrace("my event", undefined, () => { });

    }

    evt.attach(() => { });

}

assert(
    warn_str ==
    [
        "MaxHandlersExceededWarning: Possible Evt memory leak detected. 26 handlers attached. Use evt.setMaxHandlers() to increase limit.",
        "MaxHandlersExceededWarning: Possible Evt memory leak detected. 52 handlers attached to my event. Use evt.setMaxHandlers() to increase limit." + "\n"
    ].join("\n")
);

console.log("PASS".green);

