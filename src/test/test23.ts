import { SyncEvent } from "../lib";
import "colors";

let evt= new SyncEvent<string>();

process.nextTick(()=>{

    evt.post("foo");
    
});

let success= false;

(async ()=>{

    let str= await evt.attachOnce(0, ()=>{});

    console.assert(str === "foo");

    try{

        await evt.attach(0,() => { });

        console.assert(false);

    }catch(error){ 

        success = true;

    }


})();

setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

},2000);