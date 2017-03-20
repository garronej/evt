import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

let evt = new VoidSyncEvent();


setTimeout(() => {
    evt.post();
    setImmediate( ()=> evt.post());
}, 100);


(async () => {
    
    await evt.waitFor();

    await evt.waitFor();

    console.log("PASS".green);

})();




