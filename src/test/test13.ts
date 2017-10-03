import {
    VoidSyncEvent
} from "../lib/index";

require("colors");

let pass= false;

let evt = new VoidSyncEvent();



setTimeout(() => {
    evt.post();
    setImmediate( ()=> evt.post());
}, 0);


(async () => {
    
    await evt.waitFor();

    await evt.waitFor();

    try{

        await evt.waitFor(10);

    }catch( error ){

        pass= true;
    }


})();


setTimeout(()=> {

    console.assert(pass);

    console.log("PASS".green);

}, 2000);