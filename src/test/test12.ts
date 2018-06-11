import {
    VoidSyncEvent
} from "../lib/index";

let evt = new VoidSyncEvent();

setTimeout(() => {
    evt.post();
    setImmediate( ()=> evt.post());
}, 100);

let pass= false;

(async () => {
    
    await evt.waitFor();

    await evt.waitFor();

    pass= true;

})();

setTimeout(()=> {

    console.assert(pass);

    console.log("PASS".green);

}, 2000);


