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

    let hasTimedOut= await evt.waitFor();

    console.assert( !hasTimedOut );

    hasTimedOut= await evt.waitFor(200);

    console.assert( hasTimedOut === "__TIMEOUT__" );

    console.log("PASS".green);

})();




