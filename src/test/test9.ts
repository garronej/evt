import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<string>();


setTimeout(() => {
    evt.post("foo");
    setImmediate( ()=> evt.post("bar"));
}, 100);


(async () => {
    
    console.assert(await evt.attachOnce() === "foo");

    console.assert(await evt.attachOnce() === "bar");

    console.log("PASS".green);

})();




