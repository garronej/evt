import {
    VoidSyncEvent
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

    try{

        await evt.waitFor(200);

    }catch( error ){
        console.log("PASS".green);
    }


})();