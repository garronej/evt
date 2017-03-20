import {
    SyncEvent,
    AsyncEvent,
    VoidSyncEvent,
    VoidAsyncEvent
} from "../lib/index";

require("colors");

let evt = new VoidSyncEvent();

setTimeout(()=>{

    evt.post();
    evt.post();
    evt.post();

}, 250);


setTimeout(()=>{

    evt.post();
    evt.post();
    evt.post();

}, 320);

setTimeout(()=>{

    evt.post();
    evt.post();
    evt.post();

}, 500);

(async ()=> {


    let iterator= evt.asyncLoop();

    /*
    for( let promise of iterator ){

        let data = await promise;

        console.log(data);

        if( data === "stop" ){
            iterator.next(true);
            break;
        }


    }

    console.log("done");
    */


    let i=1;

    while( true ){

        await iterator.next().value;

        await new Promise<void>( resolve => setTimeout(resolve, 100));

        console.log("tick");

        if( i === 8 ){
            iterator.next("STOP");
            break;
        }

        i++;


    }

    console.log("PASS".green);


})();
