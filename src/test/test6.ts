import {
    SyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();


setTimeout(() => {
    evt.post("foo");
    setImmediate(() => evt.post("bar"));
}, 100);


(async () => {

    console.assert(await evt.waitFor() === "foo");

    console.assert(await evt.waitFor() === "bar");

    try {

        let message = await evt.waitFor(200);

    } catch (error) {
        console.assert(error.message === "waitFor() timeout after 200 ms");
        console.log("PASS".green);
    }



})();




