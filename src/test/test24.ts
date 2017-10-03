import { SyncEvent } from "../lib";
import "colors";


let evt= new SyncEvent<string>();

let success= false;

(async ()=>{


    for( let _ of new Array<void>(6) ){

        let letter= await evt.waitFor();

    }

    evt.post("satan");
    evt.post("satan");
    evt.post("satan");
    evt.post("satan");

    try{

        await evt.waitFor(200);

        console.assert(false,"satan came");

    }catch{

        success= true;

    }


})();


for( let letter of [ "a", "b", "c", "d", "e" ] ){

    evt.post(letter);

}

setTimeout(()=> evt.post("f"), 100);

setTimeout(()=>{

    console.assert(success);

    console.log("PASS".green);

},2000);