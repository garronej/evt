import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

let evt = new SyncEvent<number>();


process.nextTick(() => evt.post(666));

(async () => {
    
    let n= await evt.waitFor();

    console.assert( n === 666 );

    console.log("PASS".green);

})();