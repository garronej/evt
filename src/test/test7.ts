import {
    SyncEvent
} from "../lib/index";

let evt = new SyncEvent<number>();


process.nextTick(() => evt.post(666));

let success= false;

(async () => {
    
    let n= await evt.waitFor();

    console.assert( n === 666 );

    success= true;

})();


setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

}, 2000);